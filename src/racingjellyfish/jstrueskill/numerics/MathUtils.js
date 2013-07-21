/**
 * Some useful functions.
 */
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
