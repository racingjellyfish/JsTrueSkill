var PairwiseComparison = require('../../../lib/racingjellyfish/jstrueskill/PairwiseComparison');

exports.testConstructor = function(test) {
	var pairwiseComparison = new PairwiseComparison(1);
	var expected = PairwiseComparison.WIN;
	test.deepEqual(pairwiseComparison, expected,
		'Expected pairwiseComparison to be: ' + expected);

	pairwiseComparison = new PairwiseComparison(0);
	expected = PairwiseComparison.DRAW;
	test.deepEqual(pairwiseComparison, expected,
		'Expected pairwiseComparison to be: ' + expected);

	pairwiseComparison = new PairwiseComparison(-1);
	expected = PairwiseComparison.LOSE;
	test.deepEqual(pairwiseComparison, expected,
		'Expected pairwiseComparison to be: ' + expected);

	test.done();
};

exports.testMultipliers = function(test) {
	var expected = 1;
	test.equal(PairwiseComparison.WIN.getMultiplier(), expected,
		'Expected WIN multiplier to be ' + expected);

	expected = 0;
	test.equal(PairwiseComparison.DRAW.getMultiplier(), expected,
		'Expected DRAW multiplier to be ' + expected);

	expected = -1;
	test.equal(PairwiseComparison.LOSE.getMultiplier(), expected,
		'Expected LOSE multiplier to be ' + expected);

	test.done();
};

exports.testFromMultiplier = function(test) {
	var expected = PairwiseComparison.WIN;
	test.equal(PairwiseComparison.fromMultiplier(1), expected,
		'Expected multiplier of 1 to retrieve ' + expected);

	expected = PairwiseComparison.DRAW;
	test.equal(PairwiseComparison.fromMultiplier(0), expected,
		'Expected multiplier of 0 to retrieve ' + expected);

	expected = PairwiseComparison.LOSE;
	test.equal(PairwiseComparison.fromMultiplier(-1), expected,
		'Expected multiplier of -1 to retrieve ' + expected);

	test.done();
};

exports.testInvalidMultiplier = function(test) {
	test.throws(( function() {PairwiseComparison.fromMultiplier(2);} ),
		'Expected fromMultiplier(2) to throw');

	test.throws(( function() {PairwiseComparison.fromMultiplier(-2);} ),
		'Expected fromMultiplier(-2) to throw');

	test.done();
};
