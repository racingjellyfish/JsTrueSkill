var util = require('util');
var Guard = require('../Guard');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../../factorgraphs/Message');
var Variable = require('../../factorgraphs/Variable');

/**
 * Connects two variables and adds uncertainty.
 * <remarks>See the accompanying math paper for more details.</remarks>
 */
var GaussianLikelihoodFactor = function(betaSquared, variable1, variable2) {
    GaussianFactor.call(this, util.format('Likelihood of %s going to %s', variable2, variable1));

    this.precision = 1.0 / betaSquared;
    this.createVariableToMessageBinding(variable1);
    this.createVariableToMessageBinding(variable2);
};

GaussianLikelihoodFactor.prototype = new GaussianFactor();

GaussianLikelihoodFactor.prototype.getLogNormalization = function() {
    return GaussianDistribution.logRatioNormalization(this.getVariables[0].getValue(),
        this.getMessages[0].getValue());
};

GaussianLikelihoodFactor.prototype.updateHelper = function(message1, message2, variable1,
    variable2) {
    var message1Value = new GaussianDistribution(message1.getValue());
    var message2Value = new GaussianDistribution(message2.getValue());

    var marginal1 = new GaussianDistribution(variable1.getValue());
    var marginal2 = new GaussianDistribution(variable2.getValue());

    var a = this.precision / (this.precision + marginal2.getPrecision() - message2Value.getPrecision());

    var newMessage = GaussianDistribution.fromPrecisionMean(
        a * (marginal2.getPrecisionMean() - message2Value.getPrecisionMean()),
        a * (marginal2.getPrecision() - message2Value.getPrecision()));

    var oldMarginalWithoutMessage = GaussianDistribution.divide(marginal1,message1Value);

    var newMarginal = GaussianDistribution.multiply(oldMarginalWithoutMessage,newMessage);

    // Update the message and marginal

    message1.setValue(newMessage);
    variable1.setValue(newMarginal);

    // Return the difference in the new marginal
    return GaussianDistribution.sub(newMarginal, marginal1);
};

GaussianLikelihoodFactor.prototype.updateMessage = function(messageIndex) {
    Guard.argumentIsValidIndex(messageIndex, 2, "messageIndex");

    switch (messageIndex) {
        case 0:
            return this.updateHelper(getMessages().get(0), getMessages().get(1),
                                getVariables().get(0), getVariables().get(1));
        case 1:
            return this.updateHelper(getMessages().get(1), getMessages().get(0),
                                getVariables().get(1), getVariables().get(0));
    }
};

module.exports = GaussianLikelihoodFactor;
