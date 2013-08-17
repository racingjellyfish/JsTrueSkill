var FactorGraphLayer = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/FactorGraphLayer');

exports.testBasicValues = function(test) {
	var parentFactorGraph = {};
	var factorGraphLayer = new FactorGraphLayer(parentFactorGraph);

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
