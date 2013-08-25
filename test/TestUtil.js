/*
 * Helper functions for calculator tests.
 */
var ERROR_TOLERANCE_LARGE = 0.085;
var ERROR_TOLERANCE_SMALL = 0.0005;

exports.assertRating = function(test, expectedMean, expectedStandardDeviation, actual) {
	_equalsWithTolerance(test, actual.getMean(), expectedMean,
		ERROR_TOLERANCE_LARGE, "Expected rating mean to be " + expectedMean);
	_equalsWithTolerance(test, actual.getStandardDeviation(),
		expectedStandardDeviation, ERROR_TOLERANCE_LARGE,
		"Expected rating standard deviation to be " + expectedStandardDeviation);
};

exports.assertMatchQuality = function(test, expectedMatchQuality, actualMatchQuality) {
	_equalsWithTolerance(test, actualMatchQuality, expectedMatchQuality,
		ERROR_TOLERANCE_SMALL, "Expected match quality to be " +
		expectedMatchQuality);
};

var _equalsWithTolerance = function(test, actual, expected, tolerance, message) {
	if (Math.abs(actual - expected) <= tolerance) {
		test.ok(true, message);
	} else {
		test.fail(actual, expected, message, 'not within tolerance of',
			this.equalsWithTolerance);
	}
};

exports.equalsWithTolerance = _equalsWithTolerance;
