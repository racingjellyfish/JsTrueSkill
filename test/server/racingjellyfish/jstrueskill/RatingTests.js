var Rating = require('../../../../src/racingjellyfish/jstrueskill/Rating');

exports.testConstructor = function(test) {
	var rating = new Rating({}, {});

	test.ok(rating !== undefined, "Expected valid object");

	test.done();
};
