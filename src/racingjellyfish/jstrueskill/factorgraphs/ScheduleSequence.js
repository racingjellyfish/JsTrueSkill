var util = require('util');
var Schedule = require('./Schedule');

var ScheduleSequence = function(scheduleName, schedules) {
	ScheduleSequence.super_.call(this, scheduleName);

    this.schedules = schedules;
};

util.inherits(ScheduleSequence, Schedule);

ScheduleSequence.prototype.visit = function(depth, maxDepth) {
    var maxDelta = 0;

    for (var index = 0; index < this.schedules.length; index++) {
        maxDelta = Math.max(this.schedules[index].visit(depth + 1, maxDepth), maxDelta);
    }

    return maxDelta;
};

module.exports = ScheduleSequence;
