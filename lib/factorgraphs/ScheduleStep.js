/**
 * A single schedule step.
 *
 * @type {*}
 */
var util = require('util');
var Schedule = require('./Schedule');

var ScheduleStep = function(scheduleName, factor, scheduleIndex) {
	ScheduleStep.super_.call(this, scheduleName);

	this.factor = factor;
	this.scheduleIndex = scheduleIndex;
};

util.inherits(ScheduleStep, Schedule);

ScheduleStep.prototype.visit = function(depth, maxDepth) {
	return this.factor.updateMessage(this.scheduleIndex);
};

module.exports = ScheduleStep;
