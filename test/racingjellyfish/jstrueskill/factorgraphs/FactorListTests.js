var Factor = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Factor');
var FactorList = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/FactorList');

exports.testBasicValues = function(test) {
	var factorList = new FactorList();

	var expected = 0;
	test.equal(factorList.getSize(), expected, "Expected number of factors to be: " + expected);

	var factor = new Factor('Test');
	var returnValue = factorList.addFactor(factor);
	expected = 1;
	test.equal(factorList.getSize(), expected, "Expected number of factors to be: " + expected);
	test.equal(returnValue, factor, "Expected returned factor to be: " + factor);

	test.done();
};
