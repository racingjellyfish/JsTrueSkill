var util = require('util');
var Variable = require('../../factorgraphs/Variable');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var GaussianWeightedSumFactor = require('../factors/GaussianWeightedSumFactor');
var TrueSkillFactorGraphLayer = require('./TrueSkillFactorGraphLayer');

var TeamPerformancesToTeamPerformanceDifferencesLayer = function(parentGraph, teams) {
    TeamPerformancesToTeamPerformanceDifferencesLayer.super_.call(this, parentGraph);
};

util.inherits(TeamPerformancesToTeamPerformanceDifferencesLayer, TrueSkillFactorGraphLayer);

TeamPerformancesToTeamPerformanceDifferencesLayer.prototype.buildLayer = function() {
    for (var i = 0; i < this.getInputVariablesGroups().length - 1; i++) {
        var strongerTeam = this.getInputVariablesGroups()[i][0];
        var weakerTeam = this.getInputVariablesGroups()[i + 1][0];

        var currentDifference = this.createOutputVariable();
        this.addLayerFactor(
            this.createTeamPerformanceToDifferenceFactor(strongerTeam, weakerTeam,
                currentDifference));

        // REVIEW: Does it make sense to have groups of one?
        this.addOutputVariable(currentDifference);
    }
};

TeamPerformancesToTeamPerformanceDifferencesLayer.prototype.createTeamPerformanceToDifferenceFactor = function(
    strongerTeam, weakerTeam, output) {
    var teams = [];
    teams.push(strongerTeam);
    teams.push(weakerTeam);

    return new GaussianWeightedSumFactor(output, teams, [1.0, -1.0]);
};

TeamPerformancesToTeamPerformanceDifferencesLayer.prototype.createOutputVariable = function() {
    return new Variable(GaussianDistribution.UNIFORM, "Team performance difference");
};

module.exports = TeamPerformancesToTeamPerformanceDifferencesLayer;
