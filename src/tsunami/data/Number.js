tsunami = this.tsunami || {};

(function() {

	tsunami.Number = function(value, modifiers) {
		tsunami.Data.call(this);
		this.modifiers = modifiers || [];
		this.value = value;
	};

	var p = tsunami.Number.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = tsunami.Number;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.getValue = function() {
		return this._value;
	};

	p.setValue = function(value) {
		for (var i = 0; i < this.modifiers.length; i++) {
			var modifier = this.modifiers[i];
			value = modifier.modify(value);
		}
		if (value != this._value) {
			this._value = eval(value);
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.add = function(value) {
		this.setValue(this._value + value);
	};

	p.subtract = function(value) {
		this.setValue(this._value - value);
	};

	p.toString = function() {
		return this.getValue().toString();
	};

	tsunami.Number.Max = function(maxValue) {
		this.maxValue = maxValue;
	};

	tsunami.Number.Max.prototype.modify = function(value) {
		return Math.min(value, this.maxValue);
	};

	tsunami.Number.Min = function(minValue) {
		this.minValue = minValue;
	};

	tsunami.Number.Min.prototype.modify = function(value) {
		return Math.max(value, this.minValue);
	};

}());
