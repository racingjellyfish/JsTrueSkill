var TwoPlayerTrueSkillCalculator =
    require('../../../../../src/racingjellyfish/jstrueskill/trueskill/TwoPlayerTrueSkillCalculator');
var TrueSkillCalculatorTestCases = require('./TrueSkillCalculatorTestCases');

var calculator;

exports.setUp = function(callback) {
	calculator = new TwoPlayerTrueSkillCalculator();

	callback();
};

exports.testTwoPlayerScenarios = function(test) {
    TrueSkillCalculatorTestCases.testTwoPlayersNotDrawn(test, calculator);
};
