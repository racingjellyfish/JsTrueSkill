/**
 * This layer handles amalgamating the players skills into a single team skill.
 *
 * @type {*}
 */
var util = require('util');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');
var PartialPlay = require('../PartialPlay');
var GaussianWeightedSumFactor = require('../factors/GaussianWeightedSumFactor');
var Schedule = require('../factorgraphs/Schedule');
var ScheduleStep = require('../factorgraphs/ScheduleStep');
var Variable = require('../factorgraphs/Variable');
var GaussianDistribution = require('../numerics/GaussianDistribution');

var PlayerPerformancesToTeamPerformancesLayer = function(parentGraph) {
	PlayerPerformancesToTeamPerformancesLayer.super_.call(this, parentGraph);
};

util.inherits(PlayerPerformancesToTeamPerformancesLayer, TrueSkillFactorGraphLayer);

PlayerPerformancesToTeamPerformancesLayer.prototype.buildLayer = function() {
	for (var i = 0; i < this.getInputVariablesGroups().length; i++) {
		var currentTeam = this.getInputVariablesGroups()[i];
		var teamPerformance = this.createOutputVariable(currentTeam);
		this.addLayerFactor(this.createPlayerToTeamSumFactor(currentTeam, teamPerformance));

		// REVIEW: Does it make sense to have groups of one?
		this.addOutputVariable(teamPerformance);
	}
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createPriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var weightedSumFactor = localFactors[i];
		schedules.push(new ScheduleStep("Perf to Team Perf Step", weightedSumFactor, 0));
	}
	return this.createScheduleSequence(schedules, "all player perf to team perf schedule");
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createPlayerToTeamSumFactor = function(teamMembers,
	sumVariable) {
	var weights = new Array(teamMembers.length);
	for (var i = 0; i < weights.length; i++) {
		weights[i] = PartialPlay.getPartialPlayPercentage(teamMembers[i].getKey());
	}
	return new GaussianWeightedSumFactor(sumVariable, teamMembers, weights);
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createPosteriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var currentFactor = localFactors[i];
		// TODO is there an off by 1 error here?
		for (var j = 0; j < currentFactor.getNumberOfMessages(); j++) {
			schedules.push(new ScheduleStep("team sum perf @" + j, currentFactor, j));
		}
	}
	return this.createScheduleSequence(schedules, "all of the team's sum iterations");
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createOutputVariable = function(team) {
	var sb = '';
	for (var i = 0; i < team.length; i++) {
		// TODO team is a map?
		var teamMember = team[i];
		sb += teamMember;
		sb += ", ";
	}
	sb = sb.substring(0, sb.length - 2);

	return new Variable(GaussianDistribution.UNIFORM, "Team[%s]'s performance", sb);
};

module.exports = PlayerPerformancesToTeamPerformancesLayer;
