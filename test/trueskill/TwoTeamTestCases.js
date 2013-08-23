/**
 * A set of test cases called from a number of different calculator tests:
 *
 *		TwoTeamTrueSkillCalculator
 *
 * Where there are more than 3 digits of precision after the decimal
 * point, then the expected values were calculated using RalfH's F#
 * implementation with the same input.
 *
 * The F# implementation didn't support teams, so team values all came
 * from the online calculator at:
 * http://atom.research.microsoft.com/trueskill/rankcalculator.aspx
 *
 * All match quality expected values came from the online calculator.
 *
 * In both cases, there may be some discrepancy after the first decimal
 * point.  Due to this implementation using slightly higher precision in
 * GaussianDistribution class.
 */
var GameInfo = require('../../lib/GameInfo');
var Player = require('../../lib/Player');
var Rating = require('../../lib/Rating');
var Team = require('../../lib/Team');
var TestUtil = require('../TestUtil');

/*
 * Two team tests.
 */
exports.testOneOnTwoSimple = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var player3 = new Player('3');

	var team2 = new Team('Two')
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 33.730, 7.317, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 16.270, 7.317, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 16.270, 7.317, newRatingsWinLose[player3]);

	TestUtil.assertMatchQuality(test, 0.135, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testOneOnTwoDraw = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var player3 = new Player('3');

	var team2 = new Team('Two')
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 1]);

	// Winners
	TestUtil.assertRating(test, 31.660, 7.138, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 18.340, 7.138, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 18.340, 7.138, newRatingsWinLose[player3]);

	TestUtil.assertMatchQuality(test, 0.135, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testOneOnTwoSomewhatBalanced = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, new Rating(40, 6));

	var player2 = new Player('2');
	var player3 = new Player('3');

	var team2 = new Team('Two')
		.addPlayer(player2, new Rating(20, 7))
		.addPlayer(player3, new Rating(25, 8));

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 42.744, 5.602, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 16.266, 6.359, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 20.123, 7.028, newRatingsWinLose[player3]);

	TestUtil.assertMatchQuality(test, 0.478, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testOneOnThreeDraw = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 1]);

	// Winners
	TestUtil.assertRating(test, 34.990, 7.455, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 15.010, 7.455, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 15.010, 7.455, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 15.010, 7.455, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.012, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testOneOnThreeSimple = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 36.337, 7.527, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 13.663, 7.527, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 13.663, 7.527, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 13.663, 7.527, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.012, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testOneOnSevenSimple = function(test, calculator) {
	var player1 = new Player('1');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var player5 = new Player('5');
	var player6 = new Player('6');
	var player7 = new Player('7');
	var player8 = new Player('8');

	var team2 = new Team('Two')
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating())
		.addPlayer(player5, gameInfo.getDefaultRating())
		.addPlayer(player6, gameInfo.getDefaultRating())
		.addPlayer(player7, gameInfo.getDefaultRating())
		.addPlayer(player8, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 40.582, 7.917, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player4]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player5]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player6]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player7]);
	TestUtil.assertRating(test, 9.418, 7.917, newRatingsWinLose[player8]);

	TestUtil.assertMatchQuality(test, 0.000, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

/*
 * Next the 2 vs...
 */
exports.testTwoOnTwoSimple = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating())
		.addPlayer(player2, gameInfo.getDefaultRating());

	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 28.108, 7.774, newRatingsWinLose[player1]);
	TestUtil.assertRating(test, 28.108, 7.774, newRatingsWinLose[player2]);

	// Losers
	TestUtil.assertRating(test, 21.892, 7.774, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 21.892, 7.774, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.447, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testTwoOnTwoUnbalancedDraw = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, new Rating(15, 8))
		.addPlayer(player2, new Rating(20, 6));

	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player3, new Rating(25, 4))
		.addPlayer(player4, new Rating(30, 3));

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 1]);

	// Winners
	TestUtil.assertRating(test, 21.570, 6.556, newRatingsWinLose[player1]);
	TestUtil.assertRating(test, 23.696, 5.418, newRatingsWinLose[player2]);

	// Losers
	TestUtil.assertRating(test, 23.357, 3.833, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 29.075, 2.931, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.214, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testTwoOnTwoDraw = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating())
		.addPlayer(player2, gameInfo.getDefaultRating());

	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 1]);

	// Winners
	TestUtil.assertRating(test, 25, 7.455, newRatingsWinLose[player1]);
	TestUtil.assertRating(test, 25, 7.455, newRatingsWinLose[player2]);

	// Losers
	TestUtil.assertRating(test, 25, 7.455, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 25, 7.455, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.447, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testTwoOnTwoUpset = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, new Rating(20, 8))
		.addPlayer(player2, new Rating(25, 6));

	var player3 = new Player('3');
	var player4 = new Player('4');

	var team2 = new Team('Two')
		.addPlayer(player3, new Rating(35, 7))
		.addPlayer(player4, new Rating(40, 5));

	var teams = Team.concat(team1, team2);
	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 29.698, 7.008, newRatingsWinLose[player1]);
	TestUtil.assertRating(test, 30.455, 5.594, newRatingsWinLose[player2]);

	// Losers
	TestUtil.assertRating(test, 27.575, 6.346, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 36.211, 4.768, newRatingsWinLose[player4]);

	TestUtil.assertMatchQuality(test, 0.084, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

/**
 * Then the 3 vs...
 */
exports.testThreeOnTwo = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');

	var team1 = new Team('One')
		.addPlayer(player1, new Rating(28, 7))
		.addPlayer(player2, new Rating(27, 6))
		.addPlayer(player3, new Rating(26, 5));


	var player4 = new Player('4');
	var player5 = new Player('5');

	var team2 = new Team('Two')
		.addPlayer(player4, new Rating(30, 4))
		.addPlayer(player5, new Rating(31, 3));

	var gameInfo = GameInfo.getDefaultGameInfo();

	var teams = Team.concat(team1, team2);
	var newRatingsWinLoseExpected = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 28.658, 6.770, newRatingsWinLoseExpected[player1]);
	TestUtil.assertRating(test, 27.484, 5.856, newRatingsWinLoseExpected[player2]);
	TestUtil.assertRating(test, 26.336, 4.917, newRatingsWinLoseExpected[player3]);

	// Losers
	TestUtil.assertRating(test, 29.785, 3.958, newRatingsWinLoseExpected[player4]);
	TestUtil.assertRating(test, 30.879, 2.983, newRatingsWinLoseExpected[player5]);

	var newRatingsWinLoseUpset = calculator.calculateNewRatings(gameInfo, Team.concat(team1, team2), [2, 1]);

	// Winners
	TestUtil.assertRating(test, 32.012, 3.877, newRatingsWinLoseUpset[player4]);
	TestUtil.assertRating(test, 32.132, 2.949, newRatingsWinLoseUpset[player5]);

	// Losers
	TestUtil.assertRating(test, 21.840, 6.314, newRatingsWinLoseUpset[player1]);
	TestUtil.assertRating(test, 22.474, 5.575, newRatingsWinLoseUpset[player2]);
	TestUtil.assertRating(test, 22.857, 4.757, newRatingsWinLoseUpset[player3]);

	TestUtil.assertMatchQuality(test, 0.254, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

/**
 * And finally the 4 vs...
 */
exports.testFourOnFourSimple = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');

	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One')
		.addPlayer(player1, gameInfo.getDefaultRating())
		.addPlayer(player2, gameInfo.getDefaultRating())
		.addPlayer(player3, gameInfo.getDefaultRating())
		.addPlayer(player4, gameInfo.getDefaultRating());

	var player5 = new Player('5');
	var player6 = new Player('6');
	var player7 = new Player('7');
	var player8 = new Player('8');

	var team2 = new Team('Two')
		.addPlayer(player5, gameInfo.getDefaultRating())
		.addPlayer(player6, gameInfo.getDefaultRating())
		.addPlayer(player7, gameInfo.getDefaultRating())
		.addPlayer(player8, gameInfo.getDefaultRating());


	var teams = Team.concat(team1, team2);

	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	// Winners
	TestUtil.assertRating(test, 27.198, 8.059, newRatingsWinLose[player1]);
	TestUtil.assertRating(test, 27.198, 8.059, newRatingsWinLose[player2]);
	TestUtil.assertRating(test, 27.198, 8.059, newRatingsWinLose[player3]);
	TestUtil.assertRating(test, 27.198, 8.059, newRatingsWinLose[player4]);

	// Losers
	TestUtil.assertRating(test, 22.802, 8.059, newRatingsWinLose[player5]);
	TestUtil.assertRating(test, 22.802, 8.059, newRatingsWinLose[player6]);
	TestUtil.assertRating(test, 22.802, 8.059, newRatingsWinLose[player7]);
	TestUtil.assertRating(test, 22.802, 8.059, newRatingsWinLose[player8]);

	TestUtil.assertMatchQuality(test, 0.447, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

// TODO: Assert failures for larger teams
