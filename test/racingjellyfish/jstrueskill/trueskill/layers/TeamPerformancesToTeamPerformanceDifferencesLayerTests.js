var TeamPerformancesToTeamPerformanceDifferencesLayer = require('../../../../../lib/racingjellyfish/jstrueskill/trueskill/layers/TeamPerformancesToTeamPerformanceDifferencesLayer');

exports.testConstructor = function(test) {
	var teamPerformancesToTeamPerformanceDifferencesLayer =
		new TeamPerformancesToTeamPerformanceDifferencesLayer({}, {});

	test.ok(teamPerformancesToTeamPerformanceDifferencesLayer !== undefined, "Expected valid object");

	test.done();
};
