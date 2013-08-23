var ScheduleLoop = require('../../lib/factorgraphs/ScheduleLoop');

exports.testConstructor = function(test) {
	var scheduleLoop = new ScheduleLoop('ScheduleLoopTest', {}, 0);

	test.ok(scheduleLoop !== undefined, "Expected valid object");

	test.done();
};

exports.testVisit = function(test) {
	var scheduleToLoop = {
		visit: function() {
			return 0.5;
		}
	};
	var scheduleLoop = new ScheduleLoop('ScheduleLoopTest', scheduleToLoop, 1);

	var expected = 0.5;
	test.equal(scheduleLoop.visit(), expected, "Expected delta to be: " + expected);

	test.done();
};

exports.testVisitThrowsForMaxIterations = function(test) {
	var scheduleToLoop = {
		visit: function() {
			return 1.5;
		}
	};
	var scheduleLoop = new ScheduleLoop('ScheduleLoopTest', scheduleToLoop, 1);

	test.throws(( function() { scheduleLoop.visit(); } ), "Expected visit to throw");

	test.done();
};
