var GaussianGreaterThanFactor = require('../../lib/factors/GaussianGreaterThanFactor');

exports.testConstructor = function(test) {
	var gaussianGreaterThanFactor = new GaussianGreaterThanFactor({}, {});

	test.ok(gaussianGreaterThanFactor !== undefined, "Expected valid object");

	test.done();
};
