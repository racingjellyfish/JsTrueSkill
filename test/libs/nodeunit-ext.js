exports.equalsWithTolerance = function(test, actual, expected, tolerance, message) {
	if (Math.abs(actual - expected) <= tolerance) {
		test.ok(true, message);
	} else {
		test.fail(actual, expected, message, 'not within tolerance of', this.equalsWithTolerance);
	}
};
