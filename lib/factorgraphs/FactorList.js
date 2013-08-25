/**
 * Helper class for computing the factor graph's normalization constant.
 */
var FactorList = function() {
	this.factors = [];
};

FactorList.prototype.getSize = function() {
	return this.factors.length;
};

FactorList.prototype.addFactor = function(factor) {
	this.factors.push(factor);
	return factor;
};

FactorList.prototype.getLogNormalization = function() {
	// TODO can these 3 loops be rolled into 1?
	for (var factorIndex = 0; factorIndex < this.getSize(); factorIndex++) {
		this.factors[factorIndex].resetMarginals();
	}

	var sumLogZ = 0.0;
	for (factorIndex = 0; factorIndex < this.getSize(); factorIndex++) {
		var factor = this.factors[factorIndex];
		for (var msgIndex = 0; msgIndex < factor.getNumberOfMessages(); msgIndex++)
			sumLogZ += factor.sendMessage(msgIndex);
	}

	var sumLogS = 0.0;
	for (factorIndex = 0; factorIndex < this.getSize(); factorIndex++) {
		sumLogS += this.factors[factorIndex].getLogNormalization();
	}

	return sumLogZ + sumLogS;
};

module.exports = FactorList;
