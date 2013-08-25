/**
 * A set of test cases called from a number of different calculator tests:
 *
 *		FactorGraphTrueSkillCalculator
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

var ERROR_TOLERANCE_LARGE = 0.085;

/*
 * All multiple team scenarios.
 */
exports.testThreeTeamsOfOneNotDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2, 3]);

	TestUtil.assertRating(test, 31.675352419172107, 6.6559853776206905,
		newRatings[player1]);

	TestUtil.assertRating(test, 25.000000000003912, 6.2078966412243233,
		newRatings[player2]);

	TestUtil.assertRating(test, 18.324647580823971, 6.6559853776218318,
		newRatings[player3]);

	TestUtil.assertMatchQuality(test, 0.200,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testThreeTeamsOfOneDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 1, 1]);

	TestUtil.assertRating(test, 25.000, 5.698, newRatings[player1]);

	TestUtil.assertRating(test, 25.000, 5.695, newRatings[player2]);

	TestUtil.assertRating(test, 25.000, 5.698, newRatings[player3]);

	TestUtil.assertMatchQuality(test, 0.200,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testFourTeamsOfOneNotDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());
	var team4 = new Team('Four', player4, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3, team4);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2, 3, 4]);

	TestUtil.assertRating(test, 33.206680965631264, 6.3481091698077057,
		newRatings[player1]);

	TestUtil.assertRating(test, 27.401454693843323, 5.7871629348447584,
		newRatings[player2]);

	TestUtil.assertRating(test, 22.598545306188374, 5.7871629348413451,
		newRatings[player3]);

	TestUtil.assertRating(test, 16.793319034361271, 6.3481091698144967,
		newRatings[player4]);

	TestUtil.assertMatchQuality(test, 0.089,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testFiveTeamsOfOneNotDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var player5 = new Player('5');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());
	var team4 = new Team('Four', player4, gameInfo.getDefaultRating());
	var team5 = new Team('Five', player5, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3, team4, team5);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2, 3, 4, 5]);

	TestUtil.assertRating(test, 34.363135705841188, 6.1361528798112692,
		newRatings[player1]);

	TestUtil.assertRating(test, 29.058448805636779, 5.5358352402833413,
		newRatings[player2]);

	TestUtil.assertRating(test, 25.000000000031758, 5.4200805474429847,
		newRatings[player3]);

	TestUtil.assertRating(test, 20.941551194426314, 5.5358352402709672,
		newRatings[player4]);

	TestUtil.assertRating(test, 15.636864294158848, 6.136152879829349,
		newRatings[player5]);

	TestUtil.assertMatchQuality(test, 0.040,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testEightTeamsOfOneDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var player5 = new Player('5');
	var player6 = new Player('6');
	var player7 = new Player('7');
	var player8 = new Player('8');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());
	var team4 = new Team('Four', player4, gameInfo.getDefaultRating());
	var team5 = new Team('Five', player5, gameInfo.getDefaultRating());
	var team6 = new Team('Six', player6, gameInfo.getDefaultRating());
	var team7 = new Team('Seven', player7, gameInfo.getDefaultRating());
	var team8 = new Team('Eight', player8, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3, team4, team5, team6, team7, team8);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 1, 1, 1, 1, 1, 1, 1]);

	TestUtil.assertRating(test, 25.000, 4.592, newRatings[player1]);

	TestUtil.assertRating(test, 25.000, 4.583, newRatings[player2]);

	TestUtil.assertRating(test, 25.000, 4.576, newRatings[player3]);

	TestUtil.assertRating(test, 25.000, 4.573, newRatings[player4]);

	TestUtil.assertRating(test, 25.000, 4.573, newRatings[player5]);

	TestUtil.assertRating(test, 25.000, 4.576, newRatings[player6]);

	TestUtil.assertRating(test, 25.000, 4.583, newRatings[player7]);

	TestUtil.assertRating(test, 25.000, 4.592, newRatings[player8]);

	TestUtil.assertMatchQuality(test, 0.004,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testEightTeamsOfOneUpset = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var player5 = new Player('5');
	var player6 = new Player('6');
	var player7 = new Player('7');
	var player8 = new Player('8');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('', player1, new Rating(10, 8));
	var team2 = new Team('', player2, new Rating(15, 7));
	var team3 = new Team('', player3, new Rating(20, 6));
	var team4 = new Team('', player4, new Rating(25, 5));
	var team5 = new Team('', player5, new Rating(30, 4));
	var team6 = new Team('', player6, new Rating(35, 3));
	var team7 = new Team('', player7, new Rating(40, 2));
	var team8 = new Team('', player8, new Rating(45, 1));

	var teams = Team.concat(team1, team2, team3, team4, team5, team6, team7, team8);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams,
		[1, 2, 3, 4, 5, 6, 7, 8]);

	TestUtil.assertRating(test, 35.135, 4.506, newRatings[player1]);

	TestUtil.assertRating(test, 32.585, 4.037, newRatings[player2]);

	TestUtil.assertRating(test, 31.329, 3.756, newRatings[player3]);

	TestUtil.assertRating(test, 30.984, 3.453, newRatings[player4]);

	TestUtil.assertRating(test, 31.751, 3.064, newRatings[player5]);

	TestUtil.assertRating(test, 34.051, 2.541, newRatings[player6]);

	TestUtil.assertRating(test, 38.263, 1.849, newRatings[player7]);

	TestUtil.assertRating(test, 44.118, 0.983, newRatings[player8]);

	TestUtil.assertMatchQuality(test, 0.000,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testSixteenTeamsOfOneNotDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var player3 = new Player('3');
	var player4 = new Player('4');
	var player5 = new Player('5');
	var player6 = new Player('6');
	var player7 = new Player('7');
	var player8 = new Player('8');
	var player9 = new Player('9');
	var player10 = new Player('10');
	var player11 = new Player('11');
	var player12 = new Player('12');
	var player13 = new Player('13');
	var player14 = new Player('14');
	var player15 = new Player('15');
	var player16 = new Player('16');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var team3 = new Team('Three', player3, gameInfo.getDefaultRating());
	var team4 = new Team('Four', player4, gameInfo.getDefaultRating());
	var team5 = new Team('Five', player5, gameInfo.getDefaultRating());
	var team6 = new Team('Six', player6, gameInfo.getDefaultRating());
	var team7 = new Team('Seven', player7, gameInfo.getDefaultRating());
	var team8 = new Team('Eight', player8, gameInfo.getDefaultRating());
	var team9 = new Team('Nine', player9, gameInfo.getDefaultRating());
	var team10 = new Team('Ten', player10, gameInfo.getDefaultRating());
	var team11 = new Team('Eleven', player11, gameInfo.getDefaultRating());
	var team12 = new Team('Twelve', player12, gameInfo.getDefaultRating());
	var team13 = new Team('Thirteen', player13, gameInfo.getDefaultRating());
	var team14 = new Team('Fourteen', player14, gameInfo.getDefaultRating());
	var team15 = new Team('Fifteen', player15, gameInfo.getDefaultRating());
	var team16 = new Team('Sixteen', player16, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2, team3, team4, team5, team6, team7, team8,
		team9, team10, team11, team12, team13, team14, team15, team16);

	var newRatings = calculator.calculateNewRatings(gameInfo,
		teams, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

	TestUtil.assertRating(test, 40.53945776946920, 5.27581643889050,
		newRatings[player1]);

	TestUtil.assertRating(test, 36.80951229454210, 4.71121217610266,
		newRatings[player2]);

	TestUtil.assertRating(test, 34.34726355544460, 4.52440328139991,
		newRatings[player3]);

	TestUtil.assertRating(test, 32.33614722608720, 4.43258628279632,
		newRatings[player4]);

	TestUtil.assertRating(test, 30.55048814671730, 4.38010805034365,
		newRatings[player5]);

	TestUtil.assertRating(test, 28.89277312234790, 4.34859291776483,
		newRatings[player6]);

	TestUtil.assertRating(test, 27.30952161972210, 4.33037679041216,
		newRatings[player7]);

	TestUtil.assertRating(test, 25.76571046519540, 4.32197078088701,
		newRatings[player8]);

	TestUtil.assertRating(test, 24.23428953480470, 4.32197078088703,
		newRatings[player9]);

	TestUtil.assertRating(test, 22.69047838027800, 4.33037679041219,
		newRatings[player10]);

	TestUtil.assertRating(test, 21.10722687765220, 4.34859291776488,
		newRatings[player11]);

	TestUtil.assertRating(test, 19.44951185328290, 4.38010805034375,
		newRatings[player12]);

	TestUtil.assertRating(test, 17.66385277391300, 4.43258628279643,
		newRatings[player13]);

	TestUtil.assertRating(test, 15.65273644455550, 4.52440328139996,
		newRatings[player14]);

	TestUtil.assertRating(test, 13.19048770545810, 4.71121217610273,
		newRatings[player15]);

	TestUtil.assertRating(test, 9.46054223053080, 5.27581643889032,
		newRatings[player16]);

	test.done();
};

exports.testTwoOnFourOnTwoWinDraw = function(test, calculator) {
		var player1 = new Player('1');
		var player2 = new Player('2');

		var gameInfo = GameInfo.getDefaultGameInfo();

		var team1 = new Team('One')
			.addPlayer(player1, new Rating(40,4))
			.addPlayer(player2, new Rating(45,3));

		var player3 = new Player('3');
		var player4 = new Player('4');
		var player5 = new Player('5');
		var player6 = new Player('6');

		var team2 = new Team('Two')
					.addPlayer(player3, new Rating(20, 7))
					.addPlayer(player4, new Rating(19, 6))
					.addPlayer(player5, new Rating(30, 9))
					.addPlayer(player6, new Rating(10, 4));

		var player7 = new Player('7');
		var player8 = new Player('8');

		var team3 = new Team('Three')
					.addPlayer(player7, new Rating(50,5))
					.addPlayer(player8, new Rating(30,2));

		var teams = Team.concat(team1, team2, team3);
		var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, [1, 2, 2]);

		// Winners
		TestUtil.assertRating(test, 40.877, 3.840, newRatingsWinLose[player1]);
		TestUtil.assertRating(test, 45.493, 2.934, newRatingsWinLose[player2]);
		TestUtil.assertRating(test, 19.609, 6.396, newRatingsWinLose[player3]);
		TestUtil.assertRating(test, 18.712, 5.625, newRatingsWinLose[player4]);
		TestUtil.assertRating(test, 29.353, 7.673, newRatingsWinLose[player5]);
		TestUtil.assertRating(test, 9.872, 3.891, newRatingsWinLose[player6]);
		TestUtil.assertRating(test, 48.830, 4.590, newRatingsWinLose[player7]);
		TestUtil.assertRating(test, 29.813, 1.976, newRatingsWinLose[player8]);

		TestUtil.assertMatchQuality(test, 0.367,
			calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

/*
 * Partial play scenario.
 */
exports.testOneOnTwoBalancedPartialPlay = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2', 0.0);
	var player3 = new Player('3', 1.00);
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());

	var team2 = new Team('Two')
				.addPlayer(player2, gameInfo.getDefaultRating())
				.addPlayer(player3, gameInfo.getDefaultRating());

	var teams = Team.concat(team1, team2);
	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	/*
	 * The following expected values are copied from the actual output, hence the
	 * number of decimal places, however the values match the expected based on
	 * examination of the code.  The standard deviation is harder to confirm, hence
	 * this is not currently validated.
	 */
	var expected = 24.999560351959563;
	TestUtil.equalsWithTolerance(test, newRatings[player2].getMean(), expected,
		ERROR_TOLERANCE_LARGE, "Expected player 2 rating mean to be " + expected);
	expected = 20.603519595631585;
	TestUtil.equalsWithTolerance(test, newRatings[player3].getMean(), expected,
		ERROR_TOLERANCE_LARGE, "Expected player 3 rating mean to be " + expected);

	TestUtil.assertMatchQuality(test, 0.44721358745011336,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};
