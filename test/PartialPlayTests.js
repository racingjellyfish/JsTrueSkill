var PartialPlay = require('../lib/PartialPlay');
var Player = require('../lib/Player');

exports.testNoConstructor = function(test) {
	test.ok(typeof PartialPlay !== 'function', 'No constructor expected');

	test.done();
};

exports.testPartialPlayNotSupported = function(test) {
	var player = {};

	var expected = 1;
	test.equal(PartialPlay.getPartialPlayPercentage(player), expected,
		"Expected partial play to be " + expected);

	test.done();
};

exports.testMinimumPartialPlay = function(test) {
	var player = new Player('One', 0, 0);

	var expected = 0.0001;
	test.equal(PartialPlay.getPartialPlayPercentage(player), expected,
		"Expected partial play to be " + expected);

	test.done();
};

exports.testPartialPlay = function(test) {
	var player = new Player('One', 0.5, 0);

	var expected = 0.5;
	test.equal(PartialPlay.getPartialPlayPercentage(player), expected,
		"Expected partial play to be " + expected);

	test.done();
};
