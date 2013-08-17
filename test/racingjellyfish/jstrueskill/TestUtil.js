/*
 * Helper functions for calculator tests.
 */
var testExt = require('../../libs/nodeUnit-ext');

var ERROR_TOLERANCE_LARGE = 0.085;
var ERROR_TOLERANCE_SMALL = 0.0005;

exports.assertRating = function(test, expectedMean, expectedStandardDeviation, actual) {
	testExt.equalsWithTolerance(test, actual.getMean(), expectedMean,
		ERROR_TOLERANCE_LARGE, "Expected rating mean to be " + expectedMean);
	testExt.equalsWithTolerance(test, actual.getStandardDeviation(),
		expectedStandardDeviation, ERROR_TOLERANCE_LARGE,
		"Expected rating standard deviation to be " + expectedStandardDeviation);
};

exports.assertMatchQuality = function(test, expectedMatchQuality, actualMatchQuality) {
	testExt.equalsWithTolerance(test, actualMatchQuality, expectedMatchQuality,
		ERROR_TOLERANCE_SMALL, "Expected match quality to be " +
		expectedMatchQuality);
};
