var TeamPerformancesToTeamPerformanceDifferencesLayer = require('../../lib/layers/TeamPerformancesToTeamPerformanceDifferencesLayer');

exports.testConstructor = function(test) {
	var teamPerformancesToTeamPerformanceDifferencesLayer =
		new TeamPerformancesToTeamPerformanceDifferencesLayer({}, {});

	test.ok(teamPerformancesToTeamPerformanceDifferencesLayer !== undefined, "Expected valid object");

	test.done();
};
