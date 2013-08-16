/**
 * Some useful values and functions.
 */
exports.INV_SQRT_2 = 1 / Math.sqrt(2);

exports.square = function(value) {
	return value * value;
};

exports.mean = function(collection) {
	if (collection.length === 0) {
		throw new Error("Mean of empty collection is undefined");
	}

	var total = 0;
	for (var index = 0; index < collection.length; index++) {
		total += collection[index];
	}

	return total / collection.length;
};

exports.arrayCopy = function(src, srcPos, dest, destPos, length) {
	for (var index = 0; index < length; index++) {
		dest[destPos + index] = src[srcPos + index];
	}

	return dest;
};

// TODO roll out to other numerical equal checks...
exports.notEqual = function(value0, value1) {
	if (isNaN(value0) && isNaN(value1)) {
		return false;
	} else {
		return value0 !== value1;
	}
};
