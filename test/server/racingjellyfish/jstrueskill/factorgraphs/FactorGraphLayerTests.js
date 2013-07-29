var FactorGraphLayer = require('../../../../../src/racingjellyfish/jstrueskill/factorgraphs/FactorGraphLayer');

exports.testBasicValues = function(test) {
	var parentFactorGraph = {};
	var factorGraphLayer = new FactorGraphLayer(parentFactorGraph);

	var expected = null;
	test.equal(factorGraphLayer.createPriorSchedule(), expected,
		"Expected prior schedule to be: " + expected);
	test.equal(factorGraphLayer.createPosteriorSchedule(), expected,
		"Expected posterior schedule to be: " + expected);
	test.equal(factorGraphLayer.getParentFactorGraph(), parentFactorGraph,
		"Expected parent factor graph to be: " + parentFactorGraph);

	test.done();
};

exports.testSetParentFactorGraph = function(test) {
	var parentFactorGraph = {};
	var factorGraphLayer = new FactorGraphLayer(parentFactorGraph);

	var newParentFactorGraph = {
		test: 'test'
	};
	factorGraphLayer.setParentFactorGraph(newParentFactorGraph);
	test.equal(factorGraphLayer.getParentFactorGraph(), newParentFactorGraph,
		"Expected parent factor graph to be: " + newParentFactorGraph);

	test.done();
};
