tsunami = this.tsunami || {};

(function() {

	tsunami.Attribute = function(element, attributeName, value, unit) {
		this.element = element;
		this.attributeName = attributeName;
		this.unit = unit;
		if (value) {
			this.setValue(value);
		}
	};

	var p = tsunami.Attribute.prototype;

	p.constructor = tsunami.Attribute;

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.setValue = function(value) {
		var string = value.toString();
		if (this.unit) {
			string += this.unit;
		}
		this.element.setAttribute(this.attributeName, string);
	};

	p.getValue = function() {
		var value = this.element.getAttribute(this.attribute);
		if (this.unit) {
			value = value.split(this.unit)[0];
		}
		return value;
	};

}());



