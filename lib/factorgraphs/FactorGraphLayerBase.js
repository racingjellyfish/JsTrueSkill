/**
 * Abstract base class for factor graph layers.
 *
 * @constructor
 */
var FactorGraphLayerBase = function() {
};

/**
 * Base implementation for creating a prior schedule.
 *
 * @returns {null}
 */
FactorGraphLayerBase.prototype.createPriorSchedule = function() {
	return null;
};

/**
 * Base implementation for creating a posterior schedule.
 *
 * @returns {null}
 */
FactorGraphLayerBase.prototype.createPosteriorSchedule = function() {
	return null;
};

module.exports = FactorGraphLayerBase;
