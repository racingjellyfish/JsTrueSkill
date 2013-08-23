var KeyedVariableFactory = require('../../lib/factorgraphs/KeyedVariableFactory');

exports.testCreateKeyedVariable = function(test) {
	var priorInitializer = function() {
		return 5;
	};
	var factory = new KeyedVariableFactory(priorInitializer);

	var variable = factory.createKeyedVariable('key', 'Test');

	var expected = 'key';
	test.equal(variable.getKey(), expected, "Expected key to be: " + expected);
	expected = 5;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]-->5';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testCreateWithNameTemplate = function(test) {
	var priorInitializer = function() {
		return 5;
	};
	var factory = new KeyedVariableFactory(priorInitializer);

	var variable = factory.createKeyedVariable('key', '%s', 'Test');

	var expected = 'key';
	test.equal(variable.getKey(), expected, "Expected key to be: " + expected);
	expected = 5;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]-->5';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};
