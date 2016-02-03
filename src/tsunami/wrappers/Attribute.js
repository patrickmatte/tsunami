tsunami = this.tsunami || {};

(function() {

	tsunami.Attribute = function(element, attributeName, value, unit) {
		this.construct(element, attributeName, value, unit);
	};

	var p = tsunami.Attribute.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function(element, attributeName, value, unit) {
		this.constructEventDispatcher();
		this.element = element;
		this.attributeName = attributeName;
		this.unit = unit;
		if (value) {
			this.setValue(value);
		}
	};

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
		this.dispatchEvent({type:"change", value:value});
	};

	p.getValue = function() {
		var value = this.element.getAttribute(this.attribute);
		if (this.unit) {
			value = value.split(this.unit)[0];
		}
		return value;
	};

}());



