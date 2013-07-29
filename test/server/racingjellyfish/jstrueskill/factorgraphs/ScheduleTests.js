var Schedule = require('../../../../../src/racingjellyfish/jstrueskill/factorgraphs/Schedule');

exports.testConstructor = function(test) {
	var schedule = new Schedule('ScheduleTest');

	test.ok(schedule !== undefined, "Expected valid object");

	test.done();
};
