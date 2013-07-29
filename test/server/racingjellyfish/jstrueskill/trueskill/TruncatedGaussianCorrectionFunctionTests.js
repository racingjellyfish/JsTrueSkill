var TGCF = require('../../../../../src/racingjellyfish/jstrueskill/trueskill/TruncatedGaussianCorrectionFunctions');

exports.testNoConstructor = function(test) {
	test.ok(typeof TGCF !== 'function', 'No constructor expected');

	test.done();
};
