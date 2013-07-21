var MathUtils = require('./MathUtils');
var square = MathUtils.square;
/**
 * Immutable representation of the Gaussian distribution of one variable. Not normalized:
 *
 * <pre>
 *			1			-(x)^2 / (2)
 * P(x)=----------- * e
 *		sqrt(2*pi)
 * </pre>
 *
 * Normalized:
 *
 * <pre>
 *				1			-(x-μ)^2 / (2*σ^2)
 * P(x)=--------------- * e
 *		σ * sqrt(2*pi)
 * </pre>
 *
 * @see http://mathworld.wolfram.com/NormalDistribution.html
 */

/**
 * Private constructor that sets everything at once.
 * <p>
 * Only allow other constructors to use this because if the public were to mess up the relationship between the
 * parameters, who knows what would happen?
 */
var GaussianDistribution = function(mean, standardDeviation) {
	/** The peak of the Gaussian, μ */
	this.mean = mean;

	/** The width of the Gaussian, σ, where the height drops to max/e */
	this.standardDeviation = standardDeviation;

	/** The square of the standard deviation, σ^2 */
	this.variance = square(standardDeviation);

	// Precision and PrecisionMean are used because they make multiplying and
	// dividing simpler (see the accompanying math paper for more details)
	/** 1/σ^2 */
	this.precision = 1.0 / square(standardDeviation);

	/** Precision times mean, μ/σ^2 */
	this.precisionMean = mean / square(standardDeviation);
};

GaussianDistribution.prototype.getMean = function() {
	return this.mean;
};

GaussianDistribution.prototype.getStandardDeviation = function() {
	return this.standardDeviation;
};

GaussianDistribution.prototype.getVariance = function() {
	return this.variance;
};

GaussianDistribution.prototype.getPrecision = function() {
	return this.precision;
};

GaussianDistribution.prototype.getPrecisionMean = function() {
	return this.precisionMean;
};

GaussianDistribution.prototype.toString = function() {
	return "GaussianDistribution(Mean(μ) = " + this.getMean() +
		", Std-Dev(σ) = " + this.getStandardDeviation();
};

GaussianDistribution.prototype.equals = function(other) {
	if (other === this) {
		return true;
	}

	if (typeof other !== 'object') {
		return false;
	}

	if (this.getMean() !== other.getMean()) {
		return false;
	}

	if (this.getStandardDeviation() !== other.getStandardDeviation()) {
		return false;
	}

	if (this.getVariance() !== other.getVariance()) {
		return false;
	}

	if (this.getPrecision() !== other.getPrecision()) {
		return false;
	}

	if (this.getPrecisionMean() !== other.getPrecisionMean()) {
		return false;
	}

	return true;
};

/**
 * Construct from another Gaussian.
 */
GaussianDistribution.atLeast = function(gaussian) {
	return new GaussianDistribution(gaussian.getMean(), gaussian.getStandardDeviation());
};


GaussianDistribution.fromPrecisionMean = function(precisionMean, precision) {
	return new GaussianDistribution(precisionMean / precision, sqrt(1.0 / precision),
		1.0 / precision, precision, precisionMean);
};


/**
 * The Gaussian representation of a flat line.
 */
GaussianDistribution.uniform = function() {
	return new GaussianDistribution.fromPrecisionMean(0, 0);
};

module.exports = GaussianDistribution;
