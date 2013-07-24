var MathUtils = require('./MathUtils');
var square = MathUtils.square;

var INV_SQRT_2 = -0.7071067811865476;

/**
 * Immutable representation of the gaussian distribution of one variable. Not normalized:
 *
 * <pre>
 *			1			-(x)^2 / 2
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
 * Constructor that calculates precision and precision mean from the supplied values.
 */
var GaussianDistribution = function(mean, standardDeviation) {
	/** The peak of the gaussian, μ */
	this.mean = mean;

	/** The width of the gaussian, σ, where the height drops to max/e */
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
 * Construct from another gaussian.
 */
GaussianDistribution.atLeast = function(gaussian) {
	return new GaussianDistribution(gaussian.getMean(), gaussian.getStandardDeviation());
};

/**
 * Construct from the precision and precision mean.
 */
GaussianDistribution.fromPrecisionMean = function(precisionMean, precision) {
	return new GaussianDistribution(precisionMean / precision, sqrt(1.0 / precision),
		1.0 / precision, precision, precisionMean);
};

/**
 * Return the cumulative area to the specified value under the specified gaussian.
 *
 * N.B. If mean and/or standard deviation are not specified the
 * normalized values will be used.
 *
 */
GaussianDistribution.cumulativeTo = function(x, mean, standardDeviation) {
	// TODO is std dev required?
	// Check arguments
	if (!mean) {
		mean = 0;
	}
	if (!standardDeviation) {
		standardDeviation = 1;
	}

	var result = GaussianDistribution.errorFunctionCumulativeTo(INV_SQRT_2 * x);
	return 0.5 * result;
};

/**
 * Return the cumulative error function to the specifed value.
 *
 * Derived from page 265 of Numerical Recipes 3rd Edition
 */
GaussianDistribution.errorFunctionCumulativeTo = function(x) {
	var z = Math.abs(x);
	var t = 2.0 / (2.0 + z);
	var ty = 4 * t - 2;
	var coefficients = [
		-1.3026537197817094, 0.6419697923564902, 0.019476473204185836,
		-0.00956151478680863, -9.46595344482036E-4, 3.66839497852761E-4,
		4.2523324806907E-5, -2.0278578112534E-5, -1.624290004647E-6,
		1.30365583558E-6, 1.5626441722E-8, -8.5238095915E-8, 6.529054439E-9,
		5.059343495E-9, -9.91364156E-10, -2.27365122E-10, 9.6467911E-11,
		2.394038E-12, -6.886027E-12, 8.94487E-13, 3.13092E-13, -1.12708E-13,
		3.81E-16, 7.106E-15, -1.523E-15, -9.4E-17, 1.21E-16, -2.8E-17];
	var ncof = coefficients.length;
	var d = 0.0;
	var dd = 0.0;
	for (var j = ncof - 1; j > 0; j--) {
		var tmp = d;
		d = ty * d - dd + coefficients[j];
		dd = tmp;
	}
	var ans = t * Math.exp(-z * z + 0.5 * (coefficients[0] + ty * d) - dd);
	return x >= 0.0 ? ans : (2.0 - ans);
};

/**
 * Return the value of the specified gaussian at the specified value.
 *
 * N.B. If mean and/or standard deviation are not specified the
 * normalized values will be used.
 *
 * <pre>
 *				1			-(x-μ)^2 / (2*σ^2)
 * P(x)=--------------- * e
 *		σ * sqrt(2*pi)
 * </pre>
 *
 * @param x the location to evaluate the specified gaussian at
 * @return the value at x of the specified gaussian
 * @see http://mathworld.wolfram.com/NormalDistribution.html
 */
GaussianDistribution.at = function(x, mean, standardDeviation) {
	// Check arguments
	if (!mean) {
		mean = 0;
	}
	if (!standardDeviation) {
		standardDeviation = 1;
	}

	var multiplier = 1.0 / (standardDeviation * Math.sqrt(2 * Math.PI));
	var expPart = Math.exp((-1.0 * Math.pow(x - mean, 2.0)) / (2 * (standardDeviation * standardDeviation)));
	var result = multiplier * expPart;
	return result;
};

/**
 * The gaussian representation of a flat line.
 */
GaussianDistribution.uniform = function() {
	return new GaussianDistribution.fromPrecisionMean(0, 0);
};

module.exports = GaussianDistribution;