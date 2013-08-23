var GaussianWeightedSumFactor = require('../../lib/factors/GaussianWeightedSumFactor');

exports.testConstructor = function(test) {
	var gaussianWeightedSumFactor = new GaussianWeightedSumFactor({}, [], []);

	test.ok(gaussianWeightedSumFactor !== undefined, "Expected valid object");

	test.done();
};
