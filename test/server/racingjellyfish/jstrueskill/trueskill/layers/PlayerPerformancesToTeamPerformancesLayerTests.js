var PlayerPerformancesToTeamPerformancesLayer = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/layers/PlayerPerformancesToTeamPerformancesLayer');

exports.testConstructor = function(test) {
	var playerPerformancesToTeamPerformancesLayer =
		new PlayerPerformancesToTeamPerformancesLayer({});

	test.ok(playerPerformancesToTeamPerformancesLayer !== undefined, "Expected valid object");

	test.done();
};
