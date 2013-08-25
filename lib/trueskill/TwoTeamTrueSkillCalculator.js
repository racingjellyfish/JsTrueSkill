/**
 * Calculates new ratings for only two teams where each team has 1 or more players.
 *
 * When you only have two teams, the math is still simple: no factor graphs are used yet.
 *
 */
var util = require('util');
var DrawMargin = require('./DrawMargin');
var TGCF = require('./TruncatedGaussianCorrectionFunctions');
var GameInfo = require('../GameInfo');
var Guard = require('../Guard');
var PairwiseComparison = require('../PairwiseComparison');
var RankSorter = require('../RankSorter');
var Rating = require('../Rating');
var SkillCalculator = require('../SkillCalculator');
var MathUtils = require('../numerics/MathUtils');
var Range = require('../numerics/Range');

var TwoTeamTrueSkillCalculator = function() {
	TwoTeamTrueSkillCalculator.super_.call(this, [],
		Range.exactly(2), Range.atLeast(1));
};

util.inherits(TwoTeamTrueSkillCalculator, SkillCalculator);

TwoTeamTrueSkillCalculator.prototype.calculateNewRatings = function(gameInfo,
	teams, teamRanks) {
	Guard.argumentNotNull(gameInfo, "gameInfo");
	this.validateTeamCountAndPlayersCountPerTeam(teams);

	// Make sure things are in order
	var sortedResults = RankSorter.sort(teams, teamRanks);
	var sortedTeams = sortedResults.items;
	var sortedRanks = sortedResults.itemRanks;

	var team1 = sortedTeams[0];
	var team2 = sortedTeams[1];

	var wasDraw = (sortedRanks[0] == sortedRanks[1]);

	var results = {};

	this.updatePlayerRatings(gameInfo, results, team1, team2,
		wasDraw ? PairwiseComparison.DRAW : PairwiseComparison.WIN);

	this.updatePlayerRatings(gameInfo, results, team2, team1,
		wasDraw ? PairwiseComparison.DRAW : PairwiseComparison.LOSE);

	return results;
};

TwoTeamTrueSkillCalculator.prototype.updatePlayerRatings = function(gameInfo,
	newPlayerRatings, selfTeam, otherTeam, selfToOtherTeamComparison) {
	var drawMargin =
		DrawMargin.getDrawMarginFromDrawProbability(gameInfo.getDrawProbability(),
		gameInfo.getBeta());
	var betaSquared = MathUtils.square(gameInfo.getBeta());
	var tauSquared = MathUtils.square(gameInfo.getDynamicsFactor());

	var totalPlayers = selfTeam.getSize() + otherTeam.getSize();

	var selfMeanSum = 0;
	var varianceSum = 0;
	var i;
	var currentPlayer;
	var r;
	for (i = 0; i < selfTeam.getSize(); i++) {
		currentPlayer = selfTeam.getPlayers()[i];
		r = selfTeam.getPlayerRating(currentPlayer);
		selfMeanSum += r.getMean();
		varianceSum += r.getVariance();
	}
	var otherTeamMeanSum = 0;
	for (i = 0; i < otherTeam.getSize(); i++) {
		currentPlayer = otherTeam.getPlayers()[i];
		r = otherTeam.getPlayerRating(currentPlayer);
		otherTeamMeanSum += r.getMean();
		varianceSum += r.getVariance();
	}

	var c = Math.sqrt(varianceSum + totalPlayers * betaSquared);

	var winningMean = selfMeanSum;
	var losingMean = otherTeamMeanSum;

	// switch results depending on the result, simplifies the maths
	switch (selfToOtherTeamComparison) {
		case PairwiseComparison.WIN:
		case PairwiseComparison.DRAW:
			// noting to do
			break;
		case PairwiseComparison.LOSE:
			// switch results
			winningMean = otherTeamMeanSum;
			losingMean = selfMeanSum;
			break;
	}

	var meanDelta = winningMean - losingMean;

	var v;
	var w;
	var rankMultiplier;

	if (selfToOtherTeamComparison != PairwiseComparison.DRAW) {
		// non-draw case
		v = TGCF.vExceedsMargin(meanDelta, drawMargin, c);
		w = TGCF.wExceedsMargin(meanDelta, drawMargin, c);
		rankMultiplier = selfToOtherTeamComparison.multiplier;
	} else {
		// assume draw
		v = TGCF.vWithinMargin(meanDelta, drawMargin, c);
		w = TGCF.wWithinMargin(meanDelta, drawMargin, c);
		rankMultiplier = 1;
	}

	for (i = 0; i < selfTeam.getSize(); i++) {
		currentPlayer = selfTeam.getPlayers()[i];
		var previousPlayerRating = selfTeam.getPlayerRating(currentPlayer);

		var meanMultiplier =
			(MathUtils.square(previousPlayerRating.getStandardDeviation()) +
				tauSquared) / c;
		var stdDevMultiplier =
			(MathUtils.square(previousPlayerRating.getStandardDeviation()) +
				tauSquared) / MathUtils.square(c);

		var playerMeanDelta = (rankMultiplier * meanMultiplier * v);
		var newMean = previousPlayerRating.getMean() + playerMeanDelta;

		var newStdDev = Math.sqrt((MathUtils.square(
			previousPlayerRating.getStandardDeviation()) +
			tauSquared) * (1 - w * stdDevMultiplier));

		newPlayerRatings[currentPlayer] = new Rating(newMean, newStdDev);
	}
};

TwoTeamTrueSkillCalculator.prototype.calculateMatchQuality = function(gameInfo,
	teams) {
	Guard.argumentNotNull(gameInfo, "gameInfo");
	this.validateTeamCountAndPlayersCountPerTeam(teams);

	// We've verified that there's just two teams
	var team1 = teams[0];
	var team1Count = team1.getSize();

	var team2 = teams[1];
	var team2Count = team2.getSize();

	var totalPlayers = team1Count + team2Count;

	var betaSquared = MathUtils.square(gameInfo.getBeta());

	var team1MeanSum = 0;
	var team1VarianceSum = 0;
	var i;
	var currentPlayer;
	var r;
	for (i = 0; i < team1.getSize(); i++) {
		currentPlayer = team1.getPlayers()[i];
		r = team1.getPlayerRating(currentPlayer);
		team1MeanSum += r.getMean();
		team1VarianceSum += r.getVariance();
	}

	var team2MeanSum = 0;
	var team2VarianceSum = 0;
	for (i = 0; i < team2.getSize(); i++) {
		currentPlayer = team2.getPlayers()[i];
		r = team2.getPlayerRating(currentPlayer);
		team2MeanSum += r.getMean();
		team2VarianceSum += r.getVariance();
	}

	// This comes from equation 4.1 in the TrueSkill paper on page 8
	// The equation was broken up into the part under the square root sign and
	// the exponential part to make the code easier to read.
	var sqrtPart = Math.sqrt((totalPlayers * betaSquared) /
		(totalPlayers * betaSquared + team1VarianceSum + team2VarianceSum));

	var expPart = Math.exp((-1 * MathUtils.square(team1MeanSum - team2MeanSum))/
			(2 * (totalPlayers * betaSquared + team1VarianceSum +
			team2VarianceSum)));

	return expPart * sqrtPart;
};

module.exports = TwoTeamTrueSkillCalculator;
