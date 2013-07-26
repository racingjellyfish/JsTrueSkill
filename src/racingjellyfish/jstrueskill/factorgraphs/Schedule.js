var Schedule = function(scheduleName) {
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
