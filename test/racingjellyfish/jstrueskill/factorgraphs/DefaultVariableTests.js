var DefaultVariable = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/DefaultVariable');

exports.testBasicValues = function(test) {
	var variable = new DefaultVariable();

	var expected = null;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Default]';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testSetValue = function(test) {
	var variable = new DefaultVariable();

	test.throws((function () { variable.setValue(1); }), "Expected setValue to throw");

	test.done();
};
