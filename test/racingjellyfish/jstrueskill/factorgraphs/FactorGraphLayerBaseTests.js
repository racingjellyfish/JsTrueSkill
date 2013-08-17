var FactorGraphLayerBase = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/FactorGraphLayerBase');

exports.testBasicValues = function(test) {
	var factorGraphLayerBase = new FactorGraphLayerBase();

	var expected = null;
	test.equal(factorGraphLayerBase.createPriorSchedule(), expected,
		"Expected prior schedule to be: " + expected);
	test.equal(factorGraphLayerBase.createPosteriorSchedule(), expected,
		"Expected posterior schedule to be: " + expected);

	test.done();
};
