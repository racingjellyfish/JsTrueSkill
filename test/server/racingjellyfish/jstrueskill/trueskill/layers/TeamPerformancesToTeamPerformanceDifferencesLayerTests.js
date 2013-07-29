var TeamPerformancesToTeamPerformanceDifferencesLayer = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/layers/TeamPerformancesToTeamPerformanceDifferencesLayer');

exports.testConstructor = function(test) {
	var teamPerformancesToTeamPerformanceDifferencesLayer =
		new TeamPerformancesToTeamPerformanceDifferencesLayer({}, {});

	test.ok(teamPerformancesToTeamPerformanceDifferencesLayer !== undefined, "Expected valid object");

	test.done();
};
