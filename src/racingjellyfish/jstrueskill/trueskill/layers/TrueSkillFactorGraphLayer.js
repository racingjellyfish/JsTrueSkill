var FactorGraphLayer = require('../../factorgraphs/FactorGraphLayer');

var TrueSkillFactorGraphLayer = function(parentGraph) {
	FactorGraphLayer.call(this, parentGraph);

	this.teamPerformancesToTeamPerformanceDifferencesLayer = teamPerformancesToPerformanceDifferences;
	this.teamDifferencesComparisonLayer = teamDifferencesComparisonLayer;
};

TrueSkillFactorGraphLayer.prototype = new FactorGraphLayer();

module.exports = TrueSkillFactorGraphLayer;
