tsunami = this.tsunami || {};

(function() {

	tsunami.Array = function() {
		this.construct(arguments);
	};

	var p = tsunami.Array.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function(array) {
		this.constructEventDispatcher();

		this.isData = true;

		this.length = new tsunami.Number();

		this._value = [];
		this.push.apply(this, array);
	};

	p.getLength = function() {
		return this._value.length;
	};

	p.setValue = function(value) {
		this._value = value;
		this.length.setValue(this._value.length);
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.getValue = function() {
		return this._value;
	};

	p.indexOf = function(searchElement, fromIndex) {
		return this._value.indexOf(searchElement, fromIndex);
	};

	p.pop = function() {
		var element = this._value.pop();
		this.length.setValue(this._value.length);
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.push = function() {
		var length = this._value.push.apply(this._value, arguments);
		this.length.setValue(length);
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
			this.dispatchEvent({type:"change", value:this._value});
		}
		return this._value.length;
	};

	p.reverse = function() {
		this._value.reverse();
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.shift = function() {
		var element = this._value.shift();
		this.length.setValue(this._value.length);
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.sort = function(compareFunction) {
		this._value.sort(compareFunction);
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.splice = function() {
		var elements = this._value.splice.apply(this._value, arguments);
		if (elements.length > 0) {
			this.dispatchEvent({type:"remove", value:elements});
		}
		var added = [];
		for (var i = 2; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		this.length.setValue(this._value.length);
		if (added.length > 0) {
			this.dispatchEvent({type:"remove", value:elements});
		}
		if (elements.length > 0 || added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		return elements;
	};

	p.unshift = function() {
		var length = this._value.unshift.apply(this._value, arguments);
		this.length.setValue(length);
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
			this.dispatchEvent({type:"change", value:this._value});
		}
		return length;
	};

	p.includes = function(element) {
		var index = this._value.indexOf(element);
		return (index != -1);
	};

}());
