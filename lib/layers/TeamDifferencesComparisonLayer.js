/**
 * A layer comparing team differences.
 *
 * @type {*}
 */
var util = require('util');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');
var GaussianGreaterThanFactor = require('../factors/GaussianGreaterThanFactor');
var GaussianWithinFactor = require('../factors/GaussianWithinFactor');
var Variable = require('../factorgraphs/Variable');
var GaussianDistribution = require('../numerics/GaussianDistribution');
var DrawMargin = require('../trueskill/DrawMargin');

var TeamDifferencesComparisonLayer = function(parentGraph, teamRanks) {
	TeamDifferencesComparisonLayer.super_.call(this, parentGraph);

	this.teamRanks = teamRanks;
	var gameInfo = parentGraph.getGameInfo();
	this.epsilon = DrawMargin.getDrawMarginFromDrawProbability(gameInfo.getDrawProbability(), gameInfo.getBeta());
};

util.inherits(TeamDifferencesComparisonLayer, TrueSkillFactorGraphLayer);

TeamDifferencesComparisonLayer.prototype.buildLayer = function() {
	for (var i = 0; i < this.getInputVariablesGroups().length; i++) {
		var isDraw = (this.teamRanks[i] == this.teamRanks[i + 1]);
		var teamDifference = this.getInputVariablesGroups()[i][0];

		var factor = isDraw ?
			new GaussianWithinFactor(this.epsilon, teamDifference) :
			new GaussianGreaterThanFactor(this.epsilon, teamDifference);

		this.addLayerFactor(factor);
	}
};

module.exports = TeamDifferencesComparisonLayer;
