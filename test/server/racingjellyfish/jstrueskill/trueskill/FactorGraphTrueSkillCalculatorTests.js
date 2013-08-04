/**
 * This calculator supports multiple teams with many players on each team
 * so we need to reuse the 2 player test cases and add some extra cases to
 * cover the scenarios with more than 1 player on each team.
 *
 * Some extra cases are also added to test the partial play and update
 * capabilities of the calculator.
 */
var FactorGraphTrueSkillCalculator =
    require('../../../../../src/racingjellyfish/jstrueskill/trueskill/FactorGraphTrueSkillCalculator');
var TwoPlayerTestCases = require('./TwoPlayerTestCases');

var calculator;

exports.setUp = function(callback) {
    calculator = new FactorGraphTrueSkillCalculator();

    callback();
};

/*
 * All 2 player scenarios, i.e. 2 teams with 1 player on each team.
 */
exports.testDrawn = function(test) {
    TwoPlayerTestCases.testDrawn(test, calculator);
};
