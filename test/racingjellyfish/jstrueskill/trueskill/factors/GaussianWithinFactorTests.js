var GaussianWithinFactor = require('../../../../../lib/racingjellyfish/jstrueskill/trueskill/factors/GaussianWithinFactor');

exports.testConstructor = function(test) {
	var gaussianWithinFactor = new GaussianWithinFactor({}, {});

	test.ok(gaussianWithinFactor !== undefined, "Expected valid object");

	test.done();
};
