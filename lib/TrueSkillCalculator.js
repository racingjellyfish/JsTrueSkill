/**
 * Helper class for calculating a TrueSkill rating using a
 * {@link FactorGraphTrueSkillCalculator}.
 */
var GameInfo = require('./GameInfo');
var Rating = require('./Rating');
var FactorGraphTrueSkillCalculator = require('./trueskill/FactorGraphTrueSkillCalculator');

// Keep a singleton around
var calculator = new FactorGraphTrueSkillCalculator();

/**
 * Calculates new ratings based on the prior ratings and team ranks.
 *
 * @param gameInfo Parameters for the game
 * @param teams A mapping of team players and their ratings
 * @param teamRanks An array of the ranks of the teams where 1 is
 *            first place, for a tie, repeat the number (e.g. 1, 2, 2)
 * @return All the players and their new ratings
 */
exports.calculateNewRatings = function(gameInfo, teams, teamRanks) {
	// Delegate the work to the full implementation
	return calculator.calculateNewRatings(gameInfo, teams, teamRanks);
};

/**
 * Calculates the match quality as the likelihood of all teams drawing.
 *
 * @param gameInfo Parameters for the game
 * @param teams A mapping of team players and their ratings
 * @return The match quality as a percentage (between 0.0 and 1.0)
 */
exports.calculateMatchQuality = function(gameInfo, teams) {
	// Delegate the work to the full implementation
	return calculator.calculateMatchQuality(gameInfo, teams);
};
