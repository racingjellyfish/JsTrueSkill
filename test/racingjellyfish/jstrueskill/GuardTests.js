var Guard = require('../../../lib/racingjellyfish/jstrueskill/Guard');

exports.testNoConstructor = function(test) {
	test.ok(typeof Guard !== 'function', 'No constructor expected');

	test.done();
};

exports.testArgumentNotNull = function(test) {
	test.throws(( function() {Guard.argumentNotNull(null, 'Argument = null');} ),
		"Expected argumentNotNull(null) to throw");

	test.throws(( function() {Guard.argumentNotNull(undefined, 'Argument = undefined');} ),
		"Expected argumentNotNull(undefined) to throw");

	test.ok(( function() {Guard.argumentNotNull(1, 'Argument = 1');} ),
		"Expected argumentNotNull(1) not to throw");

	test.done();
};

exports.testArgumentIsValidIndex = function(test) {
	test.throws(
		( function() {Guard.argumentIsValidIndex(-1, 5, 'Argument = -1');} ),
		"Expected argumentIsValidIndex(-1, 5) to throw");

	test.throws(
		( function() {Guard.argumentIsValidIndex(6, 5, 'Argument = 6');} ),
		"Expected argumentIsValidIndex(6, 5) to throw");

	test.ok(
		( function() {Guard.argumentIsValidIndex(0, 5, 'Argument = 0');} ),
		"Expected argumentIsValidIndex(0, 5) not to throw");

	test.ok(
		( function() {Guard.argumentIsValidIndex(5, 5, 'Argument = 5');} ),
		"Expected argumentIsValidIndex(5, 5) not to throw");

	test.done();
};

exports.testArgumentInRangeInclusive = function(test) {
	test.throws(
		( function() {Guard.argumentInRangeInclusive(-1, 0, 5, 'Argument = -1');} ),
		"Expected argumentInRangeInclusive(-1, 5) to throw");

	test.throws(
		( function() {Guard.argumentInRangeInclusive(6, 0, 5, 'Argument = 6');} ),
		"Expected argumentInRangeInclusive(6, 5) to throw");

	test.ok(
		( function() {Guard.argumentInRangeInclusive(0, 0, 5, 'Argument = 0');} ),
		"Expected argumentInRangeInclusive(0, 5) not to throw");

	test.ok(
		( function() {Guard.argumentInRangeInclusive(5, 0, 5, 'Argument = 5');} ),
		"Expected argumentInRangeInclusive(5, 5) not to throw");

	test.done();
};
