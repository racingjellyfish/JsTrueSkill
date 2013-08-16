var util = require('util');
var Rating = require('../Rating');
var Factor = require('../factorgraphs/Factor');
var FactorGraph = require('../factorgraphs/FactorGraph');
var FactorList = require('../factorgraphs/FactorList');
var KeyedVariable = require('../factorgraphs/KeyedVariable');
var Schedule = require('../factorgraphs/Schedule');
var ScheduleSequence = require('../factorgraphs/ScheduleSequence');
var GaussianDistribution = require('../numerics/GaussianDistribution');
var MathUtils = require('../numerics/MathUtils');
var IteratedTeamDifferencesInnerLayer = require('./layers/IteratedTeamDifferencesInnerLayer');
var PlayerPerformancesToTeamPerformancesLayer = require('./layers/PlayerPerformancesToTeamPerformancesLayer');
var PlayerPriorValuesToSkillsLayer = require('./layers/PlayerPriorValuesToSkillsLayer');
var PlayerSkillsToPerformancesLayer = require('./layers/PlayerSkillsToPerformancesLayer');
var TeamDifferencesComparisonLayer = require('./layers/TeamDifferencesComparisonLayer');
var TeamPerformancesToTeamPerformanceDifferencesLayer = require('./layers/TeamPerformancesToTeamPerformanceDifferencesLayer');

var TrueSkillFactorGraph = function(gameInfo, teams, teamRanks) {
    TrueSkillFactorGraph.super_.call(this);

    this.priorLayer = new PlayerPriorValuesToSkillsLayer(this, teams);
    this.setGameInfo(gameInfo);

    this.layers = [];
    this.layers.push(this.priorLayer);
    this.layers.push(new PlayerSkillsToPerformancesLayer(this));
    this.layers.push(new PlayerPerformancesToTeamPerformancesLayer(this));
    this.layers.push(new IteratedTeamDifferencesInnerLayer(
                          this,
                          new TeamPerformancesToTeamPerformanceDifferencesLayer(this),
                          new TeamDifferencesComparisonLayer(this, teamRanks)));
};

util.inherits(TrueSkillFactorGraph, FactorGraph);

TrueSkillFactorGraph.prototype.setGameInfo = function(gameInfo) {
    this.gameInfo = gameInfo;
};

TrueSkillFactorGraph.prototype.getGameInfo = function() {
    return this.gameInfo;
};

TrueSkillFactorGraph.prototype.buildGraph = function() {
    var lastOutput = null;

    for (var i = 0; i < this.layers.length; i++) {
        var currentLayer = this.layers[i];
        if (lastOutput !== null) {
            currentLayer.setInputVariablesGroups(lastOutput);
        }

        currentLayer.buildLayer();

        lastOutput = currentLayer.getOutputVariablesGroups();
    }
};

TrueSkillFactorGraph.prototype.runSchedule = function() {
    var fullSchedule = this.createFullSchedule();
    fullSchedule.visit();
};

TrueSkillFactorGraph.prototype.getProbabilityOfRanking = function() {
    var factorList = new FactorList();

    for (var i = 0; i < this.layers.length; i++) {
        var currentLayer = this.layers[i];
        for (var j = 0; j < currentLayer.getLocalFactors().length; j++) {
            var currentFactor = currentLayer.getLocalFactors()[j];
            factorList.addFactor(currentFactor);
        }
    }

    var logZ = factorList.getLogNormalization();

    return Math.exp(logZ);
};

TrueSkillFactorGraph.prototype.createFullSchedule = function() {
    var fullSchedule = [];

    var currentLayer = null;
    for (var i = 0; i < this.layers.length; i++) {
        currentLayer = this.layers[i];
        var currentPriorSchedule = currentLayer.createPriorSchedule();
        if (currentPriorSchedule !== null) {
            fullSchedule.push(currentPriorSchedule);
        }
    }

    // Getting as a list to use reverse()
    var allLayers = new Array(this.layers.length);
    allLayers = MathUtils.arrayCopy(this.layers, 0, allLayers, 0, this.layers.length);
    allLayers.reverse();

    for (i = 0; i < allLayers.length; i++) {
        currentLayer = allLayers[i];

        var currentPosteriorSchedule = currentLayer.createPosteriorSchedule();
        if (currentPosteriorSchedule !== null) {
            fullSchedule.push(currentPosteriorSchedule);
        }
    }

    return new ScheduleSequence("Full schedule", fullSchedule);
};

TrueSkillFactorGraph.prototype.getUpdatedRatings = function() {
    var result = {};

    // TODO teams is a list of lists?
    var teams = this.priorLayer.getOutputVariablesGroups();
    for (var i = 0; i < teams.length; i++) {
        var playerList = teams[i];
        for (var j = 0; j < playerList.length; j++) {
            var currentPlayer = playerList[j];

            result[currentPlayer.getKey()] = new Rating(currentPlayer.getValue().getMean(),
                currentPlayer.getValue().getStandardDeviation());
        }
    }

    return result;
};

module.exports = TrueSkillFactorGraph;
