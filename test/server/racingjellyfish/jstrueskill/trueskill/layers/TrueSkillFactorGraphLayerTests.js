var TrueSkillFactorGraphLayer = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/layers/TrueSkillFactorGraphLayer');

exports.testConstructor = function(test) {
	var trueSkillFactorGraphLayer =
		new TrueSkillFactorGraphLayer({});

	test.ok(trueSkillFactorGraphLayer !== undefined, "Expected valid object");

	test.done();
};
