var GaussianFactor = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/factors/GaussianFactor');

exports.testConstructor = function(test) {
	var gaussianFactor = new GaussianFactor('GaussianFactorTest');

	test.ok(gaussianFactor !== undefined, "Expected valid object");

	test.done();
};
