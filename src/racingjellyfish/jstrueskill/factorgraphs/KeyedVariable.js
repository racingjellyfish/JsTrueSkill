var Variable = require('./Variable');

/**
 * Constructor with a key, prior and name.
 */
var KeyedVariable = function(key, prior, name) {
	Variable.call(this, prior, name);

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
