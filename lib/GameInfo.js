/**
 * Parameters about the game for calculating the TrueSkill.
 */
var Rating = require('./Rating');

var INITIAL_MEAN = 25.0;
var INITIAL_STANDARD_DEVIATION = INITIAL_MEAN / 3.0;
var BETA = INITIAL_MEAN / 6.0;
var DYNAMICS_FACTOR = INITIAL_MEAN / 300.0;
var DRAW_PROBABILITY = 0.1;

var GameInfo = function(initialMean, initialStandardDeviation, beta,
	dynamicsFactor, drawProbability) {
	this.initialMean = initialMean;
	this.initialStandardDeviation = initialStandardDeviation;
	this.beta = beta;
	this.dynamicsFactor = dynamicsFactor;
	this.drawProbability = drawProbability;
};

GameInfo.prototype.getDefaultRating = function() {
	return new Rating(this.initialMean, this.initialStandardDeviation);
};

GameInfo.prototype.getInitialMean = function() {
	return this.initialMean;
};

GameInfo.prototype.getInitialStandardDeviation = function() {
	return this.initialStandardDeviation;
};

GameInfo.prototype.getBeta = function() {
	return this.beta;
};

GameInfo.prototype.getDynamicsFactor = function() {
	return this.dynamicsFactor;
};

GameInfo.prototype.getDrawProbability = function() {
	return this.drawProbability;
};

GameInfo.prototype.setInitialMean = function(initialMean) {
	this.initialMean = initialMean;
};

GameInfo.prototype.setInitialStandardDeviation = function(initialStandardDeviation) {
	this.initialStandardDeviation = initialStandardDeviation;
};

GameInfo.prototype.setBeta = function(beta) {
	this.beta = beta;
};

GameInfo.prototype.setDynamicsFactor = function(dynamicsFactor) {
	this.dynamicsFactor = dynamicsFactor;
};

GameInfo.prototype.setDrawProbability = function(drawProbability) {
	this.drawProbability = drawProbability;
};

GameInfo.prototype.equals = function(other) {
	if (other == this) {
		return true;
	}
	if (this.getInitialMean() != other.getInitialMean()) {
		return false;
	}
	if (this.getInitialStandardDeviation() != other.getInitialStandardDeviation()) {
		return false;
	}
	if (this.getBeta() != other.getBeta()) {
		return false;
	}
	if (this.getDynamicsFactor() != other.getDynamicsFactor()) {
		return false;
	}
	if (this.getDrawProbability() != other.getDrawProbability()) {
		return false;
	}
	return true;
};

GameInfo.prototype.toString = function() {
	return "GameInfo(initialMean=" + this.getInitialMean() +
		", initialStandardDeviation=" + this.getInitialStandardDeviation() +
		", beta=" + this.getBeta() +
		", dynamicsFactor=" +this.getDynamicsFactor() +
		", drawProbability=" + this.getDrawProbability() + ")";
};

GameInfo.getDefaultGameInfo = function() {
	// We return a fresh copy since we have public setters that can mutate state
	return new GameInfo(INITIAL_MEAN, INITIAL_STANDARD_DEVIATION, BETA,
		DYNAMICS_FACTOR, DRAW_PROBABILITY);
};

module.exports = GameInfo;
