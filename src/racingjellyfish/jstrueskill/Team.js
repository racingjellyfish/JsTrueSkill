/**
 * Helper class for working with a single team.
 */

/**
 * Constructs a Team and populates it with the specified player.
 *
 * If one or both of the arguments are not supplied an empty Team
 * is created.
 *
 * @param player The player to add
 * @param rating The rating of the player
 */
var Team = function(player, rating) {
	this.players = [];
	this.playerToRatingMap = {};

	if (player !== undefined && rating !== undefined) {
		this.addPlayer(player, rating);
	}
};

/**
 * Adds the player to the team.
 *
 * @param player The player to add
 * @param rating The rating of the player
 * @return The instance of the team (for chaining convenience)
 */
Team.prototype.addPlayer = function(player, rating) {
	this.players.push(player);
	this.playerToRatingMap[player] = rating;

	return this;
};

/**
 * Return the players in this team.
 */
Team.prototype.getPlayers = function() {
	return this.players;
};

/**
 * Return the rating for the specified player.
 */
Team.prototype.getPlayerRating = function(player) {
	return this.playerToRatingMap[player];
};

/**
 * Concatenates multiple teams into an array of teams.
 *
 * The teams should be specified as a comma separated list.
 *
 * @return An array of teams
 */
Team.concat = function() {
	var teamsList = [];

	for (var i = 0; i < arguments.length; i++) {
		teamsList.push(arguments[i]);
	}

	return teamsList;
};

module.exports = Team;
