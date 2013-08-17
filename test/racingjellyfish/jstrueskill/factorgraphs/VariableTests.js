var Variable = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Variable');

exports.testBasicValues = function(test) {
	var variable = new Variable(-1, 'Test');

	var expected = -1;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]-->-1';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testSetValue = function(test) {
	var variable = new Variable(-1, 'Test');

	var expected = 1;
	variable.setValue(1);
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);

	test.done();
};

exports.testFormattedName = function(test) {
	var variable = new Variable(-1, '%s', ['Test']);

	var expected = 'Variable[Test]-->-1';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};
