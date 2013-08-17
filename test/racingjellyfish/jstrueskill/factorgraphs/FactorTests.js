var Factor = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Factor');
var Message = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Message');
var DefaultVariable =
	require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/DefaultVariable');
var Variable = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Variable');

exports.testBasicValues = function(test) {
	var factor = new Factor('Test');

	var expected = 'Factor[Test]';
	test.equal(factor.toString(), expected, "Expected name to be: " + expected);
	expected = 0;
	test.equal(factor.getNumberOfMessages(), expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getMessages().length, expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getVariables().length, expected,
		"Expected number of variables to be: " + expected);

	test.done();
};

exports.testFormattedName = function(test) {
	var factor = new Factor('%s', ['Test']);

	expected = 'Factor[Test]';
	test.equal(factor.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testCreateVariableToMessageBinding = function(test) {
	var factor = new Factor('Test');
	var message = new Message('Value');
	var variable = new DefaultVariable();
	factor.createVariableToMessageBinding(variable, message);

	var expected = 1;
	test.equal(factor.getNumberOfMessages(), expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getMessages().length, expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getVariables().length, expected,
		"Expected number of variables to be: " + expected);

	test.done();
};

exports.testResetMarginals = function(test) {
	var factor = new Factor('Test');
	var message = new Message('Value');
	var variable = new Variable(-1, 'Test');
	variable.setValue(1);
	factor.createVariableToMessageBinding(variable, message);

	var expected = 1;
	test.equal(factor.getNumberOfMessages(), expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getMessages().length, expected,
		"Expected number of messages to be: " + expected);
	test.equal(factor.getVariables().length, expected,
		"Expected number of variables to be: " + expected);
	test.equal(variable.getValue(), expected,
		"Expected variable value to be: " + expected);

	factor.resetMarginals();
	expected = -1;
	test.equal(variable.getValue(), expected,
		"Expected reset variable value to be: " + expected);

	test.done();
};

exports.testGetters = function(test) {
	var factor = new Factor('Test');
	var message = new Message('Value');
	var variable = new DefaultVariable();
	factor.createVariableToMessageBinding(variable, message);

	test.equal(factor.getMessages()[0], message,
		"Expected message to be: " + message);
	test.equal(factor.getVariables()[0], variable,
		"Expected variable to be: " + variable);

	test.done();
};

exports.testUpdateMessageThrowsIfTooManyArguments = function(test) {
	var factor = new Factor('%s', ['Test']);

	test.throws((function () { factor.updateMessage({}, {}); }),
		"Expected updateMessage call to throw with > 1 arguments");

	test.done();
};

exports.testSendMessageThrowsIfTooManyArguments = function(test) {
	var factor = new Factor('%s', ['Test']);

	test.throws((function () { factor.sendMessage({}, {}); }),
		"Expected sendMessage call to throw with > 1 arguments");

	test.done();
};
