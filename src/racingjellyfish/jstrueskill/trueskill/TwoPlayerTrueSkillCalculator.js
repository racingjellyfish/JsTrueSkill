/**
 * Calculates the new ratings for only two players.
 * <remarks>
 * When you only have two players, a lot of the math simplifies. The main purpose of this class
 * is to show the bare minimum of what a TrueSkill implementation should have.
 * </remarks>
 */
var util = require('util');
var GameInfo = require('../GameInfo');
var Guard = require('../Guard');
var PairwiseComparison = require('../PairwiseComparison');
var RankSorter = require('../RankSorter');
var Rating = require('../Rating');
var SkillCalculator = require('../SkillCalculator');
var MathUtils = require('../numerics/MathUtils');
var Range = require('../numerics/Range');
var DrawMargin = require('./DrawMargin');
var TGCF = require('./TruncatedGaussianCorrectionFunctions');

var TwoPlayerTrueSkillCalculator = function() {
	TwoPlayerTrueSkillCalculator.super_.call(this, [],
		Range.exactly(2), Range.exactly(1));
};

util.inherits(TwoPlayerTrueSkillCalculator, SkillCalculator);

TwoPlayerTrueSkillCalculator.prototype.calculateNewRatings = function(gameInfo,
	teams, teamRanks) {
	// Basic argument checking
	Guard.argumentNotNull(gameInfo, "gameInfo");
	this.validateTeamCountAndPlayersCountPerTeam(teams);

	// Make sure things are in order
	var sortedResults = RankSorter.sort(teams, teamRanks);
	var sortedTeams = sortedResults.items;
	var sortedRanks = sortedResults.itemRanks;

	// Since we verified that each team has one player, we know the
	// player is the first one
	var winningTeam = sortedTeams[0];
	var winner = winningTeam.getPlayers()[0];
	var winnerPreviousRating = winningTeam.getPlayerRating(winner);

	var losingTeam = sortedTeams[1];
	var loser = losingTeam.getPlayers()[0];
	var loserPreviousRating = losingTeam.getPlayerRating(loser);

	var wasDraw = (sortedRanks[0] == sortedRanks[1]);

	var results = {};
	results[winner] = this.calculateNewRating(gameInfo, winnerPreviousRating, loserPreviousRating,
										wasDraw ? PairwiseComparison.DRAW : PairwiseComparison.WIN);
	results[loser] = this.calculateNewRating(gameInfo, loserPreviousRating, winnerPreviousRating,
										wasDraw ? PairwiseComparison.DRAW : PairwiseComparison.LOSE);

	// And we're done!
	return results;
};

TwoPlayerTrueSkillCalculator.prototype.calculateNewRating = function(gameInfo,
	selfRating, opponentRating, comparison) {
	var drawMargin =
		DrawMargin.getDrawMarginFromDrawProbability(gameInfo.getDrawProbability(),
		gameInfo.getBeta());

	var c = Math.sqrt(MathUtils.square(selfRating.getStandardDeviation()) +
			MathUtils.square(opponentRating.getStandardDeviation()) +
			2 * MathUtils.square(gameInfo.getBeta()));

	var winningMean = selfRating.getMean();
	var losingMean = opponentRating.getMean();

	// switch results depending on the result, simplifies the maths
	switch (comparison) {
		case PairwiseComparison.WIN:
		case PairwiseComparison.DRAW:
			// nothing to do
			break;
		case PairwiseComparison.LOSE:
			// switch results
			winningMean = opponentRating.getMean();
			losingMean = selfRating.getMean();
			break;
	}

	var meanDelta = winningMean - losingMean;

	var v;
	var w;
	var rankMultiplier;

	if (comparison != PairwiseComparison.DRAW) {
		// non-draw case
		v = TGCF.vExceedsMargin(meanDelta, drawMargin, c);
		w = TGCF.wExceedsMargin(meanDelta, drawMargin, c);
		rankMultiplier = comparison.multiplier;
	} else {
		v = TGCF.vWithinMargin(meanDelta, drawMargin, c);
		w = TGCF.wWithinMargin(meanDelta, drawMargin, c);
		rankMultiplier = 1;
	}

	var meanMultiplier = (selfRating.getVariance() +
		MathUtils.square(gameInfo.getDynamicsFactor())) / c;

	var varianceWithDynamics = selfRating.getVariance() +
		MathUtils.square(gameInfo.getDynamicsFactor());
	var stdDevMultiplier = varianceWithDynamics / MathUtils.square(c);

	var newMean = selfRating.getMean() + (rankMultiplier * meanMultiplier * v);
	var newStdDev = Math.sqrt(varianceWithDynamics * (1 - w * stdDevMultiplier));

	return new Rating(newMean, newStdDev);
};

TwoPlayerTrueSkillCalculator.prototype.calculateMatchQuality = function(gameInfo,
	teams) {
	Guard.argumentNotNull(gameInfo, "gameInfo");
	this.validateTeamCountAndPlayersCountPerTeam(teams);

	var player1 = teams[0].getPlayers()[0];
	var player2 = teams[1].getPlayers()[0];
	var player1Rating = teams[0].getPlayerRating(player1);
	var player2Rating = teams[1].getPlayerRating(player2);

	// We just use equation 4.1 found on page 8 of the TrueSkill 2006 paper:
	var betaSquared = MathUtils.square(gameInfo.getBeta());
	var player1SigmaSquared = player1Rating.getVariance();
	var player2SigmaSquared = player2Rating.getVariance();

	// This is the square root part of the equation:
	var sqrtPart = Math.sqrt((2 * betaSquared) /
		(2 * betaSquared + player1SigmaSquared + player2SigmaSquared));

	// This is the exponent part of the equation:
	var expPart = Math.exp((-1 * MathUtils.square(player1Rating.getMean() -
		player2Rating.getMean())) /
		(2 * (2 * betaSquared + player1SigmaSquared + player2SigmaSquared)));

	return sqrtPart * expPart;
};

module.exports = TwoPlayerTrueSkillCalculator;
