/**
 * Represents a comparison between two players.
 *
 * The actual values for the enum were chosen so that they also correspond to the
 * multiplier for updates to means.
 */
var Guard = require('./Guard');

var PairwiseComparison = function(multiplier) {
	Guard.argumentInRangeInclusive(multiplier, -1, 1, 'multiplier');

	this.multiplier = multiplier;
};

PairwiseComparison.prototype.getMultiplier = function() {
	return this.multiplier;
};

PairwiseComparison.WIN = new PairwiseComparison(1);

PairwiseComparison.DRAW = new PairwiseComparison(0);

PairwiseComparison.LOSE = new PairwiseComparison(-1);

PairwiseComparison.fromMultiplier = function(multiplier) {
	switch (multiplier) {
		case 1:
			return PairwiseComparison.WIN;
		case 0:
			return PairwiseComparison.DRAW;
		case -1:
			return PairwiseComparison.LOSE;
		default:
			throw new Error("Unrecognized multiplier: " + multiplier);
	}
};

module.exports = PairwiseComparison;
