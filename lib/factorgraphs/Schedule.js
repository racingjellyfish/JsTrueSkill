/**
 * A schedule for processing messages being passed through a factor graph.
 *
 * @param scheduleName
 * @constructor
 */
var Schedule = function(scheduleName) {
	if (!scheduleName || typeof scheduleName != 'string' ||
		scheduleName.trim().length === 0) {
		throw new Error('Invalid schedule name: ' + scheduleName);
	}
	this.scheduleName = scheduleName;
};

Schedule.prototype.visit = function() {
	if (arguments > 0) {
		// TODO sub-classes need to implement this?
		throw new Error('UnsupportedOperationException');
	}

	return this.visit(-1, 0);
};

Schedule.prototype.toString = function() {
	return this.scheduleName;
};

module.exports = Schedule;
