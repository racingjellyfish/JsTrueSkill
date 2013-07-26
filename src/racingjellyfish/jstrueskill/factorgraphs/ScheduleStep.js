var ScheduleStep = function(scheduleName, factor, scheduleIndex) {
	Schedule.call(this, scheduleName);

	this.factor = factor;
	this.scheduleIndex = scheduleIndex;
};

ScheduleStep.prototype.visit = function(depth, maxDepth) {
	return this.factor.updateMessage(this.scheduleIndex);
};

ScheduleStep.prototype = new Schedule();

module.exports = ScheduleStep;
