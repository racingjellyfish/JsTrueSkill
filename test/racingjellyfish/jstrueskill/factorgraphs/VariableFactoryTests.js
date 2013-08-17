var VariableFactory =
	require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/VariableFactory');

exports.testCreateBasicVariable = function(test) {
	var priorInitializer = function() {
		return 5;
	};
	var factory = new VariableFactory(priorInitializer);

	var variable = factory.createBasicVariable('Test');

	var expected = 5;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]-->5';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testCreateWithNameTemplate = function(test) {
	var priorInitializer = function() {
		return 5;
	};
	var factory = new VariableFactory(priorInitializer);

	var variable = factory.createBasicVariable('%s', 'Test');

	var expected = 5;
	test.equal(variable.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Variable[Test]-->5';
	test.equal(variable.toString(), expected, "Expected name to be: " + expected);

	test.done();
};
