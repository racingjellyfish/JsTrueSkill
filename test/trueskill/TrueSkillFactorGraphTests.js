var TrueSkillFactorGraph = require('../../lib/trueskill/TrueSkillFactorGraph');

exports.testConstructor = function(test) {
	var gameInfo = {
		getBeta: function() {
			return 0.5;
		},
		getDrawProbability: function() {
			return 0.5;
		}
	};
	var trueSkillFactorGraph = new TrueSkillFactorGraph(gameInfo, [], []);

	test.ok(trueSkillFactorGraph !== undefined, "Expected valid object");

	test.done();
};
