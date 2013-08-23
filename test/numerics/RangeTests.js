var Range = require('../../lib/numerics/Range');

exports.testRange = function(test) {
	var range = new Range(-1, 1);

	test.ok(range.isInRange(-1), "Expected -1 to be in range: " + range);
	test.ok(range.isInRange(0), "Expected 0 to be in range: " + range);
	test.ok(range.isInRange(1), "Expected -1 to be in range: " + range);
	test.equal(range.isInRange(-2), false, "Expected -2 to be out of range: " + range);
	test.equal(range.getMin(), -1, "Expected min == -1 in range: " + range);
	test.equal(range.getMax(), 1, "Expected max == 1 in range: " + range);

	test.done();
};

exports.testEquals = function(test) {
	var range0 = new Range(-1, 1);
	var range1 = new Range(-1, 1);
	var range2 = new Range(-1, 2);

	test.ok(range0.equals(range0), "Expected range: " + range0 + " to equal itself");
	test.ok(range0.equals(range1), "Expected range: " + range0 + " to equal range: " + range1);
	test.equal(range0.equals(range2), false, "Expected range: " + range0 + " to not equal range: " + range2);
	test.equal(range1.equals(range2), false, "Expected range: " + range1 + " to not equal range: " + range2);

	test.done();
};

exports.testInclusive = function(test) {
	var inclusive = Range.inclusive(-1, 1);

	test.ok(inclusive.isInRange(-1), "Expected -1 to be in range: " + inclusive);
	test.ok(inclusive.isInRange(0), "Expected 0 to be in range: " + inclusive);
	test.ok(inclusive.isInRange(1), "Expected -1 to be in range: " + inclusive);
	test.equal(inclusive.isInRange(-2), false, "Expected -2 to be out of range: " + inclusive);

	test.done();
};

exports.testExactly = function(test) {
	var exactly = Range.exactly(0);

	test.ok(exactly.isInRange(0), "Expected 0 to be in range: " + exactly);
	test.equal(exactly.isInRange(-1), false, "Expected -1 to be out of range: " + exactly);
	test.equal(exactly.isInRange(1), false, "Expected 1 to be out of range: " + exactly);

	test.done();
};

exports.testAtLeast = function(test) {
	var atLeast = new Range.atLeast(0);

	test.ok(atLeast.isInRange(0), "Expected 0 to be in range: " + atLeast);
	test.equal(atLeast.isInRange(1), true, "Expected 1 to be out of range: " + atLeast);
	test.equal(atLeast.isInRange(Infinity), true, "Expected 'Infinity' to be in range: " + atLeast);
	test.equal(atLeast.isInRange(-1), false, "Expected -1 to be out of range: " + atLeast);

	test.done();
};
