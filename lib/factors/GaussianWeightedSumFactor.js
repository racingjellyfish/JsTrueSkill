/**
 * Factor that sums together multiple Gaussians.
 *
 * N.B. See the accompanying math paper for more details:
 *
 *         http://www.moserware.com/2010/03/computing-your-skill.html
 */
var util = require('util');
var Guard = require('../Guard');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../factorgraphs/Message');
var Variable = require('../factorgraphs/Variable');
var GaussianDistribution = require('../numerics/GaussianDistribution');
var MathUtils = require('../numerics/MathUtils');

var GaussianWeightedSumFactor = function(sumVariable, variablesToSum, variableWeights) {
	GaussianWeightedSumFactor.super_.call(this,
		this.createName(sumVariable, variablesToSum, variableWeights));

	this.variableIndexOrdersForWeights = [];

	// If not specified, set the weights to 1.0
	if (variableWeights === undefined) {
		variableWeights = new Array(variablesToSum.length);
		for (var index = 0; index < variableWeights.length; index++) {
			variableWeights[index] = 1;
		}
	}

	// This following is used for convenience, for example, the first entry is [0, 1, 2]
	// corresponding to v[0] = a1*v[1] + a2*v[2]
	this.weights = new Array(variableWeights.length + 1);
	this.weightsSquared = new Array(this.weights.length);

	// The first weights are a straightforward copy
	// v_0 = a_1*v_1 + a_2*v_2 + ... + a_n * v_n
	this.weights[0] = new Array(variableWeights.length);
	MathUtils.arrayCopy(variableWeights, 0,  this.weights[0], 0, variableWeights.length);
	this.weightsSquared[0] = new Array(variableWeights.length);
	for (var i = 0; i < this.weights[0].length; i++) {
		this.weightsSquared[0][i] = MathUtils.square(this.weights[0][i]);
	}

	// 0..n-1
	var temp = new Array(1 + variablesToSum.length);
	for (i = 0; i < temp.length; i++) {
		temp[i] = i;
	}
	this.variableIndexOrdersForWeights.push(temp);

	// The rest move the variables around and divide out the constant.
	// For example:
	// v_1 = (-a_2 / a_1) * v_2 + (-a3/a1) * v_3 + ... + (1.0 / a_1) * v_0
	// By convention, we'll put the v_0 term at the end
	for (var weightsIndex = 1; weightsIndex < this.weights.length; weightsIndex++) {
		var currentWeights = new Array(variableWeights.length);
		this.weights[weightsIndex] = currentWeights;

		var variableIndices = new Array(variableWeights.length + 1);
		variableIndices[0] = weightsIndex;

		var currentWeightsSquared = new Array(variableWeights.length);
		this.weightsSquared[weightsIndex] = currentWeightsSquared;

		// keep a single variable to keep track of where we are in the array.
		// This is helpful since we skip over one of the spots
		var currentDestinationWeightIndex = 0;

		for (var currentWeightSourceIndex = 0;
			currentWeightSourceIndex < variableWeights.length;
			currentWeightSourceIndex++) {
			if (currentWeightSourceIndex == (weightsIndex - 1)) {
				continue;
			}

			var currentWeight = (-variableWeights[currentWeightSourceIndex]/variableWeights[weightsIndex - 1]);

			if (variableWeights[weightsIndex - 1] === 0) {
				// HACK: Getting around division by zero
				currentWeight = 0;
			}

			currentWeights[currentDestinationWeightIndex] = currentWeight;
			currentWeightsSquared[currentDestinationWeightIndex] = currentWeight*currentWeight;

			variableIndices[currentDestinationWeightIndex + 1] = currentWeightSourceIndex + 1;
			currentDestinationWeightIndex++;
		}

		// And the final one
		var finalWeight = 1.0 / variableWeights[weightsIndex - 1];

		if (variableWeights[weightsIndex - 1] === 0) {
			// HACK: Getting around division by zero
			finalWeight = 0;
		}
		currentWeights[currentDestinationWeightIndex] = finalWeight;
		currentWeightsSquared[currentDestinationWeightIndex] = finalWeight * finalWeight;
		variableIndices[variableIndices.length - 1] = 0;
		this.variableIndexOrdersForWeights.push(variableIndices);
	}

	this.createVariableToMessageBinding(sumVariable);

	for (var varIndex = 0; varIndex < variablesToSum.length; varIndex++) {
		var currentVariable = variablesToSum[varIndex];
		this.createVariableToMessageBinding(currentVariable);
	}
};

util.inherits(GaussianWeightedSumFactor, GaussianFactor);

GaussianWeightedSumFactor.prototype.createName = function(sumVariable, variablesToSum,
	weights) {
	var sb = sumVariable.toString();
	sb += " = ";

	for (var i = 0; i < variablesToSum.length; i++) {
		var isFirst = (i === 0);

		if (isFirst && (weights[i] < 0)) {
			sb += " - ";
		}

		sb += util.format("%s", Math.abs(weights[i]));
		sb += " * [";
		sb += variablesToSum[i];
		sb += "] ";

		var isLast = (i == variablesToSum.length - 1);

		if (!isLast) {
			if (weights[i + 1] >= 0) {
				sb += " + ";
			} else {
				sb += " - ";
			}
		}
	}

	return sb;
};

GaussianWeightedSumFactor.prototype.getLogNormalization = function() {
	var vars = this.getVariables();
	var messages = this.getMessages();

	var result = 0.0;

	// We start at 1 since offset 0 has the sum
	for (var i = 1; i < vars.length; i++) {
		result += GaussianDistribution.logRatioNormalization(vars[i].getValue(), messages[i].getValue());
	}

	return result;
};

GaussianWeightedSumFactor.prototype.updateMessage = function(messageIndex) {
	var variables = this.getVariables();
	var messages = this.getMessages();

	Guard.argumentIsValidIndex(messageIndex, messages.length, "messageIndex");

	var updatedMessages = [];
	var updatedVariables = [];

	var indicesToUse = this.variableIndexOrdersForWeights[messageIndex];

	// The tricky part here is that we have to put the messages and variables in the same
	// order as the weights. Thankfully, the weights and messages share the same index numbers,
	// so we just need to make sure they're consistent
	for (var i = 0; i < messages.length; i++) {
		updatedMessages.push(messages[indicesToUse[i]]);
		updatedVariables.push(variables[indicesToUse[i]]);
	}

	return this.updateHelper(this.weights[messageIndex], this.weightsSquared[messageIndex], updatedMessages, updatedVariables);
};

GaussianWeightedSumFactor.prototype.updateHelper = function(weights, weightsSquared, messages,
	variables) {
	// Potentially look at http://mathworld.wolfram.com/NormalSumDistribution.html for clues as
	// to what it's doing
	var message0 = GaussianDistribution.fromGaussian(messages[0].getValue());
	var marginal0 = GaussianDistribution.fromGaussian(variables[0].getValue());

	// The math works out so that 1/newPrecision = sum of a_i^2 /marginalsWithoutMessages[i]
	var inverseOfNewPrecisionSum = 0.0;
	var anotherInverseOfNewPrecisionSum = 0.0;
	var weightedMeanSum = 0.0;
	var anotherWeightedMeanSum = 0.0;

	for (var i = 0; i < weightsSquared.length; i++) {
		// These flow directly from the paper
		inverseOfNewPrecisionSum += weightsSquared[i] /
			(variables[i + 1].getValue().getPrecision() -
				messages[i + 1].getValue().getPrecision());

		var diff = GaussianDistribution.divide(variables[i + 1].getValue(),
			messages[i + 1].getValue());
		anotherInverseOfNewPrecisionSum += weightsSquared[i] / diff.getPrecision();

		weightedMeanSum += weights[i] *
			(variables[i + 1].getValue().getPrecisionMean() -
			messages[i + 1].getValue().getPrecisionMean()) /
			(variables[i + 1].getValue().getPrecision() -
			messages[i + 1].getValue().getPrecision());

		anotherWeightedMeanSum += weights[i] * diff.getPrecisionMean() / diff.getPrecision();
	}

	var newPrecision = 1.0 / inverseOfNewPrecisionSum;
	var anotherNewPrecision = 1.0 / anotherInverseOfNewPrecisionSum;

	var newPrecisionMean = newPrecision * weightedMeanSum;
	var anotherNewPrecisionMean = anotherNewPrecision * anotherWeightedMeanSum;

	var oldMarginalWithoutMessage = GaussianDistribution.divide(marginal0, message0);

	var newMessage = GaussianDistribution.fromPrecisionMean(newPrecisionMean, newPrecision);
	var anotherNewMessage = GaussianDistribution.fromPrecisionMean(anotherNewPrecisionMean, anotherNewPrecision);
	if (!newMessage.equals(anotherNewMessage)) {
		throw new Error("newMessage: " + newMessage + " and anotherNewMessage " +
			anotherNewMessage + " aren't the same");
	}

	var newMarginal = GaussianDistribution.multiply(oldMarginalWithoutMessage, newMessage);

	// Update the message and marginal

	messages[0].setValue(newMessage);
	variables[0].setValue(newMarginal);

	// Return the difference in the new marginal
	return GaussianDistribution.absoluteDifference(newMarginal, marginal0);
};

module.exports = GaussianWeightedSumFactor;
