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
var GameInfo = require('../../../../../src/racingjellyfish/jstrueskill/GameInfo');
var Player = require('../../../../../src/racingjellyfish/jstrueskill/Player');
var Rating = require('../../../../../src/racingjellyfish/jstrueskill/Rating');
var Team = require('../../../../../src/racingjellyfish/jstrueskill/Team');
var TestUtil = require('../TestUtil');

/*
 * All multiple team scenarios.
 */
exports.testThreeTeamsOfOneNotDrawn = function(test) {
	test.done();
};

exports.testThreeTeamsOfOneDrawn = function(test) {
	test.done();
};

exports.testFourTeamsOfOneNotDrawn = function(test) {
	test.done();
};

exports.testFiveTeamsOfOneNotDrawn = function(test) {
	test.done();
};

exports.testEightTeamsOfOneDrawn = function(test) {
	test.done();
};

exports.testEightTeamsOfOneUpset = function(test) {
	test.done();
};

exports.testSixteenTeamsOfOneNotDrawn = function(test) {
	test.done();
};

exports.testTwoOnFourOnTwoWinDraw = function(test) {
	test.done();
};

/*
 * Partial play scenario.
 */
exports.testOneOnTwoBalancedPartialPlay = function(test) {
	test.done();
};
