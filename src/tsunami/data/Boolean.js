tsunami = this.tsunami || {};

(function() {

	tsunami.Boolean = function(value) {
		tsunami.Model.call(this);
		this.value = value;
	};

	var p = tsunami.Boolean.prototype = Object.create(tsunami.Model.prototype);

	p.constructor = tsunami.Boolean;

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



