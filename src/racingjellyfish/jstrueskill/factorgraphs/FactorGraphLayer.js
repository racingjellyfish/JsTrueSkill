var util = require('util');
var Factor = require('./Factor');
var FactorGraphLayerBase = require('./FactorGraphLayerBase');

var FactorGraphLayer = function(parentGraph) {
	FactorGraphLayerBase.call(this);

	this.parentGraph = parentGraph;

	this.localFactors = [];
	this.inputVariablesGroups = [];
	this.outputVariablesGroups = [];
};

FactorGraphLayer.prototype = new FactorGraphLayerBase();

FactorGraphLayer.prototype.getParentFactorGraph = function() {
	return this.parentGraph;
};

FactorGraphLayer.prototype.setParentFactorGraph = function(parentGraph) {
	this.parentGraph = parentGraph;
};

FactorGraphLayer.prototype.getLocalFactors = function() {
	return this.localFactors;
};

FactorGraphLayer.prototype.addLocalFactor = function(factor) {
	this.localFactors.push(factor);
};

FactorGraphLayer.prototype.getInputVariablesGroups = function() {
	return this.inputVariablesGroups;
};

FactorGraphLayer.prototype.setInputVariablesGroups = function(groups) {
	this.inputVariablesGroups = groups;
};

FactorGraphLayer.prototype.getOutputVariablesGroups = function() {
	return this.outputVariablesGroups;
};

FactorGraphLayer.prototype.addOutputVariableGroup = function(group) {
	this.outputVariablesGroups.push(group);
};

FactorGraphLayer.prototype.addOutputVariable = function(variable) {
	var group = [variable];
	this.addOutputVariableGroup(group);
};

FactorGraphLayer.prototype.getScheduleSequence = function(itemsToSequence,
	nameTemplate, templateArgs) {
	/** The name of the schedule */
	var scheduleName = "Schedule[Default]";
	if (templateArgs === undefined) {
		scheduleName = "Schedule[" + nameTemplate + "]";
	} else {
		scheduleName = "Schedule[" + util.format(nameTemplate, templateArgs) + "]";
	}

	return new ScheduleSequence(scheduleName, itemsToSequence);
};

module.exports = FactorGraphLayer;
