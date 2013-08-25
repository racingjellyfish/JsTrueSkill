var TwoPlayerTrueSkillCalculator = require('../../lib/trueskill/TwoPlayerTrueSkillCalculator');
var TwoPlayerTestCases = require('./TwoPlayerTestCases');

var calculator;

exports.setUp = function(callback) {
	calculator = new TwoPlayerTrueSkillCalculator();

	callback();
};

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
