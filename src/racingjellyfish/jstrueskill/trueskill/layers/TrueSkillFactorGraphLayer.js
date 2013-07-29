var FactorGraphLayer = require('../../factorgraphs/FactorGraphLayer');

var TrueSkillFactorGraphLayer = function(parentGraph) {
	FactorGraphLayer.call(this, parentGraph);
};

TrueSkillFactorGraphLayer.prototype = new FactorGraphLayer();

module.exports = TrueSkillFactorGraphLayer;
