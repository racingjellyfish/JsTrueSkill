var SMALLEST_PARTIAL_PLAY = 0.0001;

exports.getPartialPlayPercentage = function(player) {
	// If the player doesn't support the interface, assume 1.0 == 100%...
	if (!player.getPartialPlayPercentage) {
		return 1.0;
	}

	// ...otherwise calculate the partial play percentage
	var partialPlayPercentage = player.getPartialPlayPercentage();

	// handle partial play percentage near 0
	if (partialPlayPercentage < SMALLEST_PARTIAL_PLAY) {
		partialPlayPercentage = SMALLEST_PARTIAL_PLAY;
	}

	return partialPlayPercentage;
};
