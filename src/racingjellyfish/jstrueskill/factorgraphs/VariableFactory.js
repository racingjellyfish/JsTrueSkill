var Variable = require('./Variable');

/**
 * A factory for creating Variables.
 *
 * Constructor for a prior initializer.
 */
var VariableFactory = function(variablePriorInitializer) {
	this.variablePriorInitializer = variablePriorInitializer;
};

VariableFactory.prototype.createBasicVariable = function(nameTemplate, formatArgs) {
	return new Variable(this.variablePriorInitializer.call(), nameTemplate, formatArgs);
};

module.exports = VariableFactory;
