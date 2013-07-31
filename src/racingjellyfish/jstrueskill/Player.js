/**
 * Represents a player who has a {@link Rating}.
 */
var Guard = require('./Guard');

/**
 * The player plays 100% of each game.
 */
var DefaultPartialPlayPercentage = 1.0;

/**
 * The player receives 100% update.
 */
var DefaultPartialUpdatePercentage = 1.0;

/**
 * Constructs a player.
 *
 * @param id The identifier for the player, such as a name
 * @param partialPlayPercentage The weight percentage to give this
 *			player when calculating a new rank
 * @param partialUpdatePercentage Indicates how much of a skill update
 *			a player should receive where 0 represents no update and
 *			1.0 represents 100% of the update
 */
var Player = function(id, partialPlayPercentage, partialUpdatePercentage) {
	if (partialPlayPercentage === undefined) {
		partialPlayPercentage = DefaultPartialPlayPercentage;
	}
	if (partialUpdatePercentage === undefined) {
		partialUpdatePercentage = DefaultPartialUpdatePercentage;
	}

	// If they don't want to give a player an id, that's ok...
	Guard.argumentInRangeInclusive(partialPlayPercentage, 0, 1.0, "partialPlayPercentage");
	Guard.argumentInRangeInclusive(partialUpdatePercentage, 0, 1.0, "partialUpdatePercentage");

	this.id = id;
	this.partialPlayPercentage = partialPlayPercentage;
	this.partialUpdatePercentage = partialUpdatePercentage;
};

Player.prototype.equals = function(other) {
	if (this == other) {
		return true;
	}
	if (other === undefined) {
		return false;
	}
	if (this.id === undefined) {
		if (other.getId() !== undefined) {
			return false;
		}
	} else if (this.id != other.getId()) {
		return false;
	}
	return true;
};

Player.prototype.getId = function() {
	return this.id;
};

Player.prototype.getPartialPlayPercentage = function() {
	return this.partialPlayPercentage;
};

Player.prototype.getPartialUpdatePercentage = function() {
	return this.partialUpdatePercentage;
};

Player.prototype.toString = function() {
	return 'Player: ' + this.id;
};
module.exports = Player;
