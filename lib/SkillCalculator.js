/**
 * Base class for all skill calculator implementations.
 */
var Guard = require('./Guard');

var SkillCalculator = function(supportedOptions, totalTeamsAllowed,
	playersPerTeamAllowed) {
	this.supportedOptions = supportedOptions;
	this.totalTeamsAllowed = totalTeamsAllowed;
	this.playersPerTeamAllowed = playersPerTeamAllowed;
};

/**
 * Calculates new ratings based on the prior ratings and team ranks.
 *
 * @param gameInfo
 *			Parameters for the game.
 * @param teams
 *			A mapping of team players and their ratings.
 * @param teamRanks
 *			An array of the ranks of the teams where 1 is first place. For a tie,
 *			repeat the number (e.g. 1, 2, 2)
 * @returns All the players and their new ratings.
 */
SkillCalculator.prototype.calculateNewRatings = function(gameInfo, teams, teamRanks) {
	throw new Error('Not implemented');
};

/**
 * Calculates the match quality as the likelihood of all teams drawing.
 *
 * @param gameInfo
 *			Parameters for the game.
 * @param teams
 *			A mapping of team players and their ratings.
 * @returns The quality of the match between the teams as a percentage (0% =
 *			bad, 100% = well matched).
 */
SkillCalculator.prototype.calculateMatchQuality = function(gameInfo, teams) {
	throw new Error('Not implemented');
};

SkillCalculator.prototype.isSupported = function(option) {
	return this.supportedOptions.indexOf(option) != -1;
};

SkillCalculator.prototype.validateTeamCountAndPlayersCountPerTeam = function(teams) {
	return SkillCalculator.validateTeamCountAndPlayersCountPerTeam(teams,
		this.totalTeamsAllowed, this.playersPerTeamAllowed);
};

SkillCalculator.validateTeamCountAndPlayersCountPerTeam = function(teams,
	totalTeams, playersPerTeam) {
	Guard.argumentNotNull(teams, "teams");

	var countOfTeams = 0;
	for (var i = 0; i < teams.length; i++) {
		var currentTeam = teams[i];
		var teamSize = currentTeam.getSize();
		if (!playersPerTeam.isInRange(teamSize)) {
			throw new Error('Team ' + i + ' size: ' + teamSize +
				' is not in the permitted range: ' + playersPerTeam);
		}
		countOfTeams++;
	}

	if (!totalTeams.isInRange(countOfTeams)) {
			throw new Error('Number of teams is not in the permitted ' +
				'range: ' + totalTeams);
	}

	return true;
};

module.exports = SkillCalculator;
