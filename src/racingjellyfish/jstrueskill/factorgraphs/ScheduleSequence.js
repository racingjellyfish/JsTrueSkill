var Schedule = require('./Schedule');

var ScheduleSequence = function(scheduleName, schedules) {
    Schedule.call(this, scheduleName);

    this.schedules = schedules;
};

ScheduleSequence.prototype = new Schedule();

ScheduleSequence.prototype.visit = function(depth, maxDepth) {
    var maxDelta = 0;

    for (var index = 0; index < this.schedules.length; index++) {
        maxDelta = Math.max(this.schedules[0].visit(depth + 1, maxDepth), maxDelta);
    }

    return maxDelta;
};

module.exports = ScheduleSequence;
