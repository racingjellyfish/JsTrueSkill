var PlayerSkillsToPerformancesLayer = require('../../../../../lib/racingjellyfish/jstrueskill/trueskill/layers/PlayerSkillsToPerformancesLayer');

exports.testConstructor = function(test) {
	var playerSkillsToPerformancesLayer = new PlayerSkillsToPerformancesLayer({}, {});

	test.ok(playerSkillsToPerformancesLayer !== undefined, "Expected valid object");

	test.done();
};
