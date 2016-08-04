(function() {

	tsunami.String = function(value) {
		tsunami.Data.call(this);

		this.value = value;
	};

	var c = tsunami.String;

	c.capitalize = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	var p = c.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = c;

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



