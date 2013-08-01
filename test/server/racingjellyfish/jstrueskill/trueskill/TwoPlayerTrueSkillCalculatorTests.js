/* Where there are more than 3 digits of precision after the decimal
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
var TwoPlayerTrueSkillCalculator =
	require('../../../../../src/racingjellyfish/jstrueskill/trueskill/TwoPlayerTrueSkillCalculator');
var GameInfo = require('../../../../../src/racingjellyfish/jstrueskill/GameInfo');
var Player = require('../../../../../src/racingjellyfish/jstrueskill/Player');
var Team = require('../../../../../src/racingjellyfish/jstrueskill/Team');
var TestUtil = require('../TestUtil');

var calculator;

exports.setUp = function(callback) {
	calculator = new TwoPlayerTrueSkillCalculator();

	callback();
};

exports.testNotDrawn = function(test) {
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
/*
exports.testDrawn = function(test) {
	Player<Integer> player1 = new Player<Integer>(1);
	Player<Integer> player2 = new Player<Integer>(2);
	GameInfo gameInfo = GameInfo.getDefaultGameInfo();

	Team team1 = new Team('One', player1, gameInfo.getDefaultRating());
	Team team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	Collection<ITeam> teams = Team.concat(team1, team2);

	Map<IPlayer, Rating> newRatings = calculator.calculateNewRatings(gameInfo, teams, 1, 1);

	Rating player1NewRating = newRatings.get(player1);
	assertRating(25.0, 6.4575196623173081, player1NewRating);

	Rating player2NewRating = newRatings.get(player2);
	assertRating(25.0, 6.4575196623173081, player2NewRating);

	assertMatchQuality(0.447, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

exports.testChessNotDrawn = function(test) {
	// Inspired by a real bug :-)
	Player<Integer> player1 = new Player<Integer>(1);
	Player<Integer> player2 = new Player<Integer>(2);
	GameInfo gameInfo = new GameInfo(1200.0, 1200.0 / 3.0, 200.0, 1200.0 / 300.0, 0.03);

	Team team1 = new Team('One', player1, new Rating(1301.0007, 42.9232));
	Team team2 = new Team('Two', player2, new Rating(1188.7560, 42.5570));

	Map<IPlayer, Rating> newRatings = calculator.calculateNewRatings(gameInfo, Team.concat(team1, team2), 1, 2);

	Rating player1NewRating = newRatings.get(player1);
	assertRating(1304.7820836053318, 42.843513887848658, player1NewRating);

	Rating player2NewRating = newRatings.get(player2);
	assertRating(1185.0383099003536, 42.485604606897752, player2NewRating);

	test.done();
};

exports.testOneOnOneMassiveUpsetDraw = function(test) {
	Player<Integer> player1 = new Player<Integer>(1);

	GameInfo gameInfo = GameInfo.getDefaultGameInfo();

	Team team1 = new Team('One').addPlayer(player1, gameInfo.getDefaultRating());

	Player<Integer> player2 = new Player<Integer>(2);

	Team team2 = new Team('Two').addPlayer(player2, new Rating(50, 12.5));

	Collection<ITeam> teams = Team.concat(team1, team2);

	Map<IPlayer, Rating> newRatingsWinLose = calculator.calculateNewRatings(gameInfo, teams, 1, 1);

	// Winners
	assertRating(31.662, 7.137, newRatingsWinLose.get(player1));

	// Losers
	assertRating(35.010, 7.910, newRatingsWinLose.get(player2));

	assertMatchQuality(0.110, calculator.calculateMatchQuality(gameInfo, teams));

	test.done();
};

	// TODO: Assert failures for larger teams
*/
