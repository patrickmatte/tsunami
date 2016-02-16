tsunami = this.tsunami || {};

(function() {

	tsunami.Boolean = function(value) {
		this.construct(value);
	};

	var p = tsunami.Boolean.prototype = new tsunami.Model();

	p.constructor = tsunami.Boolean;

	p.constructModel = p.construct;

	p.construct = function(value) {
		this.constructModel();

		this.value = value;
	};

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
		value = eval(value);
		if (value != this._value) {
			this._value = value;
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());



