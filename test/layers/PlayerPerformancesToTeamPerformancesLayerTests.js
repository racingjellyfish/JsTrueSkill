var PlayerPerformancesToTeamPerformancesLayer = require('../../lib/layers/PlayerPerformancesToTeamPerformancesLayer');

exports.testConstructor = function(test) {
	var playerPerformancesToTeamPerformancesLayer =
		new PlayerPerformancesToTeamPerformancesLayer({});

	test.ok(playerPerformancesToTeamPerformancesLayer !== undefined, "Expected valid object");

	test.done();
};
