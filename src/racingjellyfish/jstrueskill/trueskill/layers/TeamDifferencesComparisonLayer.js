var DefaultVariable = require('../../factorgraphs/DefaultVariable');
var Variable = require('../../factorgraphs/Variable');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var DrawMargin = require('../DrawMargin');
var TrueSkillFactorGraph = require('../TrueSkillFactorGraph');
var GaussianPriorFactor = require('../factors/GaussianPriorFactor');
var GaussianGreaterThanFactor = require('../factors/GaussianGreaterThanFactor');
var GaussianWithinFactor = require('../factors/GaussianWithinFactor');

var TeamDifferencesComparisonLayer = function(parentGraph, teamRanks) {
    TrueSkillFactorGraphLayer.call(this, parentGraph);

    this.teamRanks = teamRanks;
    var gameInfo = this.parentFactorGraph.getGameInfo();
    this.epsilon = DrawMargin.getDrawMarginFromDrawProbability(gameInfo.getDrawProbability(), gameInfo.getBeta());
};

TeamDifferencesComparisonLayer.prototype = new TrueSkillFactorGraphLayer();

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
