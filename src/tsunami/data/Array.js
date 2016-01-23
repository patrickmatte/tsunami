tsunami = this.tsunami || {};

(function() {

	tsunami.Array = function() {
		this.construct(arguments);
	};

	var p = tsunami.Array.prototype = new tsunami.EventDispatcher();

	p.constructor = tsunami.Array;

	p.constructEventDispatcher = p.construct;

	p.construct = function(array) {
		this.constructEventDispatcher();

		this.isData = true;

		this._value = [];
		this.push.apply(this, array);
	};

	p.item = function(index) {
		return this._value[index];
	};


	Object.defineProperty(p, 'length', {
		get: function() {
			return this._value.length;
		}
	});

	Object.defineProperty(p, 'value', {
		get: function() {
			return this.getValue();
		},
		set: function(value) {
			this.setValue(value);
		}
	});

	p.setValue = function(value) {
		this._value = value;
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
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.push = function() {
		var length = this._value.push.apply(this._value, arguments);
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		return length;
	};

	p.reverse = function() {
		this._value.reverse();
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.shift = function() {
		var element = this._value.shift();
		this.dispatchEvent({type:"remove", value:[element]});
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

		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		return elements;
	};

	p.unshift = function() {
		var length = this._value.unshift.apply(this._value, arguments);
		var added = [];
		for (var i = 0; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		return length;
	};

	p.includes = function(element) {
		var index = this._value.indexOf(element);
		return (index != -1);
	};

	p.join = function() {
		return this._value.join.apply(this._value, arguments);
	};

	p.concat = function() {
		return this._value.concat.apply(this._value, arguments);
	};

	p.slice = function() {
		return this._value.slice.apply(this._value, arguments);
	};

	p.toString = function() {
		return this.getValue().toString();
	};

}());
