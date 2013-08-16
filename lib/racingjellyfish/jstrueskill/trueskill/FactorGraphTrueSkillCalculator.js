/**
 * Calculates TrueSkill using a full factor graph.
 */
var util = require('util');
var Matrix = require('sylvester').Matrix;
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
    FactorGraphTrueSkillCalculator.super_.call(this,
		[SupportedOptions.PartialPlay, SupportedOptions.PartialUpdate],
		Range.atLeast(2), Range.atLeast(1));
};

util.inherits(FactorGraphTrueSkillCalculator, SkillCalculator);

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

FactorGraphTrueSkillCalculator.prototype.calculateMatchQuality = function(gameInfo,
	teams) {
	// We need to create the A matrix which is the player team assigments.
	var teamAssignmentsList = new Array(teams.length);
	for (var i = 0; i < teamAssignmentsList.length; i++) {
		teamAssignmentsList[i] = teams[i];
	}
	var skillsMatrix = this.getPlayerCovarianceMatrix(teamAssignmentsList);
	var meanVector = this.getPlayerMeansVector(teamAssignmentsList);
	var meanVectorTranspose = meanVector.transpose();

	var playerTeamAssignmentsMatrix = this.createPlayerTeamAssignmentMatrix(teamAssignmentsList,
			meanVector.elements.length);
	var playerTeamAssignmentsMatrixTranspose = playerTeamAssignmentsMatrix.transpose();

	var betaSquared = MathUtils.square(gameInfo.getBeta());

	var start = meanVectorTranspose.multiply(playerTeamAssignmentsMatrix);
	// .multiply(betaSquared) is equivalent to scale(betaSquared)
	var aTa = playerTeamAssignmentsMatrixTranspose.multiply(playerTeamAssignmentsMatrix).multiply(betaSquared);
	var aTSA = playerTeamAssignmentsMatrixTranspose.multiply(skillsMatrix).multiply(playerTeamAssignmentsMatrix);
	var middle = aTa.add(aTSA);

	var middleInverse = middle.inverse();

	var end = playerTeamAssignmentsMatrixTranspose.multiply(meanVector);

	// .multiply(-0.5) is equivalent to scale(-0.5)
	var expPartMatrix = start.multiply(middleInverse).multiply(end).multiply(-0.5);
	var expPart = expPartMatrix.determinant();

	var sqrtPartNumerator = aTa.determinant();
	var sqrtPartDenominator = middle.determinant();
	var sqrtPart = sqrtPartNumerator / sqrtPartDenominator;

	var result = Math.exp(expPart) * Math.sqrt(sqrtPart);

	return result;
};

FactorGraphTrueSkillCalculator.prototype.getPlayerMeansVector =
	function(teamAssignmentsList) {
	// A simple list of all the player means.
	var temp = this.getPlayerMeanRatingValues(teamAssignmentsList);
	var tempa = new Array(temp.length);
	for (var i = 0; i < tempa.length; i++) {
		tempa[i] = temp[i];
	}
	return Matrix.create(tempa);
};

/**
 * This is a square matrix whose diagonal values represent the variance (square of standard deviation) of all
 * players.
 */
FactorGraphTrueSkillCalculator.prototype.getPlayerCovarianceMatrix =
	function(teamAssignmentsList) {
	var temp = this.getPlayerVarianceRatingValues(teamAssignmentsList);
	var tempa = new Array(temp.length);
	for (var i = 0; i < tempa.length; i++) {
		tempa[i] = temp[i];
	}
	return Matrix.Diagonal(tempa).transpose();
};

/**
 * TODO Make array? Helper function that gets a list of values for all player ratings
 */
FactorGraphTrueSkillCalculator.prototype.getPlayerMeanRatingValues =
	function(teamAssignmentsList) {
	var playerRatingValues = [];
	for (var i = 0; i < teamAssignmentsList.length; i++) {
		var currentTeam = teamAssignmentsList[i];
		for (var j = 0; j < currentTeam.getPlayers().length; j++) {
			var currentPlayer = currentTeam.getPlayers()[j];
			var currentRating = currentTeam.getPlayerRating(currentPlayer);
			playerRatingValues.push(currentRating.getMean());
		}
	}

	return playerRatingValues;
};

/**
 * TODO Make array? Helper function that gets a list of values for all player ratings
 */
FactorGraphTrueSkillCalculator.prototype.getPlayerVarianceRatingValues =
	function(teamAssignmentsList) {
	var playerRatingValues = [];
	for (var i = 0; i < teamAssignmentsList.length; i++) {
		var currentTeam = teamAssignmentsList[i];
		for (var j = 0; j < currentTeam.getPlayers().length; j++) {
			var currentPlayer = currentTeam.getPlayers()[j];
			var currentRating = currentTeam.getPlayerRating(currentPlayer);
			playerRatingValues.push(currentRating.getVariance());
		}
	}

	return playerRatingValues;
};

/**
 * The team assignment matrix is often referred to as the "A" matrix. It's a matrix whose rows represent the players
 * and the columns represent teams. At Matrix[row, column] represents that player[row] is on team[col] Positive
 * values represent an assignment and a negative value means that we subtract the value of the next team since we're
 * dealing with pairs. This means that this matrix always has teams - 1 columns. The only other tricky thing is that
 * values represent the play percentage.
 * <p>
 * For example, consider a 3 team game where team1 is just player1, team 2 is player 2 and player 3, and team3 is
 * just player 4. Furthermore, player 2 and player 3 on team 2 played 25% and 75% of the time (e.g. partial play),
 * the A matrix would be:
 * <p>
 *
 * <pre>
 * A = this 4x2 matrix:
 * |  1.00  0.00 |
 * | -0.25  0.25 |
 * | -0.75  0.75 |
 * |  0.00 -1.00 |
 * </pre>
 */
FactorGraphTrueSkillCalculator.prototype.createPlayerTeamAssignmentMatrix =
	function(teamAssignmentsList, totalPlayers) {
	var playerAssignments = [];
	var totalPreviousPlayers = 0;

	for (var i = 0; i < teamAssignmentsList.length - 1; i++) {
		var currentTeam = teamAssignmentsList[i];
		// Need to add in 0's for all the previous players, since they're not
		// on this team
		var currentRowValues = new Array(totalPlayers);
		var index;
		for (index = 0; index < totalPlayers; index++) {
			currentRowValues[index] = 0;
		}
		index = 0;
		for (var j = 0; j < totalPreviousPlayers; j++) {
			currentRowValues[index] = 0;
			index++;
		}
		playerAssignments.push(currentRowValues);

		for (var k = 0; k < currentTeam.getPlayers().length; k++) {
			var player = currentTeam.getPlayers()[k];
			currentRowValues[index] = PartialPlay.getPartialPlayPercentage(player);
			index++;
			// indicates the player is on the team
			totalPreviousPlayers++;
		}

		var nextTeam = teamAssignmentsList[i + 1];
		for (var m = 0; m < nextTeam.getPlayers().length; m++) {
			var nextTeamPlayer = nextTeam.getPlayers()[m];
			// Add a -1 * playing time to represent the difference
			currentRowValues[index] = -1 * PartialPlay.getPartialPlayPercentage(nextTeamPlayer);
			index++;
		}
	}

	// original code appears to transpose manually?
	return Matrix.create(playerAssignments).transpose();
};

module.exports = FactorGraphTrueSkillCalculator;
