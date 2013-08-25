/**
 * A schedule loop with a check to prevent infinite loops.
 *
 * @type {*}
 */
var util = require('util');
var Schedule = require('./Schedule');

var MAX_ITERATIONS = 100;

var ScheduleLoop = function(scheduleName, scheduleToLoop, maxDelta) {
	ScheduleLoop.super_.call(this, scheduleName);

	this.scheduleToLoop = scheduleToLoop;
	this.maxDelta = maxDelta;
};

util.inherits(ScheduleLoop, Schedule);

ScheduleLoop.prototype.visit = function(depth, maxDepth) {
	var delta = this.scheduleToLoop.visit(depth + 1, maxDepth);
	for (var totalIterations = 1; delta > this.maxDelta; totalIterations++) {
		delta = this.scheduleToLoop.visit(depth + 1, maxDepth);
		if (totalIterations > MAX_ITERATIONS)
			throw new Error(util.format(
					"Maximum iterations %s reached.", MAX_ITERATIONS));
	}

	return delta;
};

module.exports = ScheduleLoop;
