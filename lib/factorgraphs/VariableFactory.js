/**
 * A factory for creating Variables.
 */
var Variable = require('./Variable');

/**
 * Constructor for a prior initializer.
 */
var VariableFactory = function(variablePriorInitializer) {
	this.variablePriorInitializer = variablePriorInitializer;
};

VariableFactory.prototype.createBasicVariable = function(nameTemplate, templateArgs) {
	return new Variable(this.variablePriorInitializer.call(), nameTemplate, templateArgs);
};

module.exports = VariableFactory;
