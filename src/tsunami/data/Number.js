tsunami = this.tsunami || {};

(function() {

	tsunami.Number = function(value) {
		tsunami.Model.call(this);

		this.value = value;
	};

	var p = tsunami.Number.prototype = Object.create(tsunami.Model.prototype);

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

}());



