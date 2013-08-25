var GameInfo = require('../lib/GameInfo');
var Player = require('../lib/Player');
var RankSorter = require('../lib/RankSorter');
var Team = require('../lib/Team');

exports.testNoConstructor = function(test) {
	test.ok(typeof RankSorter !== 'function', 'No constructor expected');

	test.done();
};

exports.testNullChecks = function(test) {
	test.throws(( function() {RankSorter.sort(null, null);} ),
		'Expected sort(null, null) to throw');

	test.throws(( function() {RankSorter.sort({}, null);} ),
		'Expected sort(null, null) to throw');

	test.throws(( function() {RankSorter.sort(null, {});} ),
		'Expected sort(null, null) to throw');

	test.done();
};

exports.testSortAlreadySorted = function(test) {
	var people = ["One", "Two", "Three"];
	var ranks = [1, 2, 3];

	var sortedResults = RankSorter.sort(people, ranks);

	var expected = ["One", "Two", "Three"];
	test.deepEqual(sortedResults.items, expected,
		'Expected sorted people to be ' + expected);

	expected = [1, 2, 3];
	test.deepEqual(sortedResults.itemRanks, expected,
		'Expected sorted ranks to be ' + expected);

	test.done();
};

exports.testSortUnsorted = function(test) {
	var people = ["Five", "Two1", "Two2", "One", "Four"];
	var ranks = [5, 2, 2, 1, 4];

	var sortedResults = RankSorter.sort(people, ranks);

	var expected = ["One", "Two1", 'Two2', "Four", 'Five'];
	test.deepEqual(sortedResults.items, expected,
		'Expected sorted people to be ' + expected);

	expected = [1, 2, 2, 4, 5];
	test.deepEqual(sortedResults.itemRanks, expected,
		'Expected sorted ranks to be ' + expected);

	test.done();
};

exports.testTeamSort = function(test) {
	var player1 = new Player('1');
	var player2 = new Player('2');
	var gameInfo = GameInfo.getDefaultGameInfo();

	var team1 = new Team('One', player1, gameInfo.getDefaultRating());
	var team2 = new Team('Two', player2, gameInfo.getDefaultRating());
	var teams = Team.concat(team2, team1);

	var ranks = [2, 1];

	var sortedResults = RankSorter.sort(teams, ranks);

	var expected = [1, 2];
	test.deepEqual(sortedResults.itemRanks, expected,
		'Expected sorted ranks to be ' + expected);

	expected = [team1, team2];
	test.deepEqual(sortedResults.items, expected,
		'Expected sorted teams to be ' + expected);

	test.done();
};
