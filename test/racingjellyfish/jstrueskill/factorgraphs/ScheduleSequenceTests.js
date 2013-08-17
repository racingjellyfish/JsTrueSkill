var ScheduleSequence = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/ScheduleSequence');

exports.testConstructor = function(test) {
	var scheduleSequence = new ScheduleSequence('ScheduleSequenceTest', {}, 0);

	test.ok(scheduleSequence !== undefined, "Expected valid object");

	test.done();
};
