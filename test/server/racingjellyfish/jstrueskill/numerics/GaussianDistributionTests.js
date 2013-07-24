var GaussianDistribution =
	require('../../../../../src/racingjellyfish/jstrueskill/numerics/GaussianDistribution');
var testExt = require('../../../../libs/nodeunit-ext');

var ERROR_TOLERANCE = 0.000001;

exports.testBasicValues = function(test) {
	var gaussian = new GaussianDistribution(2, 5);

	test.equal(gaussian.getMean(), 2, "Expected mean == 1");
	test.equal(gaussian.getStandardDeviation(), 5, "Expected std == 5");
	test.equal(gaussian.getVariance(), 25, "Expected var == 25");
	test.equal(gaussian.getPrecision(), 0.04, "Expected precision == 0.04");
	test.equal(gaussian.getPrecisionMean(), 0.08, "Expected precision mean == 0.08");

	test.done();
};

exports.testCumulativeTo = function(test) {
	// Verified with WolframAlpha
	// (e.g. http://www.wolframalpha.com/input/?i=CDF%5BNormalDistribution%5B0%2C1%5D%2C+0.5%5D )
	var expected = 0.691462461;
	testExt.equalsWithTolerance(test, GaussianDistribution.cumulativeTo(0.5), expected,
		ERROR_TOLERANCE, "Expected gaussian 'cumulativeTo' value to be " + expected);

	test.done();
};

exports.testAt = function(test) {
	// Verified with WolframAlpha
	// (e.g. http://www.wolframalpha.com/input/?i=PDF%5BNormalDistribution%5B0%2C1%5D%2C+0.5%5D )
	var expected = 0.352065326;
	testExt.equalsWithTolerance(test, GaussianDistribution.at(0.5), expected,
		ERROR_TOLERANCE, "Expected gaussian 'at' value to be " + expected);

	test.done();
};

