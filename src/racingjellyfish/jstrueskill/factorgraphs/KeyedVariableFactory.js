var KeyedVariable = require('./KeyedVariable');
var VariableFactory = require('./VariableFactory');

/**
 * A factory for creating Variables.
 *
 * Constructor for a prior initializer.
 */
var KeyedVariableFactory = function(variablePriorInitializer) {
	VariableFactory.call(this, variablePriorInitializer);
};

KeyedVariableFactory.prototype = new VariableFactory();

VariableFactory.prototype.createKeyedVariable = function(key, nameTemplate, formatArgs) {
	return new KeyedVariable(key, this.variablePriorInitializer.call(), nameTemplate, formatArgs);
};

module.exports = KeyedVariableFactory;
