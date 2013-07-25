var Variable = require('./Variable');

/**
 * Constructor with no prior.
 */
var DefaultVariable = function() {
	Variable.call(this, null, "Default");
};

DefaultVariable.prototype = new Variable();

/**
 * Override to prevent the value from being set.
 */
DefaultVariable.prototype.setValue = function() {
	throw new Error("Cannot set the value of a default variable");
};

module.exports = DefaultVariable;
