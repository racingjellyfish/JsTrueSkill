var Rating = require('../../Rating');
var KeyedVariable = require('../../factorgraphs/KeyedVariable');
var Schedule = require('../../factorgraphs/Schedule');
var ScheduleStep = require('../../factorgraphs/ScheduleStep');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var MathUtils = require('../../numerics/MathUtils');
var TrueSkillFactorGraph = require('../TrueSkillFactorGraph');
var GaussianLikelihoodFactor = require('../factors/GaussianLikelihoodFactor');

// We intentionally have no Posterior schedule since the only purpose here is to...
var PlayerSkillsToPerformancesLayer = function(parentGraph, teams) {
    TrueSkillFactorGraphLayer.call(this, parentGraph);
};

PlayerSkillsToPerformancesLayer.prototype = new TrueSkillFactorGraphLayer();

PlayerSkillsToPerformancesLayer.prototype.buildLayer = function() {
    var inputVariableGroups = this.getInputVariablesGroups();
    for (var i = 0; i < inputVariableGroups.length; i++) {
        var currentTeam = inputVariablesGroups[i];
        var currentTeamPlayerPerformances = [];

        // TODO currentTeam is a map?
        for (var j = 0; j < currentTeam.length; j++) {
            var playerSkillVariable = currentTeam[j];
            var playerPerformance = this.createOutputVariable(playerSkillVariable.getKey());
            this.addLayerFactor(this.createLikelihood(playerSkillVariable, playerPerformance));
            currentTeamPlayerPerformances.push(playerPerformance);
        }

        this.addOutputVariableGroup(currentTeamPlayerPerformances);
    }
};

PlayerSkillsToPerformancesLayer.prototype.CreateLikelihood = function(playerSkill,
    playerPerformance) {
    return new GaussianLikelihoodFactor(MathUtils.square(ParentFactorGraph.getGameInfo().getBeta()), playerPerformance, playerSkill);
};

PlayerSkillsToPerformancesLayer.prototype.CreateOutputVariable = function(playerKey) {
    return new KeyedVariable(playerKey, GaussianDistribution.UNIFORM, "%s's performance",
        playerKey);
};

PlayerSkillsToPerformancesLayer.prototype.createPriorSchedule = function() {
    var schedules = [];
    var localFactors = this.getLocalFactors();
    for (var i = 0; i < localFactors.length; i++) {
        schedules.push(new ScheduleStep("Skill to Perf step", likelihood, 0));
    }
    return new ScheduleSequence(schedules, "All skill to performance sending");
};

PlayerSkillsToPerformancesLayer.prototype.createPosteriorSchedule = function() {
    var schedules = [];
    var localFactors = this.getLocalFactors();
    for (var i = 0; i < localFactors.length; i++) {
        var likelihood = localFactors[i];
        schedules.push(new ScheduleStep("Skill to Perf step", likelihood, 1));
    }
    return new ScheduleSequence(schedules, "All skill to performance sending");
};

module.exports = PlayerSkillsToPerformancesLayer;
