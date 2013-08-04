/**
 * Calculates TrueSkill using a full factor graph.
 */
var GameInfo = require('../GameInfo');
var Guard = require('../Guard');
var PairwiseComparison = require('../PairwiseComparison');
var PartialPlay = require('../PartialPlay');
var RankSorter = require('../RankSorter');
var Rating = require('../Rating');
var SkillCalculator = require('../SkillCalculator');
var SupportedOptions = require('../SupportedOptions');
var MathUtils = require('../numerics/MathUtils');
var Range = require('../numerics/Range');
var DrawMargin = require('./DrawMargin');
var TrueSkillFactorGraph = require('./TrueSkillFactorGraph');
var TGCF = require('./TruncatedGaussianCorrectionFunctions');

//import org.ejml.simple.SimpleMatrix;

var FactorGraphTrueSkillCalculator = function() {
	SkillCalculator.call(this,
		[SupportedOptions.PartialPlay, SupportedOptions.PartialUpdate],
		Range.atLeast(2), Range.atLeast(1));
};

FactorGraphTrueSkillCalculator.prototype = new SkillCalculator();

FactorGraphTrueSkillCalculator.prototype.calculateNewRatings = function(gameInfo,
	teams, teamRanks) {
	Guard.argumentNotNull(gameInfo, "gameInfo");
	this.validateTeamCountAndPlayersCountPerTeam(teams);

	var sortedResults = RankSorter.sort(teams, teamRanks);
	var sortedTeams = sortedResults.items;
	var sortedRanks = sortedResults.itemRanks;

	var factorGraph = new TrueSkillFactorGraph(gameInfo, sortedTeams, sortedRanks);
	factorGraph.buildGraph();
	factorGraph.runSchedule();

	// TODO use this somehow?
	var probabilityOfOutcome = factorGraph.getProbabilityOfRanking();

	return factorGraph.getUpdatedRatings();
};

module.exports = FactorGraphTrueSkillCalculator;
