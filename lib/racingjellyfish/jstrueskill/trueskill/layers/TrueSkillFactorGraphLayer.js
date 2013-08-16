var util = require('util');
var FactorGraphLayer = require('../../factorgraphs/FactorGraphLayer');

var TrueSkillFactorGraphLayer = function(parentGraph) {
    TrueSkillFactorGraphLayer.super_.call(this, parentGraph);
};

util.inherits(TrueSkillFactorGraphLayer, FactorGraphLayer);

module.exports = TrueSkillFactorGraphLayer;
