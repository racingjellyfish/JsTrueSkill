var Rating = require('../../../../src/racingjellyfish/jstrueskill/Rating');
var Team = require('../../../../src/racingjellyfish/jstrueskill/Team');

exports.testBasicValues = function(test) {
	var team = new Team();

	var expected = [];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	// TODO replace with actual Player when implemented
	var player = 'Player';
	team = new Team(player);
	expected = [];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	var rating = new Rating(0, 1);
	team = new Team(player, rating);
	expected = [player];
	test.deepEqual(team.getPlayers(), expected,
		'Expected players to be: ' + expected);

	expected = new Rating(0, 1);
	test.deepEqual(team.getPlayerRating(player), expected,
		'Expected rating to be: ' + expected);

	test.done();
};
