/**
 * This calculator supports up to two teams with many players on each team
 * so we need to reuse the 2 player test cases and add some extra cases to
 * cover the scenarios with more than 1 player on each team.
 */
var TwoTeamTrueSkillCalculator = require('../../lib/trueskill/TwoTeamTrueSkillCalculator');
var TwoPlayerTestCases = require('./TwoPlayerTestCases');
var TwoTeamTestCases = require('./TwoTeamTestCases');

var calculator;

exports.setUp = function(callback) {
	calculator = new TwoTeamTrueSkillCalculator();

	callback();
};

/*
 * All 2 player scenarios, i.e. 2 teams with 1 player on each team.
 */
exports.testDrawn = function(test) {
	TwoPlayerTestCases.testDrawn(test, calculator);
};

exports.testNotDrawn = function(test) {
	TwoPlayerTestCases.testNotDrawn(test, calculator);
};

exports.testChessNotDrawn = function(test) {
	TwoPlayerTestCases.testChessNotDrawn(test, calculator);
};

exports.testMassiveUpsetDraw = function(test) {
	TwoPlayerTestCases.testMassiveUpsetDraw(test, calculator);
};

/*
 * All 2 team scenarios, i.e. 2 teams with 1 or more players on each team.
 *
 * Start with the 1 vs...
 */
exports.testOneOnTwoSimple = function(test) {
	TwoTeamTestCases.testOneOnTwoSimple(test, calculator);
};

exports.testOneOnTwoDraw = function(test) {
	TwoTeamTestCases.testOneOnTwoSimple(test, calculator);
};

exports.testOneOnTwoSomewhatBalanced = function(test) {
	TwoTeamTestCases.testOneOnTwoSomewhatBalanced(test, calculator);
};

exports.testOneOnThreeDraw = function(test) {
	TwoTeamTestCases.testOneOnThreeDraw(test, calculator);
};

exports.testOneOnThreeSimple = function(test) {
	TwoTeamTestCases.testOneOnThreeSimple(test, calculator);
};

exports.testOneOnSevenSimple = function(test) {
	TwoTeamTestCases.testOneOnSevenSimple(test, calculator);
};

/*
 * Next the 2 vs...
 */
exports.testTwoOnTwoSimple = function(test) {
	TwoTeamTestCases.testTwoOnTwoSimple(test, calculator);
};

exports.testTwoOnTwoUnbalancedDraw = function(test) {
	TwoTeamTestCases.testTwoOnTwoUnbalancedDraw(test, calculator);
};

exports.testTwoOnTwoDraw = function(test) {
	TwoTeamTestCases.testTwoOnTwoDraw(test, calculator);
};

exports.testTwoOnTwoUpset = function(test) {
	TwoTeamTestCases.testTwoOnTwoUpset(test, calculator);
};

/**
 * Then the 3 vs...
 */
exports.testThreeOnTwo = function(test) {
	TwoTeamTestCases.testThreeOnTwo(test, calculator);
};

/**
 * And finally the 4 vs...
 */
exports.testFourOnFourSimple = function(test) {
	TwoTeamTestCases.testFourOnFourSimple(test, calculator);
};
