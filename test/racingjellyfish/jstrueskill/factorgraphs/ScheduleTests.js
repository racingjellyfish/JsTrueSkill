var Schedule = require('../../../../lib/racingjellyfish/jstrueskill/factorgraphs/Schedule');

exports.testConstructor = function(test) {
	var schedule = new Schedule('ScheduleTest');

	test.ok(schedule !== undefined, "Expected valid object");

	test.done();
};

exports.testHasValidName = function(test) {
	var schedule = new Schedule('ScheduleTest');

	test.ok(schedule.toString() !== undefined, "Expected valid name");
	test.ok(schedule.toString().trim().length !== 0, "Expected valid name");

	test.done();
};

exports.testInvalidNameThrows = function(test) {
	test.throws(( function() {new Schedule();} ), "Expected undefined name to throw");
	test.throws(( function() {new Schedule('');} ), "Expected empty name to throw");
	test.throws(( function() {new Schedule(' ');} ), "Expected space name to throw");
	test.throws(( function() {new Schedule({});} ), "Expected space name to throw");

	test.done();
};
