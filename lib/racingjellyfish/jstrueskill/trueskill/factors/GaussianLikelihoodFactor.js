var util = require('util');
var Guard = require('../../Guard');
var GaussianDistribution = require('../../numerics/GaussianDistribution');
var GaussianFactor = require('./GaussianFactor');
var Message = require('../../factorgraphs/Message');
var Variable = require('../../factorgraphs/Variable');

/**
 * Connects two variables and adds uncertainty.
 * <remarks>See the accompanying math paper for more details.</remarks>
 */
var GaussianLikelihoodFactor = function(betaSquared, variable1, variable2) {
    GaussianLikelihoodFactor.super_.call(this,
        util.format('Likelihood of %s going to %s', variable2, variable1));

    this.precision = 1.0 / betaSquared;
    this.createVariableToMessageBinding(variable1);
    this.createVariableToMessageBinding(variable2);
};

util.inherits(GaussianLikelihoodFactor, GaussianFactor);

GaussianLikelihoodFactor.prototype.getLogNormalization = function() {
    return GaussianDistribution.logRatioNormalization(this.getVariables()[0].getValue(),
        this.getMessages()[0].getValue());
};

GaussianLikelihoodFactor.prototype.updateHelper = function(message1, message2, variable1,
    variable2) {
    var message1Value = GaussianDistribution.fromGaussian(message1.getValue());
    var message2Value = GaussianDistribution.fromGaussian(message2.getValue());

    var marginal1 = GaussianDistribution.fromGaussian(variable1.getValue());
    var marginal2 = GaussianDistribution.fromGaussian(variable2.getValue());

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
    return GaussianDistribution.absoluteDifference(newMarginal, marginal1);
};

GaussianLikelihoodFactor.prototype.updateMessage = function(messageIndex) {
    Guard.argumentIsValidIndex(messageIndex, 2, "messageIndex");

    var message0 = this.getMessages()[0];
    var message1 = this.getMessages()[1];
    var variable0 = this.getVariables()[0];
    var variable1 = this.getVariables()[1];
    switch (messageIndex) {
        case 0:
            return this.updateHelper(message0, message1, variable0, variable1);
        case 1:
            return this.updateHelper(message1, message0, variable1, variable0);
    }
};

module.exports = GaussianLikelihoodFactor;
