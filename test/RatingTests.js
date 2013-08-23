var Rating = require('../lib/Rating');

exports.testConstructor = function(test) {
	var rating = new Rating(0, 1);

	test.ok(rating !== undefined, "Expected valid object");

	test.done();
};

exports.testBasicValues = function(test) {
	var rating = new Rating(0, 2);

	var expected = 0;
	test.equal(rating.getMean(), expected, "Expected mean to be " + expected);

	expected = 2;
	test.equal(rating.getStandardDeviation(), expected,
		"Expected standard deviation to be " + expected);

	expected = 4;
	test.equal(rating.getVariance(), expected, "Expected variance to be " + expected);

	expected = -6;
	test.equal(rating.getConservativeRating(), expected,
		"Expected conservative rating to be " + expected);

	test.done();
};

exports.testToString = function(test) {
	var rating = new Rating(0, 2);

	var expected = 'Mean(μ)=0, Std-Dev(σ)=2';
	test.equal(rating.toString(), expected, "Expected toString to be " + expected);

	test.done();
};

exports.testDefaultStandardDeviationMultiplier = function(test) {
	var rating = new Rating(0, 1);

	var expected = 3;
	test.equal(rating.getConservativeStandardDeviationMultiplier(), expected,
		"Expected default standard deviation multiplier to be " + expected);

	test.done();
};

/*
exports.testPartialUpdate = function(test) {
	var rating = new Rating(0, 1);


	test.done();
};
*/
