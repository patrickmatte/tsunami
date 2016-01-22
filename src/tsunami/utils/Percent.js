this.utils = this.utils || {};

(function() {

	utils.Percent = function(percentage, isDecimalPercentage) {
		this.constructor(percentage, isDecimalPercentage);
	}
	
	var p = utils.Percent.prototype;
	
	p.constructor = function(percentage, isDecimalPercentage) {
		if (isDecimalPercentage) {
			this.setDecimalPercentage = percentage;
		} else {
			this.setPercentage = percentage;
		}
	}
	
	p.getPercentage = function() {
		return 100 * this._percent;
	}
	
	p.setPercentage = function(percent) {
		this._percent = percent * .01;
	}
	
	p.getDecimalPercentage = function() {
		return this._percent;
	}
	
	p.setDecimalPercentage = function(percent) {
		this._percent = percent;
	}
	
	p.equals = function(percent) {
		return this.decimalPercentage == percent.decimalPercentage;
	}
	
	p.clone = function() {
		return new utils.Percent(this.decimalPercentage);
	}
	
	p.valueOf = function() {
		return this.decimalPercentage;
	}
	
	p.toString = function() {
		return this.decimalPercentage.toString();
	}
	
}());
