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
