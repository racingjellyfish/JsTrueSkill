/**
 * A set of utility functions for checking the validity of arguments.
 */
exports.argumentNotNull = function(value, parameterName) {
    if (value === null || value === undefined) {
        throw new Error('Null or undefined value: ' + parameterName);
    }
};

exports.argumentIsValidIndex = function(index, count, parameterName) {
    if ((index < 0) || (index >= count)) {
        throw new Error('Index out of bounds: ' + parameterName);
    }
};

exports.argumentInRangeInclusive = function(value, min, max, parameterName) {
    if ((value < min) || (value > max)) {
        throw new Error('Index out of range: ' + parameterName);
    }
};
