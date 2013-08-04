var util = require('util');
var Guard = require('../../Guard');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../../factorgraphs/Message');
var Variable = require('../../factorgraphs/Variable');

/**
 * Supplies the factor graph with prior information.
 * <remarks>See the accompanying math paper for more details.</remarks>
 */
var GaussianPriorFactor = function(mean, variance, variable) {
	GaussianPriorFactor.super_.call(this,
		util.format('Prior value going to %s', [variable]));

	this.newMessage = new GaussianDistribution(mean, Math.sqrt(variance));
	this.createVariableToMessageBinding(variable,
		new Message(GaussianDistribution.fromPrecisionMean(0, 0), "message from %s to %s",
		[this, variable]));
};

util.inherits(GaussianPriorFactor, GaussianFactor);

GaussianPriorFactor.prototype._updateMessage = function(message, variable) {
	var oldMarginal = GaussianDistribution.fromGaussian(variable.getValue());
	var oldMessage = message;
	var newMarginal = GaussianDistribution.fromPrecisionMean(
			oldMarginal.getPrecisionMean() + this.newMessage.getPrecisionMean() -
			oldMessage.getValue().getPrecisionMean(), oldMarginal.getPrecision() +
			this.newMessage.getPrecision() - oldMessage.getValue().getPrecision());
	variable.setValue(newMarginal);
	message.setValue(this.newMessage);

	return GaussianDistribution.absoluteDifference(oldMarginal, newMarginal);
};

GaussianPriorFactor.prototype.getLogNormalization = function() {
	return 0;
};

module.exports = GaussianPriorFactor;
