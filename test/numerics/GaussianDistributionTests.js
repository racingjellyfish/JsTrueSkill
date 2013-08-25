var Rating = require('../../lib/Rating');
var GaussianDistribution = require('../../lib/numerics/GaussianDistribution');
var MathUtils = require('../../lib/numerics/MathUtils');
var TestUtil = require('../TestUtil');

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

exports.testConstructors = function(test) {
	var gaussian = new GaussianDistribution(2, 5);
	var other = GaussianDistribution.fromGaussian(gaussian);

	test.equal(other.getMean(), 2, "Expected mean == 1");
	test.equal(other.getStandardDeviation(), 5, "Expected std == 5");
	test.equal(other.getVariance(), 25, "Expected var == 25");
	test.equal(other.getPrecision(), 0.04, "Expected precision == 0.04");
	test.equal(other.getPrecisionMean(), 0.08, "Expected precision mean == 0.08");

	var rating = new Rating(2.0, 5.0);
	other = GaussianDistribution.fromRating(rating);

	test.equal(other.getMean(), 2, "Expected mean == 1");
	test.equal(other.getStandardDeviation(), 5, "Expected std == 5");
	test.equal(other.getVariance(), 25, "Expected var == 25");
	test.equal(other.getPrecision(), 0.04, "Expected precision == 0.04");
	test.equal(other.getPrecisionMean(), 0.08, "Expected precision mean == 0.08");

	other = GaussianDistribution.fromPrecisionMean(0.08, 0.04);

	test.equal(other.getMean(), 2, "Expected mean == 1");
	test.equal(other.getStandardDeviation(), 5, "Expected std == 5");
	test.equal(other.getVariance(), 25, "Expected var == 25");
	test.equal(other.getPrecision(), 0.04, "Expected precision == 0.04");
	test.equal(other.getPrecisionMean(), 0.08, "Expected precision mean == 0.08");

	test.done();
};

exports.testCumulativeTo = function(test) {
	// Verified with WolframAlpha
	// (e.g. http://www.wolframalpha.com/input/?i=CDF%5BNormalDistribution%5B0%2C1%5D%2C+0.5%5D )
	var expected = 0.691462461;
	TestUtil.equalsWithTolerance(test, GaussianDistribution.cumulativeTo(0.5), expected,
		ERROR_TOLERANCE, "Expected gaussian 'cumulativeTo' value to be " + expected);

	test.done();
};

exports.testInverseCumulativeTo = function(test) {
	// Verified with WolframAlpha
//	// (e.g. http://www.wolframalpha.com/input/?i=InverseCDF%5BNormalDistribution%5B0%2C1%5D%2C+0.691462%5D )
	var expected = 0.5;
	TestUtil.equalsWithTolerance(test, GaussianDistribution.inverseCumulativeTo(0.691462461),
		expected, ERROR_TOLERANCE, "Expected gaussian 'inverseCumulativeTo' value to be " +
		expected);

	test.done();
};

exports.testAt = function(test) {
	// Verified with WolframAlpha
	// (e.g. http://www.wolframalpha.com/input/?i=PDF%5BNormalDistribution%5B0%2C1%5D%2C+0.5%5D )
	var expected = 0.352065326;
	TestUtil.equalsWithTolerance(test, GaussianDistribution.at(0.5), expected,
		ERROR_TOLERANCE, "Expected gaussian 'at' value to be " + expected);

	test.done();
};

exports.testAbsoluteDifference = function(test) {
	// Verified with Ralf Herbrich's F# implementation
	var standardNormal = new GaussianDistribution(0, 1);
	var absDiff = GaussianDistribution.absoluteDifference(standardNormal, standardNormal);
	var expected = 0.0;
	TestUtil.equalsWithTolerance(test, absDiff, expected,
		ERROR_TOLERANCE, "Expected standard normal absolute difference to be " + expected);

	var m1s2 = new GaussianDistribution(1, 2);
	var m3s4 = new GaussianDistribution(3, 4);
	absDiff = GaussianDistribution.absoluteDifference(m1s2, m3s4);
	expected = 0.4330127018922193;
	TestUtil.equalsWithTolerance(test, absDiff, expected,
		ERROR_TOLERANCE, "Expected absolute difference to be " + expected);

	test.done();
};

exports.testMultiplication = function(test) {
	// I verified this against the formula at
	// http://www.tina-vision.net/tina-knoppix/tina-memo/2003-003.pdf
	var standardNormal = new GaussianDistribution(0, 1);
	var shiftedGaussian = new GaussianDistribution(2, 3);

	var product0 = GaussianDistribution.multiply(standardNormal, shiftedGaussian);
	var product1 = standardNormal.multiply(shiftedGaussian);

	var expected = 0.2;
	TestUtil.equalsWithTolerance(test, product0.getMean(), expected,
		ERROR_TOLERANCE, "Expected product gaussian mean to be " + expected);
	TestUtil.equalsWithTolerance(test, product0.getMean(),
		product1.getMean(), ERROR_TOLERANCE,
		"Expected product gaussian means to be " + expected);

	expected = 3.0 / Math.sqrt(10);
	TestUtil.equalsWithTolerance(test, product0.getStandardDeviation(), expected,
		ERROR_TOLERANCE, "Expected product gaussian standardDeviation to be " + expected);
	TestUtil.equalsWithTolerance(test, product0.getStandardDeviation(),
		product1.getStandardDeviation(), ERROR_TOLERANCE,
		"Expected product gaussian standardDeviations to be " + expected);

	var m4s5 = new GaussianDistribution(4, 5);
	var m6s7 = new GaussianDistribution(6, 7);

	product0 = GaussianDistribution.multiply(m4s5, m6s7);
	product1 = GaussianDistribution.multiply(m4s5, m6s7);

	expected = (4 * MathUtils.square(7) + 6 * MathUtils.square(5)) /
		(MathUtils.square(5) + MathUtils.square(7));
	TestUtil.equalsWithTolerance(test, product0.getMean(), expected,
		ERROR_TOLERANCE, "Expected product gaussian mean to be " + expected);
	TestUtil.equalsWithTolerance(test, product0.getMean(),
		product1.getMean(), ERROR_TOLERANCE,
		"Expected product gaussian mean to be " + expected);

	expected = Math.sqrt(((MathUtils.square(5) * MathUtils.square(7)) /
		(MathUtils.square(5) + MathUtils.square(7))));
	TestUtil.equalsWithTolerance(test, product0.getStandardDeviation(), expected,
		ERROR_TOLERANCE, "Expected product gaussian standardDeviation to be " + expected);
	TestUtil.equalsWithTolerance(test, product0.getStandardDeviation(),
		product1.getStandardDeviation(), ERROR_TOLERANCE,
		"Expected product gaussian standardDeviationsto be " + expected);

	test.done();
};

exports.testDivision = function(test) {
	// Since the multiplication was worked out by hand, we use the same
	// numbers but work backwards
	var product = new GaussianDistribution(0.2, 3.0 / Math.sqrt(10));
	var standardNormal = new GaussianDistribution(0, 1);

	var productDividedByStandardNormal = GaussianDistribution.divide(product, standardNormal);
	var expected = 2.0;
	TestUtil.equalsWithTolerance(test, productDividedByStandardNormal.getMean(),
		expected, ERROR_TOLERANCE,
		"Expected division result gaussian mean to be " + expected);
	expected = 3.0;
	TestUtil.equalsWithTolerance(test, productDividedByStandardNormal.getStandardDeviation(),
		expected, ERROR_TOLERANCE,
		"Expected division result gaussian standardDeviation to be " + expected);

	product = new GaussianDistribution((4 * MathUtils.square(7) +
		6 * MathUtils.square(5)) / (MathUtils.square(5) +
		MathUtils.square(7)), Math.sqrt(((MathUtils.square(5) *
			MathUtils.square(7)) / (MathUtils.square(5) + MathUtils.square(7)))));
	var m4s5 = new GaussianDistribution(4, 5);
	var productDividedByM4S5 = GaussianDistribution.divide(product, m4s5);
	expected = 6.0;
	TestUtil.equalsWithTolerance(test, productDividedByM4S5.getMean(),
		expected, ERROR_TOLERANCE,
		"Expected division result gaussian mean to be " + expected);
	expected = 7.0;
	TestUtil.equalsWithTolerance(test, productDividedByM4S5.getStandardDeviation(),
		expected, ERROR_TOLERANCE,
		"Expected division result gaussian standardDeviation to be " + expected);

	test.done();
};

exports.testLogProductNormalization = function(test) {
	var standardNormal = new GaussianDistribution(0, 1);

	var lpn = GaussianDistribution.logProductNormalization(standardNormal, standardNormal);
	// Verified with Ralf Herbrich's F# implementation
	var expected = -1.2655121234846454;
	TestUtil.equalsWithTolerance(test, lpn, expected, ERROR_TOLERANCE,
		"Expected logProductNormal of 2 normalized gaussians to be " + expected);

	var m1s2 = new GaussianDistribution(1, 2);
	var m3s4 = new GaussianDistribution(3, 4);

	lpn = GaussianDistribution.logProductNormalization(m1s2, m3s4);
	expected = -2.5168046699816684;
	TestUtil.equalsWithTolerance(test, lpn, expected, ERROR_TOLERANCE,
		"Expected logProductNormal of specified gaussians to be " + expected);

	test.done();
};

exports.testLogRatioNormalization = function(test) {
	var m1s2 = new GaussianDistribution(1, 2);
	var m3s4 = new GaussianDistribution(3, 4);

	var lrn = GaussianDistribution.logRatioNormalization(m1s2, m3s4);
	// Verified with Ralf Herbrich's F# implementation
	var expected = 2.6157405972171204;
	TestUtil.equalsWithTolerance(test, lrn, expected, ERROR_TOLERANCE,
		"Expected logRatioNormal of specified gaussians to be " + expected);

	test.done();
};
