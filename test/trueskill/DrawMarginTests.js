var DrawMargin = require('../../lib/trueskill/DrawMargin');
var TestUtil = require('../TestUtil');

var ERROR_TOLERANCE = 0.000001;

exports.testGetDrawMarginFromDrawProbability = function(test) {
	test.expect(3);

	var beta = 25.0 / 6.0;

	// The expected values were compared against Ralf Herbrich's implementation in F#
	assertDrawMargin(test, 0.10, beta, 0.74046637542690541);
	assertDrawMargin(test, 0.25, beta, 1.87760059883033);
	assertDrawMargin(test, 0.33, beta, 2.5111010132487492);

	test.done();
};

function assertDrawMargin(test, drawProbability, beta, expected) {
	var actual = DrawMargin.getDrawMarginFromDrawProbability(drawProbability, beta);

	TestUtil.equalsWithTolerance(test, actual, expected, ERROR_TOLERANCE,
		'Expected draw margin for probability: ' + drawProbability + ' to be ' + expected);
}
