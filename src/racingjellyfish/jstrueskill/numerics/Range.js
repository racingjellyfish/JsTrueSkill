/**
 * A very limited implementation of an immutable range of Integers, including
 * endpoints. There is no such thing as an empty range.
 * <p>
 * The whole purpose of this class is to make the code for the
 * SkillCalculator(s) look a little cleaner.
 * <p>
 * Derived classes can't use this class's static ctors they way they could in
 * C#, so I'm going to eschew the relative type safety afforded by Moser's
 * scheme and make this class final. A Range is a Range is a Range.
 */
var Range = function(min, max) {
	if (min > max) {
		throw new Error("Min must be less than max");
	}
	this.min = min;
	this.max = max;
};

Range.prototype.isInRange = function(value) {
	return (this.min <= value) && (value <= this.max);
};

Range.prototype.getMin = function() {
	return this.min;
};

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

Range.inclusive = function(min, max) {
	return new Range(min, max);
};

Range.exactly = function(value) {
	return new Range(value, value);
};

Range.atLeast = function(value) {
	return new Range(value, Infinity);
};

module.exports = Range;
