var Guard = require('../../../../src/racingjellyfish/jstrueskill/Guard');

exports.testNoConstructor = function(test) {
	test.ok(typeof Guard !== 'function', 'No constructor expected');

	test.done();
};
