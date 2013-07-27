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
	GaussianFactor.call(this, util.format('%s > %s', variable, epsilon));
	this.epsilon = epsilon;
	this.createVariableToMessageBinding(variable);
};

GaussianGreaterThanFactor.prototype = new GaussianFactor();

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

GaussianGreaterThanFactor.prototype.updateMessage = function(message, variable) {
		var oldMarginal = new GaussianDistribution(variable.getValue());
		var oldMessage = new GaussianDistribution(message.getValue());
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

		var newMessage = GaussianDistribution.divide(mult(oldMessage,newMarginal),oldMarginal);

		// Update the message and marginal
		message.setValue(newMessage);
		variable.setValue(newMarginal);

		// Return the difference in the new marginal
		return GaussianDistribution.sub(newMarginal, oldMarginal);
};

module.exports = GaussianGreaterThanFactor;
