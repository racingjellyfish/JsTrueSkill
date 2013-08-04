var util = require('util');
var Variable = require('./Variable');

/**
 * Constructor with no prior.
 */
var DefaultVariable = function() {
	DefaultVariable.super_.call(this,  null, "Default");
};

util.inherits(DefaultVariable, Variable);

/**
 * Override to prevent the value from being set.
 */
DefaultVariable.prototype.setValue = function() {
	throw new Error("Cannot set the value of a default variable");
};

module.exports = DefaultVariable;
