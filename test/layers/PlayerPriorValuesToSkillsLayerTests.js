var PlayerPriorValuesToSkillsLayer = require('../../lib/layers/PlayerPriorValuesToSkillsLayer');

exports.testConstructor = function(test) {
	var playerPriorValuesToSkillsLayer =
		new PlayerPriorValuesToSkillsLayer({}, {});

	test.ok(playerPriorValuesToSkillsLayer !== undefined, "Expected valid object");

	test.done();
};
