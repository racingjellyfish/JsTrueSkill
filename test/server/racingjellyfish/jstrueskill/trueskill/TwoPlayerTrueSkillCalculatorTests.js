var TwoPlayerTrueSkillCalculator =
    require('../../../../../src/racingjellyfish/jstrueskill/trueskill/TwoPlayerTrueSkillCalculator');
var TrueSkillCalculatorTestCases = require('./TrueSkillCalculatorTestCases');

var calculator;

exports.setUp = function(callback) {
	calculator = new TwoPlayerTrueSkillCalculator();

	callback();
};

exports.testTwoPlayersDrawn = function(test) {
    TrueSkillCalculatorTestCases.testTwoPlayersDrawn(test, calculator);
};

exports.testTwoPlayersNotDrawn = function(test) {
    TrueSkillCalculatorTestCases.testTwoPlayersNotDrawn(test, calculator);
};

exports.testChessNotDrawn = function(test) {
    TrueSkillCalculatorTestCases.testChessNotDrawn(test, calculator);
};

exports.testOneOnOneMassiveUpsetDraw = function(test) {
    TrueSkillCalculatorTestCases.testOneOnOneMassiveUpsetDraw(test, calculator);
};
