var Player = require('../../../lib/racingjellyfish/jstrueskill/Player');

exports.testBasicValues = function(test) {
	var player = new Player('One');

	var expected = 'One';
	test.equal(player.getId(), expected, 'Expected getId() to be ' + expected);
	expected = 1.0;
	test.equal(player.getPartialPlayPercentage(), expected,
		'Expected getPartialPlayPercentage() to be ' + expected);
	test.equal(player.getPartialUpdatePercentage(), expected,
		'Expected getPartialUpdatePercentage() to be ' + expected);
	expected = 'Player: One';
	test.equal(player.toString(), expected, 'Expected toString() to be ' + expected);

	test.done();
};

exports.testNonDefaultValues = function(test) {
	var player = new Player('One', 0.5, 0.6);

	var expected = 0.5;
	test.equal(player.getPartialPlayPercentage(), expected,
		'Expected getPartialPlayPercentage() to be ' + expected);
	expected = 0.6;
	test.equal(player.getPartialUpdatePercentage(), expected,
		'Expected getPartialUpdatePercentage() to be ' + expected);

	test.done();
};
