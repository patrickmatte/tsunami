tsunami = this.tsunami || {};

(function() {

	tsunami.String = function(value) {
		tsunami.Model.call(this);

		this.value = value;
	};

	var p = tsunami.String.prototype = Object.create(tsunami.Model.prototype);

	p.constructor = tsunami.String;

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
			this._value = value.toString();
			this.dispatchEvent({type:"change", value:this._value});
		}
	};

	p.toString = function() {
		return this.getValue();
	};

}());



