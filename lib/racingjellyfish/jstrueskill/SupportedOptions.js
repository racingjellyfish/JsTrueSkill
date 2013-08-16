var SupportedOptions = function(option) {
    this.option = option;
};

SupportedOptions.prototype.toString = function() {
    return this.option;
};

SupportedOptions.PartialPlay = new SupportedOptions('PartialPlay');

SupportedOptions.PartialUpdate = new SupportedOptions('PartialUpdate');

module.exports = SupportedOptions;
