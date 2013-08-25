/**
 * A very limited implementation of an immutable range of Integers, including
 * endpoints. There is no such thing as an empty range.
 * <p>
 * The whole purpose of this class is to make the code for the
 * SkillCalculator(s) look a little cleaner.
 */
var Range = function(min, max) {
	if (min > max) {
		throw new Error("Min must be less than max");
	}
	this.min = min;
	this.max = max;
};

/**
 * Return true if the specified value is within this range.
 *
 * @param value
 * @returns {boolean}
 */
Range.prototype.isInRange = function(value) {
	return (this.min <= value) && (value <= this.max);
};

/**
 * Return the minimum value for this range.
 *
 * @returns {number}
 */
Range.prototype.getMin = function() {
	return this.min;
};

/**
 * Return the maximum value for this range.
 *
 * @returns {number}
 */
Range.prototype.getMax = function() {
	return this.max;
};

Range.prototype.toString = function() {
	return "Range(min=" + this.getMin() + ", max=" + this.getMax() + ")";
};

Range.prototype.equals = function(other) {
	if (other === this) {
		return true;
	}

	if (typeof other !== 'object') {
		return false;
	}

	if (this.getMin() != other.getMin()) {
		return false;
	}

	if (this.getMax() != other.getMax()) {
		return false;
	}

	return true;
};

/**
 * Return a range including the specified values.
 *
 * @param min
 * @param max
 * @returns {Range}
 */
Range.inclusive = function(min, max) {
	return new Range(min, max);
};

/**
 * Return a range consisting of the specified value.
 *
 * @param value
 * @returns {Range}
 */
Range.exactly = function(value) {
	return new Range(value, value);
};

/**
 * Return a range with the specified minimum value.
 *
 * @param value
 * @returns {Range}
 */
Range.atLeast = function(value) {
	return new Range(value, Infinity);
};

module.exports = Range;
