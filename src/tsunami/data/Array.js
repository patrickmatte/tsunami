tsunami = this.tsunami || {};

(function() {

	tsunami.Array = function() {
		tsunami.Data.call(this);

		this.length = new tsunami.Number(NaN);
		this._value = [];
		this.push.apply(this, arguments);
	};

	var c = tsunami.Array;

	c.shuffle = function(o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	c.nodeListToArray = function(nodeList) {
		var array = new Array();
		for (var i = 0; i < nodeList.length; i++) {
			array.push(nodeList.item(i));
		}
		return array;
	};
	
	var p = c.prototype = Object.create(tsunami.Data.prototype);

	p.constructor = c;

	p.item = function(index) {
		return this._value[index];
	};
/*
	Object.defineProperty(p, 'length', {
		get: function() {
			return this._value.length;
		}
	});
*/
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
		this.length.value = this._value.length;
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
		this.length.value = this._value.length;
		this.dispatchEvent({type:"remove", value:[element]});
		this.dispatchEvent({type:"change", value:this._value});
		return element;
	};

	p.push = function() {
		var length = this._value.push.apply(this._value, arguments);
		this.length.value = length;
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

	p.reverse = function() {
		this._value.reverse();
		this.dispatchEvent({type:"change", value:this._value});
	};

	p.shift = function() {
		var element = this._value.shift();
		this.length.value = this._value.length;
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
		var added = [];
		for (var i = 2; i < arguments.length; i++) {
			added.push(arguments[i]);
		}
		this.length.value = this._value.length;
		if (elements.length > 0) {
			this.dispatchEvent({type:"remove", value:elements});
		}
		if (added.length > 0) {
			this.dispatchEvent({type:"add", value:added});
		}
		if (elements.length > 0 || added.length > 0) {
			this.dispatchEvent({type:"change", value:this._value});
		}
		return elements;
	};

	p.unshift = function() {
		var length = this._value.unshift.apply(this._value, arguments);
		this.length.value = length;
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
