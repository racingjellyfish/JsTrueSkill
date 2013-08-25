/**
 * A representation of a message passed through a factor graph.
 */
var util = require('util');

/**
 * Constructor for a value and a name template, remaining arguments are used to
 * generate the message name from the template.
 */
var Message = function(msgValue, nameTemplate, templateArgs) {
	this.msgValue = msgValue || null;

	/** The name of the message */
	if (nameTemplate === undefined) {
		this.msgName = "Message[Default]";
	} else {
		if (templateArgs === undefined) {
			this.msgName = "Message[" + nameTemplate + "]";
		} else {
			this.msgName = "Message[" + util.format(nameTemplate, templateArgs) + "]";
		}
	}
};

Message.prototype.getValue = function() {
	return this.msgValue;
};

Message.prototype.setValue = function(msgValue) {
	this.msgValue = msgValue;
};

Message.prototype.toString = function() {
	return this.msgName;
};

module.exports = Message;
