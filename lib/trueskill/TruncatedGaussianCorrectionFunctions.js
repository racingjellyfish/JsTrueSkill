/**
 * Implementations of the functions from the bottom of page 4 of the TrueSkill paper.
 *
 * N.B. See the accompanying math paper for more details:
 *
 *		http://www.moserware.com/2010/03/computing-your-skill.html
 */
var GaussianDistribution = require('../numerics/GaussianDistribution');

/**
 * The "V" function where the team performance difference is greater than the draw margin.
 * <remarks>In the reference F# implementation, this is referred to as "the additive
 * correction of a single-sided truncated Gaussian with unit variance."</remarks>
 * @param teamPerformanceDifference
 * @param drawMargin In the paper, it's referred to as just "ε".
 * @returns {*}
 */
exports.vExceedsMargin = function(teamPerformanceDifference, drawMargin, c) {
	if (arguments.length == 2) {
		var denominator =
			GaussianDistribution.cumulativeTo(teamPerformanceDifference - drawMargin);

		if (denominator < 2.222758749e-162) {
			return -teamPerformanceDifference + drawMargin;
		}

		return GaussianDistribution.at(teamPerformanceDifference - drawMargin) / denominator;
	}

	return this.vExceedsMargin(teamPerformanceDifference/c, drawMargin/c);
};

/**
 * The "W" function where the team performance difference is greater than the draw margin.
 * <remarks>In the reference F# implementation, this is referred to as "the multiplicative
 * correction of a single-sided truncated Gaussian with unit variance."</remarks>
 * @param teamPerformanceDifference
 * @param drawMargin
 * @param c
 * @returns {*}
 */
exports.wExceedsMargin = function(teamPerformanceDifference, drawMargin, c) {
	if (arguments.length == 2) {
		var denominator =
			GaussianDistribution.cumulativeTo(teamPerformanceDifference -
				drawMargin);

		if (denominator < 2.222758749e-162) {
			if (teamPerformanceDifference < 0.0) {
				return 1.0;
			}
			return 0.0;
		}

		var vWin = this.vExceedsMargin(teamPerformanceDifference, drawMargin);

		return vWin*(vWin + teamPerformanceDifference - drawMargin);
	}

	return this.wExceedsMargin(teamPerformanceDifference/c, drawMargin/c);
};

// the additive correction of a double-sided truncated Gaussian with unit variance
exports.vWithinMargin = function(teamPerformanceDifference, drawMargin, c) {
	if (arguments.length == 2) {
		// from F#:
		var teamPerformanceDifferenceAbsoluteValue = Math.abs(teamPerformanceDifference);
		var denominator =
			GaussianDistribution.cumulativeTo(drawMargin - teamPerformanceDifferenceAbsoluteValue) -
			GaussianDistribution.cumulativeTo(-drawMargin - teamPerformanceDifferenceAbsoluteValue);

		if (denominator < 2.222758749e-162) {
			if (teamPerformanceDifference < 0.0) {
				return -teamPerformanceDifference - drawMargin;
			}
			return -teamPerformanceDifference + drawMargin;
		}

		var numerator = GaussianDistribution.at(-drawMargin - teamPerformanceDifferenceAbsoluteValue) -
						GaussianDistribution.at(drawMargin - teamPerformanceDifferenceAbsoluteValue);

		if (teamPerformanceDifference < 0.0) {
			return -numerator/denominator;
		}

		return numerator/denominator;
	}

	return this.vWithinMargin(teamPerformanceDifference/c, drawMargin/c);
};


// the multiplicative correction of a double-sided truncated Gaussian with unit variance
exports.wWithinMargin = function(teamPerformanceDifference, drawMargin, c) {
	if (arguments.length == 2) {
		// from F#:
		var teamPerformanceDifferenceAbsoluteValue = Math.abs(teamPerformanceDifference);
		var denominator =
			GaussianDistribution.cumulativeTo(drawMargin - teamPerformanceDifferenceAbsoluteValue) -
			GaussianDistribution.cumulativeTo(-drawMargin - teamPerformanceDifferenceAbsoluteValue);

		if (denominator < 2.222758749e-162) {
			return 1.0;
		}

		var vt = this.vWithinMargin(teamPerformanceDifferenceAbsoluteValue, drawMargin);

		return vt * vt +
				(
					(drawMargin - teamPerformanceDifferenceAbsoluteValue) *
					GaussianDistribution.at(
					drawMargin - teamPerformanceDifferenceAbsoluteValue) -
					(-drawMargin - teamPerformanceDifferenceAbsoluteValue) *
					GaussianDistribution.at(-drawMargin - teamPerformanceDifferenceAbsoluteValue))/denominator;
	}

	return this.wWithinMargin(teamPerformanceDifference/c, drawMargin/c);
};
