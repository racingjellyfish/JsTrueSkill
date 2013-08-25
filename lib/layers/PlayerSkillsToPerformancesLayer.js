/**
 * This layer handles the message passing from players skills to actual
 * performances.
 *
 * @type {*}
 */
var util = require('util');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');
var Rating = require('../Rating');
var GaussianLikelihoodFactor = require('../factors/GaussianLikelihoodFactor');
var KeyedVariable = require('../factorgraphs/KeyedVariable');
var Schedule = require('../factorgraphs/Schedule');
var ScheduleStep = require('../factorgraphs/ScheduleStep');
var GaussianDistribution = require('../numerics/GaussianDistribution');
var MathUtils = require('../numerics/MathUtils');

var PlayerSkillsToPerformancesLayer = function(parentGraph, teams) {
	PlayerSkillsToPerformancesLayer.super_.call(this, parentGraph);
};

util.inherits(PlayerSkillsToPerformancesLayer, TrueSkillFactorGraphLayer);

PlayerSkillsToPerformancesLayer.prototype.buildLayer = function() {
	var inputVariablesGroups = this.getInputVariablesGroups();
	for (var i = 0; i < inputVariablesGroups.length; i++) {
		var currentTeam = inputVariablesGroups[i];
		var currentTeamPlayerPerformances = [];

		for (var j = 0; j < currentTeam.length; j++) {
			var playerSkillVariable = currentTeam[j];
			var playerPerformance = this.createOutputVariable(playerSkillVariable.getKey());
			this.addLayerFactor(this.createLikelihood(playerSkillVariable, playerPerformance));
			currentTeamPlayerPerformances.push(playerPerformance);
		}

		this.addOutputVariableGroup(currentTeamPlayerPerformances);
	}
};

PlayerSkillsToPerformancesLayer.prototype.createLikelihood = function(playerSkill,
	playerPerformance) {
	return new GaussianLikelihoodFactor(MathUtils.square(this.getParentFactorGraph().getGameInfo().getBeta()), playerPerformance, playerSkill);
};

PlayerSkillsToPerformancesLayer.prototype.createOutputVariable = function(playerKey) {
	return new KeyedVariable(playerKey, GaussianDistribution.UNIFORM, "%s's performance",
		playerKey);
};

PlayerSkillsToPerformancesLayer.prototype.createPriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var likelihood = localFactors[i];
		schedules.push(new ScheduleStep("Skill to Perf step", likelihood, 0));
	}
	return this.createScheduleSequence(schedules, "All skill to performance sending");
};

PlayerSkillsToPerformancesLayer.prototype.createPosteriorSchedule = function() {
	var schedules = [];
	var localFactors = this.getLocalFactors();
	for (var i = 0; i < localFactors.length; i++) {
		var likelihood = localFactors[i];
		schedules.push(new ScheduleStep("Skill to Perf step", likelihood, 1));
	}
	return this.createScheduleSequence(schedules, "All skill to performance sending");
};

module.exports = PlayerSkillsToPerformancesLayer;
