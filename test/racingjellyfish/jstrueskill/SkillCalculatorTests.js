var Player = require('../../../lib/racingjellyfish/jstrueskill/Player');
var Rating = require('../../../lib/racingjellyfish/jstrueskill/Rating');
var SkillCalculator = require('../../../lib/racingjellyfish/jstrueskill/SkillCalculator');
var SupportedOptions = require('../../../lib/racingjellyfish/jstrueskill/SupportedOptions');
var Team = require('../../../lib/racingjellyfish/jstrueskill/Team');
var Range = require('../../../lib/racingjellyfish/jstrueskill/numerics/Range');

exports.testConstructor = function(test) {
	var skillCalculator = new SkillCalculator([],
		Range.exactly(2), Range.exactly(2));

	test.ok(skillCalculator !== undefined, "Expected valid object");

	test.done();
};

exports.testAbstractMethods = function(test) {
	var skillCalculator = new SkillCalculator([],
		Range.exactly(2), Range.exactly(2));

	test.throws(( function() {skillCalculator.calculateNewRatings();} ),
		"Expected calculateNewRatings to throw");
	test.throws(( function() {skillCalculator.calculateMatchQuality();} ),
		"Expected calculateMatchQuality to throw");

	test.done();
};

exports.testSupportedOptions = function(test) {
	var skillCalculator = new SkillCalculator([SupportedOptions.PartialPlay],
		Range.exactly(2), Range.exactly(2));

	test.ok(skillCalculator.isSupported(SupportedOptions.PartialPlay),
		"Expected 'PartialPlay' to be supported");
	test.ok(!skillCalculator.isSupported(SupportedOptions.PartialUpdate),
		"Did not expected 'PartialUpdate' to be supported");

	test.done();
};

exports.testValidateTeamsAndPlayers = function(test) {
	var skillCalculator = new SkillCalculator([], Range.exactly(2), Range.exactly(2));
	var teams = [];
	var player0 = new Player('Zero');
	var player1 = new Player('One');
	var player2 = new Player('Two');
	var player3 = new Player('Three');
	var rating = new Rating(0, 1);
	var team0 = new Team('1', player0, rating);
	team0.addPlayer(player1, rating);
	teams.push(team0);
	var team1 = new Team('2', player2, rating);
	team1.addPlayer(player3, rating);
	teams.push(team1);

	test.ok(skillCalculator.validateTeamCountAndPlayersCountPerTeam(teams),
		"Expected specified teams to be valid");

	skillCalculator = new SkillCalculator([], Range.exactly(1), Range.exactly(2));
	test.throws(( function() {
		skillCalculator.validateTeamCountAndPlayersCountPerTeam(teams);} ),
		"Expected specified teams to be invalid");

	skillCalculator = new SkillCalculator([], Range.exactly(2), Range.exactly(3));
	test.throws(( function() {
		skillCalculator.validateTeamCountAndPlayersCountPerTeam(teams);} ),
		"Expected specified teams to be invalid");

	test.done();
};
