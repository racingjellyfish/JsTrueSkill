var GameInfo = require('../../../lib/racingjellyfish/jstrueskill/GameInfo');

var mean = 25.0;
var standardDeviation = mean / 3.0;
var beta = mean / 6.0;
var dynamicsFactor = mean / 300.0;
var drawProbability = 0.1;

exports.testConstructor = function(test) {
	var gameInfo = new GameInfo(mean, standardDeviation, beta,
		dynamicsFactor, drawProbability);

	test.ok(gameInfo !== undefined, "Expected valid object");
	testGameInfo(test, gameInfo, mean, standardDeviation, beta,
		dynamicsFactor, drawProbability);

	test.done();
};

exports.testGetDefault = function(test) {
	var gameInfo = GameInfo.getDefaultGameInfo();

	test.ok(gameInfo !== undefined, "Expected valid object");
	testGameInfo(test, gameInfo, mean, standardDeviation, beta,
		dynamicsFactor, drawProbability);

	test.done();
};

exports.testGetDefaultRating = function(test) {
	var gameInfo = GameInfo.getDefaultGameInfo();

	var rating = gameInfo.getDefaultRating();
	test.ok(rating !== undefined, "Expected valid object");
	test.equal(rating.getMean(), mean,
		"Expected rating mean to be " + mean);
	test.equal(rating.getStandardDeviation(), standardDeviation,
		"Expected rating standard deviation to be " + standardDeviation);

	test.done();
};

exports.testSetters = function(test) {
	var gameInfo = GameInfo.getDefaultGameInfo();

	var mean = 24.0;
	var standardDeviation = mean / 3.0;
	var beta = mean / 6.0;
	var dynamicsFactor = mean / 300.0;
	var drawProbability = 0.05;

	gameInfo.setInitialMean(mean);
	gameInfo.setInitialStandardDeviation(standardDeviation);
	gameInfo.setBeta(beta);
	gameInfo.setDynamicsFactor(dynamicsFactor);
	gameInfo.setDrawProbability(drawProbability);

	testGameInfo(test, gameInfo, mean, standardDeviation, beta,
		dynamicsFactor, drawProbability);

	test.done();
};

var testGameInfo = function(test, gameInfo, mean, standardDeviation, beta,
		dynamicsFactor, drawProbability) {
	test.equal(gameInfo.getInitialMean(), mean,
		"Expected initial mean to be " + mean);
	test.equal(gameInfo.getInitialStandardDeviation(), standardDeviation,
		"Expected initial standard deviation to be " + standardDeviation);
	test.equal(gameInfo.getBeta(), beta,
		"Expected beta to be " + beta);
	test.equal(gameInfo.getDynamicsFactor(), dynamicsFactor,
		"Expected dynamics factor to be " + dynamicsFactor);
	test.equal(gameInfo.getDrawProbability(), drawProbability,
		"Expected draw probability to be " + drawProbability);
};
