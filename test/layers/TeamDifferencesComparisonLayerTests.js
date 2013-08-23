var TeamDifferencesComparisonLayer = require('../../lib/layers/TeamDifferencesComparisonLayer');

exports.testConstructor = function(test) {
	var parentFactorGraph = {
		getGameInfo: function() {
			return {
				getBeta: function() {
					return 0.5;
				},
				getDrawProbability: function() {
					return 0.5;
				}
			};
		}
	};
	var teamDifferencesComparisonLayer =
		new TeamDifferencesComparisonLayer(parentFactorGraph, {});

	test.ok(teamDifferencesComparisonLayer !== undefined, "Expected valid object");

	test.done();
};
