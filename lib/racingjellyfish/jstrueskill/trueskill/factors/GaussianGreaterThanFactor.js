var util = require('util');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../../factorgraphs/Message');
var Variable = require('../../factorgraphs/Variable');
var TGCF = require('../TruncatedGaussianCorrectionFunctions');

/**
 * Factor representing a team difference that has exceeded the draw margin.
 *
 * N.B. See the accompanying math paper for more details.
 * TODO add link...
 */
var GaussianGreaterThanFactor = function(epsilon, variable) {
	GaussianGreaterThanFactor.super_.call(this,
		util.format('%s > %s', variable, epsilon));

	this.epsilon = epsilon;
	this.createVariableToMessageBinding(variable);
};

util.inherits(GaussianGreaterThanFactor, GaussianFactor);

GaussianGreaterThanFactor.prototype.getLogNormalization = function() {
	var marginal = this.getVariables()[0].getValue();
	var message = this.getMessages()[0].getValue();
	var messageFromVariable = GaussianDistribution.divide(marginal, message);

	var logProductNormalization =
		GaussianDistribution.logProductNormalization(messageFromVariable, message);
	var varMeanMinusEpsilon = messageFromVariable.getMean() - this.epsilon;
	var cumulativeTo = GaussianDistribution.cumulativeTo((varMeanMinusEpsilon) /
		messageFromVariable.getStandardDeviation());

	return -logProductNormalization + Math.log(cumulativeTo);
};

GaussianGreaterThanFactor.prototype._updateMessage = function(message, variable) {
		var oldMarginal = GaussianDistribution.fromGaussian(variable.getValue());
		var oldMessage = GaussianDistribution.fromGaussian(message.getValue());
		var messageFromVar = GaussianDistribution.divide(oldMarginal, oldMessage);

		var c = messageFromVar.getPrecision();
		var d = messageFromVar.getPrecisionMean();

		var sqrtC = Math.sqrt(c);

		var dOnSqrtC = d / sqrtC;

		var epsilsonTimesSqrtC = this.epsilon * sqrtC;
		d = messageFromVar.getPrecisionMean();

		var denom = 1.0 - TGCF.wExceedsMargin(dOnSqrtC, epsilsonTimesSqrtC);

		var newPrecision = c / denom;
		var newPrecisionMean =(d + sqrtC *
			TGCF.vExceedsMargin(dOnSqrtC, epsilsonTimesSqrtC)) / denom;

		var newMarginal = GaussianDistribution.fromPrecisionMean(newPrecisionMean, newPrecision);

		var newMessage = GaussianDistribution.divide(
			GaussianDistribution.multiply(oldMessage, newMarginal), oldMarginal);

		// Update the message and marginal
		message.setValue(newMessage);
		variable.setValue(newMarginal);

		// Return the difference in the new marginal
		return GaussianDistribution.absoluteDifference(newMarginal, oldMarginal);
};

module.exports = GaussianGreaterThanFactor;
