var PartialPlay = require('../../PartialPlay');
var KeyedVariable = require('../../factorgraphs/KeyedVariable');
var Schedule = require('../../factorgraphs/Schedule');
var ScheduleStep = require('../../factorgraphs/ScheduleStep');
var Variable = require('../../factorgraphs/Variable');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var TrueSkillFactorGraph = require('../TrueSkillFactorGraph');
var GaussianWeightedSumFactor = require('../factors/GaussianWeightedSumFactor');

// The whole purpose of this is to do a loop on the bottom
var PlayerPerformancesToTeamPerformancesLayer = function(parentGraph) {
	TrueSkillFactorGraphLayer.call(this, parentGraph);
};

PlayerPerformancesToTeamPerformancesLayer.prototype = new TrueSkillFactorGraphLayer();

PlayerPerformancesToTeamPerformancesLayer.prototype.buildLayer = function() {
	var teamPerformance = this.createOutputVariable(currentTeam);
	this.addLayerFactor(this.createPlayerToTeamSumFactor(currentTeam, teamPerformance));

	// REVIEW: Does it make sense to have groups of one?
	this.addOutputVariable(teamPerformance);
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createPriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var weightedSumFactor = localFactors[i];
		schedules.push(new ScheduleStep("Perf to Team Perf Step", weightedSumFactor, 0));
	}
	return new ScheduleSequence(schedules, "all player perf to team perf schedule");
};

PlayerPerformancesToTeamPerformancesLayer.prototype.createPlayerToTeamSumFactor = function(teamMembers,
	sumVariable) {
	var weights = new Array(teamMembers.length);
	for (var i = 0; i < weights.length; i++) {
		// TODO is teamMembers a map?
		weights[i] = PartialPlay.getPartialPlayPercentage(teamMembers[i]);
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
	return new ScheduleSequence(schedules, "all of the team's sum iterations");
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
