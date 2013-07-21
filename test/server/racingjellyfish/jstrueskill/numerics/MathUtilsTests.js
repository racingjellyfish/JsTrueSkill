var MathUtils = require('../../../../../src/racingjellyfish/jstrueskill/numerics/MathUtils');

exports.testSquare = function(test) {
	test.expect(5);

	test.equal(MathUtils.square(-1), 1, "Expected square(-1) == 1");
	test.equal(MathUtils.square(1), 1, "Expected square(1) == 1");
	test.equal(MathUtils.square(-2), 4, "Expected square(-2) == 4");
	test.equal(MathUtils.square(2), 4, "Expected square(2) == 4");
	test.equal(MathUtils.square(0), 0, "Expected square(0) == 0");

	test.done();
};

exports.testMean = function(test) {
	test.expect(4);

	var collection = [];

	test.throws((function () { MathUtils.mean(collection); }), "Expected mean([]) to throw");

	collection.push(1);
	test.equal(MathUtils.mean(collection), 1, "Expected mean([1]) == 1");

	collection.push(2);
	test.equal(MathUtils.mean(collection), 1.5, "Expected mean([1, 2]) == 1.5");

	collection.push(6);
	test.equal(MathUtils.mean(collection), 3, "Expected mean([1, 2, 6]) == 3");

	test.done();
};
