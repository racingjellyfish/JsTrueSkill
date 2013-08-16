var util = require('util');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var Factor = require('../../factorgraphs/Factor');
var Message = require('../../factorgraphs/Message');
var Variable = require('../../factorgraphs/Variable');

var GaussianFactor = function(factorName) {
	GaussianFactor.super_.call(this,  factorName);
};

util.inherits(GaussianFactor, Factor);

/**
 * Sends the factor-graph message and returns the log-normalization constant.
 **/
GaussianFactor.prototype._sendMessage = function(message, variable) {
	var marginal = variable.getValue();
	var messageValue = message.getValue();
	var logZ = GaussianDistribution.logProductNormalization(marginal, messageValue);
	variable.setValue(marginal.multiply(messageValue));
	return logZ;
};

GaussianFactor.prototype.createVariableToMessageBinding = function(variable) {
	var message = new Message(GaussianDistribution.fromPrecisionMean(0, 0),
		"message from %s to %s", [this, variable]);

	return this._createVariableToMessageBinding(variable, message);
};

module.exports = GaussianFactor;
