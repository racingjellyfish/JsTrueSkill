var Variable = require('./Variable');

/**
 * A factory for creating Variables.
 *
 * Constructor for a prior initializer.
 */
var VariableFactory = function(variablePriorInitializer) {
	this.variablePriorInitializer = variablePriorInitializer;
};

VariableFactory.prototype.createBasicVariable = function(nameTemplate, templateArgs) {
	return new Variable(this.variablePriorInitializer.call(), nameTemplate, templateArgs);
};

module.exports = VariableFactory;
