/**
 * Abstract base class for factor graph layers.
 *
 * @constructor
 */
var FactorGraphLayerBase = function() {
};

FactorGraphLayerBase.prototype.createPriorSchedule = function() {
  return null;
};

FactorGraphLayerBase.prototype.createPosteriorSchedule = function() {
  return null;
};

module.exports = FactorGraphLayerBase;
