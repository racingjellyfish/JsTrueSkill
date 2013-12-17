/**
 * A representation of a layer in a factor graph.
 *
 * @type {exports}
 */
var util = require('util');
var Factor = require('./Factor');
var FactorGraphLayerBase = require('./FactorGraphLayerBase');
var ScheduleSequence = require('./ScheduleSequence');

/**
 * Constructor wrapping a parent factor graph.
 *
 * @param parentGraph factor graph to wrap
 * @constructor
 */
var FactorGraphLayer = function(parentGraph) {
	FactorGraphLayer.super_.call(this);

	this.parentGraph = parentGraph;

	this.localFactors = [];
	this.inputVariablesGroups = [];
	this.outputVariablesGroups = [];
};

util.inherits(FactorGraphLayer, FactorGraphLayerBase);

/**
 * Return the parent factor graph.
 *
 * @returns {*}
 */
FactorGraphLayer.prototype.getParentFactorGraph = function() {
	return this.parentGraph;
};

/**
 * Set the parent factor graph.
 *
 * @param parentGraph
 */
FactorGraphLayer.prototype.setParentFactorGraph = function(parentGraph) {
	this.parentGraph = parentGraph;
};

/**
 * Return the array of factors comprising this graph layer.
 *
 * @returns {Array}
 */
FactorGraphLayer.prototype.getLocalFactors = function() {
	return this.localFactors;
};

/**
 * Add a factor to this graph layer.
 *
 * @param factor
 */
FactorGraphLayer.prototype.addLocalFactor = function(factor) {
	this.localFactors.push(factor);
};

/**
 * Return the input variable groups for this layer.
 *
 * @returns {Array}
 */
FactorGraphLayer.prototype.getInputVariablesGroups = function() {
	return this.inputVariablesGroups;
};

/**
 * Set the input variable groups for this layer.
 *
 * @param groups
 */
FactorGraphLayer.prototype.setInputVariablesGroups = function(groups) {
	this.inputVariablesGroups = groups;
};

/**
 * Return the output variable groups for this layer.
 *
 * @returns {Array}
 */
FactorGraphLayer.prototype.getOutputVariablesGroups = function() {
	return this.outputVariablesGroups;
};

/**
 * Add the specified output variable group to this layer.
 *
 * @param group
 */
FactorGraphLayer.prototype.addOutputVariableGroup = function(group) {
	this.outputVariablesGroups.push(group);
};

/**
 * Add the specified variable as a new output variable group.
 *
 * @param variable
 */
FactorGraphLayer.prototype.addOutputVariable = function(variable) {
	var group = [variable];
	this.addOutputVariableGroup(group);
};

/**
 * Create a schedule sequence from the specified items.
 *
 * @param itemsToSequence
 * @param nameTemplate
 * @param templateArgs
 * @returns {ScheduleSequence}
 */
FactorGraphLayer.prototype.createScheduleSequence = function(itemsToSequence, nameTemplate, templateArgs) {
	/** The name of the schedule */
	var scheduleName = "Schedule[Default]";
	if (templateArgs === undefined) {
		scheduleName = "Schedule[" + nameTemplate + "]";
	} else {
		scheduleName = "Schedule[" + util.format(nameTemplate, templateArgs) + "]";
	}

	return new ScheduleSequence(scheduleName, itemsToSequence);
};

/**
 * Add the specified factor to this layer.
 *
 * @param factor
 */
FactorGraphLayer.prototype.addLayerFactor = function(factor) {
	this.localFactors.push(factor);
};

module.exports = FactorGraphLayer;
