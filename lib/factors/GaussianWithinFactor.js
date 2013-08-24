/**
 * Factor representing a team difference that has not exceeded the draw margin.
 *
 * N.B. See the accompanying math paper for more details:
 *
 *         http://www.moserware.com/2010/03/computing-your-skill.html
 */
var util = require('util');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../factorgraphs/Message');
var Variable = require('../factorgraphs/Variable');
var MathUtils = require('../numerics/MathUtils');
var GaussianDistribution = require('../numerics/GaussianDistribution');
var TGCF = require('../trueskill/TruncatedGaussianCorrectionFunctions');

var GaussianWithinFactor = function(epsilon, variable) {
	GaussianWithinFactor.super_.call(this,
		util.format('%s <= %4.3f', variable, epsilon));

	this.epsilon = epsilon;
	this.createVariableToMessageBinding(variable);
};

util.inherits(GaussianWithinFactor, GaussianFactor);

GaussianWithinFactor.prototype.getLogNormalization = function() {
	var marginal = variables[0].getValue();
	var message = messages[0].getValue();
	var messageFromVariable = divide(marginal, message);
	var mean = messageFromVariable.getMean();
	var std = messageFromVariable.getStandardDeviation();
	var z = GaussianDistribution.cumulativeTo((this.epsilon - mean) / std) -
		GaussianDistribution.cumulativeTo((-this.epsilon - mean) / std);

	return -GaussianDistribution.logProductNormalization(messageFromVariable, message) +
		Math.log(z);
};

GaussianWithinFactor.prototype._updateMessage = function(message, variable) {
	var oldMarginal = GaussianDistribution.fromGaussian(variable.getValue());
	var oldMessage = GaussianDistribution.fromGaussian(message.getValue());
	var messageFromVariable = GaussianDistribution.divide(oldMarginal,oldMessage);

	var c = messageFromVariable.getPrecision();
	var d = messageFromVariable.getPrecisionMean();

	var sqrtC = Math.sqrt(c);
	var dOnSqrtC = d / sqrtC;

	var epsilonTimesSqrtC = this.epsilon * sqrtC;
	d = messageFromVariable.getPrecisionMean();

	var denominator = 1.0 - TGCF.wWithinMargin(dOnSqrtC, epsilonTimesSqrtC);
	var newPrecision = c / denominator;
	var newPrecisionMean = (d + sqrtC * TGCF.vWithinMargin(dOnSqrtC, epsilonTimesSqrtC)) /
		denominator;

	var newMarginal = GaussianDistribution.fromPrecisionMean(newPrecisionMean, newPrecision);
	var newMessage = GaussianDistribution.divide(
		GaussianDistribution.multiply(oldMessage,newMarginal), oldMarginal);

	// Update the message and marginal
	message.setValue(newMessage);
	variable.setValue(newMarginal);

	// Return the difference in the new marginal
	return GaussianDistribution.absoluteDifference(newMarginal, oldMarginal);
};

module.exports = GaussianWithinFactor;
