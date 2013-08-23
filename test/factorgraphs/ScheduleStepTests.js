var ScheduleStep = require('../../lib/factorgraphs/ScheduleStep');

exports.testConstructor = function(test) {
	var scheduleStep = new ScheduleStep('ScheduleStepTest', {}, 0);

	test.ok(scheduleStep !== undefined, "Expected valid object");

	test.done();
};
