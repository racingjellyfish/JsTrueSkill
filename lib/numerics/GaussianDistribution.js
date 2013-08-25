/**
 * Immutable representation of the gaussian distribution of one variable.
 *
 * Not normalized:
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
var MathUtils = require('./MathUtils');
var square = MathUtils.square;

/**
 * Constructor that calculates precision and precision mean from the supplied values.
 */
var GaussianDistribution = function(mean, standardDeviation, variance, precision,
	precisionMean) {
	/** The peak of the gaussian, μ */
	this.mean = mean;

	/** The width of the gaussian, σ, where the height drops to max/e */
	this.standardDeviation = standardDeviation;

	// set the remaining instance values depending on the number of arguments
	if (arguments.length == 2) {
		/** The square of the standard deviation, σ^2 */
		this.variance = square(standardDeviation);

		// Precision and PrecisionMean are used because they make multiplying and
		// dividing simpler (see the accompanying math paper for more details)
		/** 1/σ^2 */
		this.precision = 1.0 / square(standardDeviation);

		/** Precision times mean, μ/σ^2 */
		this.precisionMean = mean / square(standardDeviation);
	} else {
		this.variance = variance;
		this.precision = precision;
		this.precisionMean = precisionMean;
	}
};

/**
 * Return the mean of the gaussian distribution.
 *
 * @returns {*}
 */
GaussianDistribution.prototype.getMean = function() {
	return this.mean;
};

/**
 * Return the standard deviation of the gaussian distribution.
 *
 * @returns {*}
 */
GaussianDistribution.prototype.getStandardDeviation = function() {
	return this.standardDeviation;
};

/**
 * Return the variance of the gaussian distribution.
 *
 * @returns {*}
 */
GaussianDistribution.prototype.getVariance = function() {
	return this.variance;
};

/**
 * Return the precision of the gaussian distribution.
 *
 * Defined as 1/σ^2
 *
 * @returns {*}
 */
GaussianDistribution.prototype.getPrecision = function() {
	return this.precision;
};

/**
 * Return the precision mean of the gaussian distribution.
 *
 * Defined as μ/σ^2
 *
 * @returns {*}
 */
GaussianDistribution.prototype.getPrecisionMean = function() {
	return this.precisionMean;
};

/**
 * The normalization constant multiplies the exponential and causes
 * the integral over (-Inf,Inf) to equal 1
 *
 * @return 1/sqrt(2*pi*σ)
 */
GaussianDistribution.prototype.getNormalizationConstant = function() {
	// Great derivation of this is at
	// http://www.astro.psu.edu/~mce/A451_2/A451/downloads/notes0.pdf
	return 1.0 / (Math.sqrt(2 * Math.PI) * this.standardDeviation);
};

/**
 * Multiply this gaussian by the specified gaussian.
 */
GaussianDistribution.prototype.multiply = function(other) {
	return GaussianDistribution.multiply(this, other);
};

GaussianDistribution.prototype.toString = function() {
	return "GaussianDistribution(Mean(μ) = " + this.getMean() +
		", Std-Dev(σ) = " + this.getStandardDeviation();
};

GaussianDistribution.prototype.equals = function(other) {
	if (other === this) {
		return true;
	}

	if (!other.getMean ||
		MathUtils.notEqual(this.getMean(), other.getMean())) {
		return false;
	}

	if (!other.getStandardDeviation ||
		MathUtils.notEqual(this.getStandardDeviation(), other.getStandardDeviation())) {
		return false;
	}

	if (!other.getVariance ||
		MathUtils.notEqual(this.getVariance(), other.getVariance())) {
		return false;
	}

	if (!other.getPrecision ||
		MathUtils.notEqual(this.getPrecision(), other.getPrecision())) {
		return false;
	}

	if (!other.getPrecisionMean ||
		MathUtils.notEqual(this.getPrecisionMean(), other.getPrecisionMean())) {
		return false;
	}

	return true;
};

/**
 * Construct from another gaussian.
 */
GaussianDistribution.fromGaussian = function(gaussian) {
	return new GaussianDistribution(gaussian.getMean(),
		gaussian.getStandardDeviation(), gaussian.getVariance(),
		gaussian.getPrecision(), gaussian.getPrecisionMean());
};

/**
 * Construct from a Rating.
 */
GaussianDistribution.fromRating = function(rating) {
	return new GaussianDistribution(rating.getMean(), rating.getStandardDeviation());
};

/**
 * Construct from the precision and precision mean.
 */
GaussianDistribution.fromPrecisionMean = function(precisionMean, precision) {
	return new GaussianDistribution(precisionMean / precision, Math.sqrt(1.0 / precision),
		1.0 / precision, precision, precisionMean);
};

/**
 * The gaussian representation of a flat line.
 */
GaussianDistribution.UNIFORM = new GaussianDistribution.fromPrecisionMean(0, 0);

/**
 * Return the cumulative area to the specified value under the specified gaussian.
 *
 * N.B. If mean and/or standard deviation are not specified the
 * normalized values will be used.
 *
 */
GaussianDistribution.cumulativeTo = function(x) {
	var result = GaussianDistribution.errorFunctionCumulativeTo(-MathUtils.INV_SQRT_2 * x);
	return 0.5 * result;
};

/**
 * Return the cumulative error function to the specified value.
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
 * Return the inverse cumulative to the specified value for the specified gaussian.
 *
 * From numerical recipes, page 320
 */
GaussianDistribution.inverseCumulativeTo = function(x, mean, standardDeviation) {
	// Check arguments
	if (!mean) {
		mean = 0;
	}
	if (!standardDeviation) {
		standardDeviation = 1;
	}

	return mean - Math.sqrt(2) * standardDeviation *
		GaussianDistribution.inverseErrorFunctionCumulativeTo(2 * x);
};

/**
 * Return the inverse error function cumulative to the specified value for
 * the specified gaussian.
 *
 * From numerical recipes, page 265
 */
GaussianDistribution.inverseErrorFunctionCumulativeTo = function(p) {
	if (p >= 2.0) {
		return -100;

	}
	if (p <= 0.0) {
		return 100;
	}

	var pp = (p < 1.0) ? p : 2 - p;
	var t = Math.sqrt(-2 * Math.log(pp / 2.0)); // Initial guess
	var x = -0.70711 * ((2.30753 + t * 0.27061) / (1.0 + t * (0.99229 + t * 0.04481)) - t);
	for (var j = 0; j < 2; j++) {
		var err = GaussianDistribution.errorFunctionCumulativeTo(x) - pp;
		x += err / (1.1283791670955126 * Math.exp(-(x * x)) - x * err); // Halley
	}
	return p < 1.0 ? x : -x;
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
 * Computes the absolute difference between two gaussians.
 *
 * @param left
 * @param right
 * @returns {number}
 */
GaussianDistribution.absoluteDifference = function(left, right) {
	return Math.max(Math.abs(left.getPrecisionMean() - right.getPrecisionMean()),
		Math.sqrt(Math.abs(left.getPrecision() - right.getPrecision())));
};

/**
 * Multiply two gaussians, calculated using the precision and precision mean.
 *
 * @param left
 * @param right
 * @returns {GaussianDistribution}
 */
GaussianDistribution.multiply = function(left, right) {
	// Although we could use equations from
	// http://www.tina-vision.net/tina-knoppix/tina-memo/2003-003.pdf
	// for multiplication, the precision mean ones are easier to write :)
	return GaussianDistribution.fromPrecisionMean(left.getPrecisionMean() +
		right.getPrecisionMean(), left.getPrecision() + right.getPrecision());
};

/**
 * Divide two gaussians, calculated using the precision and precision mean.
 *
 * @param numerator
 * @param denominator
 * @returns {GaussianDistribution}
 */
GaussianDistribution.divide = function(numerator, denominator) {
	return GaussianDistribution.fromPrecisionMean(numerator.getPrecisionMean() -
		denominator.getPrecisionMean(), numerator.getPrecision() -
		denominator.getPrecision());
};

/**
 * Calculates the log product normalization for the specified gaussians.
 *
 * @param left
 * @param right
 * @returns {number}
 */
GaussianDistribution.logProductNormalization = function(left, right) {
	if (left.getPrecision() === 0 || right.getPrecision() === 0) {
		return 0;
	}
	var varianceSum = left.getVariance() + right.getVariance();
	var meanDifference = left.getMean() - right.getMean();
	var logSqrt2Pi = Math.log(Math.sqrt(2 * Math.PI));
	return -logSqrt2Pi - (Math.log(varianceSum) / 2.0) -
		(MathUtils.square(meanDifference) / (2.0 * varianceSum));
};

/**
 * Calculates the log ratio normalization for the specified gaussians.
 *
 * @param numerator
 * @param denominator
 * @returns {number}
 */
GaussianDistribution.logRatioNormalization = function(numerator, denominator) {
	if (numerator.getPrecision() === 0 || denominator.getPrecision() === 0)
	{
		return 0;
	}
	var varianceDifference = denominator.getVariance() - numerator.getVariance();
	var meanDifference = numerator.getMean() - denominator.getMean();
	var logSqrt2Pi = Math.log(Math.sqrt(2 * Math.PI));
	return Math.log(denominator.getVariance()) + logSqrt2Pi -
		Math.log(varianceDifference) / 2.0 +
		MathUtils.square(meanDifference) / (2 * varianceDifference);
};

module.exports = GaussianDistribution;
