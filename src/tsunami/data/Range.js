tsunami = this.tsunami || {};

(function() {

	tsunami.Range = function(value, min, max) {
		this.construct(value, min, max);
	};

	var p = tsunami.Range.prototype = new tsunami.Number();

	p.constructor = tsunami.RangeNumber;

	p.constructNumber = p.construct;

	p.construct = function(value, min, max) {

		this.min = new tsunami.Number(min);
		this.max = new tsunami.Number(max);

		this.constructNumber(value);

		this.value = value;
	};

	p.setNumberValue = p.setValue;

	p.setValue = function(value) {
		value = Math.max(this.min.value, value);
		value = Math.min(this.max.value, value);
		this.setNumberValue(value);
	};

}());



