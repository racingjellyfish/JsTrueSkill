var GaussianPriorFactor = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/factors/GaussianPriorFactor');

exports.testConstructor = function(test) {
	var gaussianPriorFactor = new GaussianPriorFactor({}, {}, {});

	test.ok(gaussianPriorFactor !== undefined, "Expected valid object");

	test.done();
};
