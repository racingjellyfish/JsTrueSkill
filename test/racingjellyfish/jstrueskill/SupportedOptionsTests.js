var SupportedOptions = require('../../../lib/racingjellyfish/jstrueskill/SupportedOptions');

exports.testBasicValues = function(test) {
	var supportedOption = SupportedOptions.PartialPlay;

	var expected = 'PartialPlay';
	test.equal(supportedOption, expected, "Expected option to be " + expected);

	supportedOption = SupportedOptions.PartialUpdate;

	expected = 'PartialUpdate';
	test.equal(supportedOption, expected, "Expected option to be " + expected);

	test.done();
};
