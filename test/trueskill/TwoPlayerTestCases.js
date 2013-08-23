/**
 * A set of test cases called from a number of different calculator tests:
 *
 *		TwoPlayerTrueSkillCalculator
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
 * Two player tests.
 */
exports.testNotDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var teams = Team.concat(team1, team2);

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 2]);

	var player1NewRating = newRatings[player1];
	TestUtil.assertRating(test, 29.39583201999924, 7.171475587326186,
		player1NewRating);

	var player2NewRating = newRatings[player2];
	TestUtil.assertRating(test, 20.60416798000076, 7.171475587326186,
		player2NewRating);

	TestUtil.assertMatchQuality(test, 0.447,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testDrawn = function(test, calculator) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var teams = Team.concat(team1, team2);

	var newRatings = calculator.calculateNewRatings(gameInfo, teams, [1, 1]);

	var player1NewRating = newRatings[player1];
	TestUtil.assertRating(test, 25.0, 6.4575196623173081,
		player1NewRating);

	var player2NewRating = newRatings[player2];
	TestUtil.assertRating(test, 25.0, 6.4575196623173081,
		player2NewRating);

	TestUtil.assertMatchQuality(test, 0.447,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testChessNotDrawn = function(test, calculator) {
	// Inspired by a real bug :-)
	var player1 = new Player('1');
	var player2 = new Player('2');
	var gameInfo = new GameInfo(1200.0, 1200.0 / 3.0, 200.0, 1200.0 / 300.0, 0.03);

	var team1 = new Team('One', player1, new Rating(1301.0007, 42.9232));
	var team2 = new Team('Two', player2, new Rating(1188.7560, 42.5570));

	var newRatings = calculator.calculateNewRatings(gameInfo,
		Team.concat(team1, team2), [1, 2]);

	var player1NewRating = newRatings[player1];
	TestUtil.assertRating(test, 1304.7820836053318, 42.843513887848658,
		player1NewRating);

	var player2NewRating = newRatings[player2];
	TestUtil.assertRating(test, 1185.0383099003536, 42.485604606897752,
		player2NewRating);

	test.done();
};

exports.testMassiveUpsetDraw = function(test, calculator) {
	var gameInfo = GameInfo.getDefaultGameInfo();
	var player1 = new Player('1');
	var team1 = new Team('One', player1, gameInfo.getDefaultRating());

	var player2 = new Player('2');
	var team2 = new Team('Two', player2, new Rating(50, 12.5));

	var teams = Team.concat(team1, team2);

	var newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams,
		[1, 1]);

	// Winners
	TestUtil.assertRating(test, 31.662, 7.137, newRatingsWinLose[player1]);

	// Losers
	TestUtil.assertRating(test, 35.010, 7.910, newRatingsWinLose[player2]);

	TestUtil.assertMatchQuality(test, 0.110,
		calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

// TODO: Assert failures for larger teams
