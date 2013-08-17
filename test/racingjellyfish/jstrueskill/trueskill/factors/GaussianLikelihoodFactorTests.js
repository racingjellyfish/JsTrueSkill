var GaussianLikelihoodFactor = require('../../../../../lib/racingjellyfish/jstrueskill/trueskill/factors/GaussianLikelihoodFactor');

exports.testConstructor = function(test) {
	var gaussianLikelihoodFactor = new GaussianLikelihoodFactor({}, {}, {});

	test.ok(gaussianLikelihoodFactor !== undefined, "Expected valid object");

	test.done();
};
