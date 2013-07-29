var FactorGraph = require('../factorgraphs/FactorGraph');
var GaussianPriorFactor = require('./factors/GaussianPriorFactor');

var TrueSkillFactorGraph = function(parentGraph, teams) {
    FactorGraph.call(this, parentGraph);

    this.teams = teams;
};

TrueSkillFactorGraph.prototype = new FactorGraph();

module.exports = TrueSkillFactorGraph;
