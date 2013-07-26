var Variable = require('./Variable');

/**
 * Constructor with a key, prior and name template.
 */
var KeyedVariable = function(key, prior, nameTemplate, templateArgs) {
	Variable.call(this, prior, nameTemplate, templateArgs);

	this.key = key;
};

KeyedVariable.prototype = new Variable();

/**
 * Return the key for this variable.
 */
KeyedVariable.prototype.getKey = function() {
	return this.key;
};

module.exports = KeyedVariable;
