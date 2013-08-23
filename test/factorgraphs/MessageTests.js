var Message = require('../../lib/factorgraphs/Message');

exports.testDefaultValues = function(test) {
	var message = new Message();

	var expected = null;
	test.equal(message.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Message[Default]';
	test.equal(message.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testBasicValues = function(test) {
	var message = new Message(-1, 'Test');

	var expected = -1;
	test.equal(message.getValue(), expected, "Expected value to be: " + expected);
	expected = 'Message[Test]';
	test.equal(message.toString(), expected, "Expected name to be: " + expected);

	test.done();
};

exports.testSetValue = function(test) {
	var message = new Message(-1, 'Test');

	var expected = 1;
	message.setValue(1);
	test.equal(message.getValue(), expected, "Expected value to be: " + expected);

	test.done();
};

exports.testFormattedName = function(test) {
	var message = new Message(-1, '%s', ['Test']);

	expected = 'Message[Test]';
	test.equal(message.toString(), expected, "Expected name to be: " + expected);

	test.done();
};
