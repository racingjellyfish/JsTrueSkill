var util = require('util');

/**
 * Constructor for a prior and a name template, remaining arguments are used to
 * generate the variable name from the template.
 */
var Variable = function(prior, nameTemplate, formatArgs) {
	/** The prior of this variable */
	this.prior = prior;

	/** The name of the variable */
	if (formatArgs === undefined) {
		this.varName = "Variable[" + nameTemplate + "]";
	} else {
		this.varName = "Variable[" + util.format(nameTemplate, formatArgs) + "]";
	}

	this.resetToPrior();
};

/**
 * Reset the value to the prior.
 */
Variable.prototype.resetToPrior = function() {
	this.varValue = this.prior;
};

/**
 * Return the variable value.
 */
Variable.prototype.getValue = function() {
	return this.varValue;
};

/**
 * Set the variable value.
 */
Variable.prototype.setValue = function(varValue) {
	this.varValue = varValue;
};

/**
 * Output the name of this variable.
 */
Variable.prototype.toString = function() {
	return this.varName;
};

module.exports = Variable;
