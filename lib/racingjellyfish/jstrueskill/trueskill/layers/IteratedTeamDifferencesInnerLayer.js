var util = require('util');
var Factor = require('../../factorgraphs/Factor');
var Schedule = require('../../factorgraphs/Schedule');
var ScheduleLoop = require('../../factorgraphs/ScheduleLoop');
var ScheduleSequence = require('../../factorgraphs/ScheduleSequence');
var ScheduleStep = require('../../factorgraphs/ScheduleStep');
var Variable = require('../../factorgraphs/Variable');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var Factor = require('../factors/GaussianWeightedSumFactor');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');

// The whole purpose of this is to do a loop on the bottom
var IteratedTeamDifferencesInnerLayer = function(parentGraph,
    teamPerformancesToPerformanceDifferences, teamDifferencesComparisonLayer) {
    IteratedTeamDifferencesInnerLayer.super_.call(this, parentGraph);

    this.teamPerformancesToTeamPerformanceDifferencesLayer = teamPerformancesToPerformanceDifferences;
    this.teamDifferencesComparisonLayer = teamDifferencesComparisonLayer;
};

util.inherits(IteratedTeamDifferencesInnerLayer, TrueSkillFactorGraphLayer);

IteratedTeamDifferencesInnerLayer.prototype.getUntypedFactors = function() {
    var factors = [];
    this.teamPerformancesToTeamPerformanceDifferencesLayer.getUntypedFactors().forEach(function(element) {
        factors.push(element);
    });
    this.teamDifferencesComparisonLayer.getUntypedFactors().forEach(function(element) {
        factors.push(element);
    });

    return factors;
};

IteratedTeamDifferencesInnerLayer.prototype.buildLayer = function() {
    this.teamPerformancesToTeamPerformanceDifferencesLayer.setInputVariablesGroups(
        this.getInputVariablesGroups());
    this.teamPerformancesToTeamPerformanceDifferencesLayer.buildLayer();

    this.teamDifferencesComparisonLayer.setInputVariablesGroups(
        this.teamPerformancesToTeamPerformanceDifferencesLayer.getOutputVariablesGroups());
    this.teamDifferencesComparisonLayer.buildLayer();
};

IteratedTeamDifferencesInnerLayer.prototype.createPriorSchedule = function() {
    var loop = null;

    switch (this.getInputVariablesGroups().length) {
        case 0:
        case 1:
            throw new Error('IllegalArgumentException');
        case 2:
            loop = this.createTwoTeamInnerPriorLoopSchedule();
            break;
        default:
            loop = this.createMultipleTeamInnerPriorLoopSchedule();
            break;
    }

    // When dealing with differences, there are always (n-1) differences, so add in the 1
    var totalTeamDifferences =
        this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors().length;

    var schedules = [];
    schedules.push(loop);
    schedules.push(new ScheduleStep("teamPerformanceToPerformanceDifferenceFactors[0] @ 1",
        this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[0], 1));
    schedules.push(new ScheduleStep(
        util.format("teamPerformanceToPerformanceDifferenceFactors[teamTeamDifferences = %s - 1] @ 2",
        totalTeamDifferences),
        this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[totalTeamDifferences - 1], 2));

    return this.createScheduleSequence(schedules, "inner schedule");
};

IteratedTeamDifferencesInnerLayer.prototype.createTwoTeamInnerPriorLoopSchedule = function() {
    var schedules = [];
    schedules.push(new ScheduleStep("send team perf to perf differences",
            this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[0], 0));
    schedules.push(new ScheduleStep("send to greater than or within factor",
            this.teamDifferencesComparisonLayer.getLocalFactors()[0], 0));
    return this.createScheduleSequence(schedules, "loop of just two teams inner sequence");
};

IteratedTeamDifferencesInnerLayer.prototype.createMultipleTeamInnerPriorLoopSchedule = function() {
    var totalTeamDifferences =
        this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors().length;

    var forwardScheduleList = [];

    for (var i = 0; i < totalTeamDifferences - 1; i++) {
        var forwardSchedules = [];
        forwardSchedules.push(new ScheduleStep(util.format("team perf to perf diff %s ",i),
            this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[i], 0));
        forwardSchedules.push(new ScheduleStep(util.format("greater than or within result factor %s",
            i), this.teamDifferencesComparisonLayer.getLocalFactors()[i], 0));
        forwardSchedules.push(new ScheduleStep(util.format("team perf to perf diff factors [%s], 2",
            i), this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[i], 2));
        var currentForwardSchedulePiece = this.createScheduleSequence(forwardSchedules,
            "current forward schedule piece %d", [i]);

        forwardScheduleList.push(currentForwardSchedulePiece);
    }

    var forwardSchedule = new ScheduleSequence("forward schedule", forwardScheduleList);

    var backwardScheduleList = [];

    for (i = 0; i < totalTeamDifferences - 1; i++) {
        var backwardSchedules = [];
        backwardSchedules.push(new ScheduleStep(
            util.format("teamPerformanceToPerformanceDifferenceFactors[totalTeamDifferences - 1 - %s] @ 0",
            i), this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[totalTeamDifferences - 1 - i], 0));
        backwardSchedules.push(new ScheduleStep(
            util.format("greaterThanOrWithinResultFactors[totalTeamDifferences - 1 - %s] @ 0",
            i), this.teamDifferencesComparisonLayer.getLocalFactors()[totalTeamDifferences - 1 - i], 0));
        backwardSchedules.push(new ScheduleStep(
            util.format("teamPerformanceToPerformanceDifferenceFactors[totalTeamDifferences - 1 - %s] @ 1",
            i), this.teamPerformancesToTeamPerformanceDifferencesLayer.getLocalFactors()[totalTeamDifferences - 1 - i], 1));

        var currentBackwardSchedulePiece = new ScheduleSequence("current backward schedule piece", backwardSchedules);
        backwardScheduleList.push(currentBackwardSchedulePiece);
    }

    var backwardSchedule = new ScheduleSequence("backward schedule", backwardScheduleList);

    var schedules = [];
    schedules.push(forwardSchedule);
    schedules.push(backwardSchedule);
    var forwardBackwardScheduleToLoop = new ScheduleSequence("forward Backward Schedule To Loop", schedules);

    var initialMaxDelta = 0.0001;

    var loop = new ScheduleLoop(util.format("loop with max delta of %s", initialMaxDelta),
        forwardBackwardScheduleToLoop, initialMaxDelta);

    return loop;
};

module.exports = IteratedTeamDifferencesInnerLayer;
