var PartialPlay = require('../../../../src/racingjellyfish/jstrueskill/PartialPlay');

exports.testNoConstructor = function(test) {
	test.ok(typeof PartialPlay !== 'function', 'No constructor expected');

	test.done();
};
