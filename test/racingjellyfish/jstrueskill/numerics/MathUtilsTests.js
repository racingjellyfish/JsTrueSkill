var MathUtils = require('../../../../lib/racingjellyfish/jstrueskill/numerics/MathUtils');

exports.testSquare = function(test) {
	var expected = 1;
	test.equal(MathUtils.square(-1), expected, "Expected square(-1) == " + expected);
	expected = 1;
	test.equal(MathUtils.square(1), expected, "Expected square(1) == " + expected);
	expected = 4;
	test.equal(MathUtils.square(-2), expected, "Expected square(-2) == " + expected);
	expected = 4;
	test.equal(MathUtils.square(2), expected, "Expected square(2) == " + expected);
	expected = 0;
	test.equal(MathUtils.square(0), expected, "Expected square(0) == " + expected);

	test.done();
};

exports.testMean = function(test) {
	var collection = [];

	test.throws((function () { MathUtils.mean(collection); }), "Expected mean([]) to throw");

	collection.push(1);
	var expected = 1;
	test.equal(MathUtils.mean(collection), expected, "Expected mean([1]) == " + expected);

	collection.push(2);
	expected = 1.5;
	test.equal(MathUtils.mean(collection), expected, "Expected mean([1, 2]) == " + expected);

	collection.push(6);
	expected = 3;
	test.equal(MathUtils.mean(collection), expected, "Expected mean([1, 2, 6]) == " + expected);

	test.done();
};

exports.testArrayCopy = function(test) {
	var source = [1, 2, 3];
	var dest = [3, 4, 5];

	var expected = [1, 2, 3];
	var actual = MathUtils.arrayCopy(source, 0, dest, 0, source.length);
	test.deepEqual(actual, source, "Expected copied array to be " + expected);

	dest = [3, 4, 5, 6, 7];

	expected = [3, 4, 1, 2, 3];
	actual = MathUtils.arrayCopy(source, 0, dest, 2, source.length);
	test.deepEqual(actual, expected, "Expected copied array to be " + expected);

	test.done();
};
