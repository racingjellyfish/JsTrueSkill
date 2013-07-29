var TrueSkillFactorGraph = require('../../../../../src/racingjellyfish/jstrueskill/trueskill/TrueSkillFactorGraph');

exports.testConstructor = function(test) {
	var trueSkillFactorGraph = new TrueSkillFactorGraph({}, {});

	test.ok(trueSkillFactorGraph !== undefined, "Expected valid object");

	test.done();
};
