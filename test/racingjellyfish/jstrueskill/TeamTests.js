var Rating = require('../../../lib/racingjellyfish/jstrueskill/Rating');
var Player = require('../../../lib/racingjellyfish/jstrueskill/Player');
var Team = require('../../../lib/racingjellyfish/jstrueskill/Team');

exports.testBasicValues = function(test) {
	var team = new Team('One');

	var expected = [];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	var player = new Player('One');
	team = new Team('One', player, undefined);
	expected = [];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	var rating = new Rating(0, 1);
	team = new Team('One', player, rating);
	expected = [player];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	expected = new Rating(0, 1);
	test.deepEqual(team.getPlayerRating(player), expected,
		'Expected rating to be: ' + expected);

	test.done();
};

exports.testId = function(test) {
	test.throws(( function() {new Team(1);} ), 'Expected Team(1) to throw');

	var team1 = new Team('One');
	var team2 = new Team('Two');

	var teams = Team.concat(team1, team2);

	var expected = [team1, team2];
	test.deepEqual(teams, expected, 'Expected teams to be: ' + expected);

	test.done();
};

exports.testIncorrectConstructorArgumentsLengthThrows = function(test) {
	test.throws(( function() {new Team();} ), 'Expected Team() to throw');

	var player = new Player('One');
	test.throws(( function() {new Team('1', player);} ),
		'Expected Team("1", player) to throw');

	var rating = new Rating(0, 1);
	test.throws(( function() {new Team(player, rating);} ), 'Expected Team(player, rating) to throw');

	test.done();
};
