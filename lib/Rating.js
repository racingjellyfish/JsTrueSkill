/**
 * Container for a player's rating.
 */
var util = require('util');
var GaussianDistribution = require('./numerics/GaussianDistribution');
var MathUtils = require('./numerics/MathUtils');

var defaultConservativeStandardDeviationMultiplier = 3;

/**
 * Constructs a rating.
 * @param mean The statistical mean value of the rating (also known as μ).
 * @param standardDeviation The number of standardDeviation to subtract from the mean to achieve a conservative
 * rating.
 * @param conservativeStandardDeviationMultiplier The number of standardDeviations to subtract from the mean to
 * achieve a conservative rating.
 */
var Rating = function(mean, standardDeviation, conservativeStandardDeviationMultiplier) {
	if (conservativeStandardDeviationMultiplier === undefined) {
		conservativeStandardDeviationMultiplier =
			defaultConservativeStandardDeviationMultiplier;
	}
	this.conservativeStandardDeviationMultiplier = conservativeStandardDeviationMultiplier;

	/** The statistical mean value of the rating (also known as μ). */
	this.mean = mean;

	/** The standard deviation (the spread) of the rating. This is also known as σ. */
	this.standardDeviation = standardDeviation;

	/** A conservative estimate of skill based on the mean and standard deviation. */
	this.conservativeRating = mean - conservativeStandardDeviationMultiplier * standardDeviation;
};

Rating.prototype.getMean = function() {
	return this.mean;
};

Rating.prototype.getStandardDeviation = function() {
	return this.standardDeviation;
};

/** The variance of the rating (standard deviation squared) */
Rating.prototype.getVariance = function() {
	return MathUtils.square(this.getStandardDeviation());
};

Rating.prototype.getConservativeRating = function() {
	return this.conservativeRating;
};

Rating.prototype.getConservativeStandardDeviationMultiplier = function() {
	return this.conservativeStandardDeviationMultiplier;
};

// TODO are prior/fullPosterior gaussians?
Rating.prototype.partialUpdate = function(prior, fullPosterior, updatePercentage) {
	var priorGaussian = new GaussianDistribution(prior);
	var posteriorGaussian = new GaussianDistribution(fullPosterior);

	// From a clarification email from Ralf Herbrich:
	// "the idea is to compute a linear interpolation between the prior and
	// posterior skills of each player ... in the canonical space of
	// parameters"
	var precisionDifference = posteriorGaussian.getPrecision() - priorGaussian.getPrecision();
	var partialPrecisionDifference = updatePercentage * precisionDifference;
	var precisionMeanDifference = posteriorGaussian.getPrecisionMean() - priorGaussian.getPrecisionMean();
	var partialPrecisionMeanDifference = updatePercentage * precisionMeanDifference;
	var partialPosteriorGaussion = GaussianDistribution.fromPrecisionMean(
			priorGaussian.getPrecisionMean() + partialPrecisionMeanDifference, priorGaussian.getPrecision() +
					partialPrecisionDifference);
	return new Rating(partialPosteriorGaussion.getMean(), partialPosteriorGaussion.getStandardDeviation(),
			prior.getConservativeStandardDeviationMultiplier());
};

Rating.prototype.equals = function(other) {
	if (other == this) {
		return true;
	}
	if (this.getConservativeStandardDeviationMultiplier() !=
			other.getConservativeStandardDeviationMultiplier()) {
		return false;
	}
	if (this.getMean() != other.getMean()) {
		return false;
	}
	if (this.getStandardDeviation() != other.getStandardDeviation()) {
		return false;
	}
	if (this.getConservativeRating() != other.getConservativeRating()) {
		return false;
	}

	return true;
};

Rating.prototype.toString = function() {
	// As a debug helper, display a localized rating:
	return util.format("Mean(μ)=%s, Std-Dev(σ)=%s", this.mean,
		this.standardDeviation);
};


Rating.calcMeanMean = function(ratings) {
	var ret = 0;

	ratings.forEach(function(element) {
		ret += element.getMean();
	});

	return ret / ratings.length;
};

module.exports = Rating;
