/**
 * A representation of a factor.
 */
var util = require('util');
var Guard = require('../Guard');

/**
 * Constructor with a name template and replacement values.
 *
 * See http://nodejs.org/api/util.html#util_util_format_format.
 *
 * @param nameTemplate a string suitable for use with util.format()
 * @param templateArgs replacement values for the placeholders in the template
 * @constructor
 */
var Factor = function(nameTemplate, templateArgs) {
	/** The name of the factor */
	if (nameTemplate === undefined) {
		this.factorName = "Factor[Default]";
	} else {
		if (templateArgs === undefined) {
			this.factorName = "Factor[" + nameTemplate + "]";
		} else {
			this.factorName = "Factor[" + util.format(nameTemplate, templateArgs) + "]";
		}
	}

	this.messages = [];

	this.messageToVariableBinding = {};

	this.variables = [];
};

/**
 * Bind the specified variable to the specified message.
 *
 * @param variable variable to be bound
 * @param message message to be bound to
 * @returns {*}
 */
Factor.prototype.createVariableToMessageBinding = function(variable, message) {
	return this._createVariableToMessageBinding(variable, message);
};

/**
 * Actual variable-to-message binding implementation.
 *
 * @param variable variable to be bound
 * @param message message to be bound to
 * @returns {*}
 * @private
 */
Factor.prototype._createVariableToMessageBinding = function(variable, message) {
	this.messages.push(message);
	this.messageToVariableBinding[message] = variable;
	this.variables.push(variable);

	return message;
};

/**
 * Return the number of messages in this factor.
 *
 * @returns {Number}
 */
Factor.prototype.getNumberOfMessages = function() {
	return this.messages.length;
};

/**
 * Return the variables in this factor.
 *
 * @returns {Array}
 */
Factor.prototype.getVariables = function() {
	var returnVariables = new Array(this.variables.length);
	this.variables.forEach(function(element, index) {
		returnVariables[index] = element;
	});
	return returnVariables;
};

/**
 * Return the messages in this factor.
 *
 * @returns {Array}
 */
Factor.prototype.getMessages = function() {
	var returnMessages = new Array(this.messages.length);
	this.messages.forEach(function(element, index) {
		returnMessages[index] = element;
	});
	return returnMessages;
};

/**
 * Resets the marginal of the variables a factor is connected to.
 */
Factor.prototype.resetMarginals = function() {
	for (var index = 0; index < this.messages.length; index++) {
		var variable = this.messageToVariableBinding[this.messages[index]];
		variable.resetToPrior();
	}
};

/**
 * Update the message and marginal of the i-th variable that the
 * factor is connected to.
 */
Factor.prototype.updateMessage = function(messageIndex) {
	if (arguments.length > 1) {
		// TODO sub-classes need to implement this?
		throw new Error('UnsupportedOperationException');
	}

	Guard.argumentIsValidIndex(messageIndex, this.messages.length, "messageIndex");

	var message = this.messages[messageIndex];
	return this._updateMessage(message, this.messageToVariableBinding[message]);
};

/**
 * Sends the ith message to the marginal and returns the log-normalization
 * constant.
 */
Factor.prototype.sendMessage = function(messageIndex) {
	if (arguments.length > 1) {
		// TODO sub-classes need to implement this?
		throw new Error('UnsupportedOperationException');
	}

	Guard.argumentIsValidIndex(messageIndex, this.messages.length, "messageIndex");

	var message = this.messages[messageIndex];
	var variable = this.messageToVariableBinding[message];

	return this._sendMessage(message, variable);
};

Factor.prototype.toString = function() {
	return this.factorName;
};

module.exports = Factor;
