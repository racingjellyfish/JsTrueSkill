var IteratedTeamDifferencesInnerLayer = require('../../../../../../src/racingjellyfish/jstrueskill/trueskill/layers/IteratedTeamDifferencesInnerLayer');

exports.testConstructor = function(test) {
	var iteratedTeamDifferencesInnerLayer =
		new IteratedTeamDifferencesInnerLayer({}, {}, {});

	test.ok(iteratedTeamDifferencesInnerLayer !== undefined, "Expected valid object");

	test.done();
};
