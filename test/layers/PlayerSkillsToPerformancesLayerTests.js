var PlayerSkillsToPerformancesLayer = require('../../lib/layers/PlayerSkillsToPerformancesLayer');

exports.testConstructor = function(test) {
	var playerSkillsToPerformancesLayer = new PlayerSkillsToPerformancesLayer({}, {});

	test.ok(playerSkillsToPerformancesLayer !== undefined, "Expected valid object");

	test.done();
};
