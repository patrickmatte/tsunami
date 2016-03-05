tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.scope = scope;
		this.providerChangeBind = this.providerChange.bind(this);
		this.children = [];

		var templatePath = this.element.getAttribute("data-template");
		if (templatePath) {
			this.template = tsunami.evalProperty(templatePath, scope);
		}

		var providerPath = this.element.getAttribute("data-provider");
		if (providerPath) {
			this.dataProvider = tsunami.evalProperty(providerPath, scope);
		}
	};

	var p = tsunami.List.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.List;

	Object.defineProperty(p, 'dataProvider', {
		get: function() {
			return this._provider;
		},
		set: function(value) {
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.removeEventListener("add", this.providerChangeBind);
					//this._provider.removeEventListener("remove", this.providerChangeBind);
					this._provider.removeEventListener("change", this.providerChangeBind);
				}
			}
			this._removeElements();
			this._provider = value;
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.addEventListener("add", this.providerChangeBind);
					//this._provider.addEventListener("remove", this.providerChangeBind);
					this._provider.addEventListener("change", this.providerChangeBind);
					this._addElements(this._provider.value);
				} else {
					this._addElements(this._provider);
				}
			}
		}
	});

	p._removeElements = function() {
		for (var i = 0; i < this.children.length; i++) {
			var oldElement = this.children[i];
			oldElement.model = null;
			if (oldElement.parentNode) {
				oldElement.parentNode.removeChild(oldElement);
			}
		}
		this.children = [];
	};

	p._addElements = function(array) {
		for (var i = 0; i < array.length; i++) {
			var model = array[i];
			var elements = tsunami.append(this.template, this.element, {model:model, index:i, length:array.length, window:window, scope:this.scope});
			this.children = this.children.concat(elements);
			/*
			 for (var j = 0; j < elements.length; j++) {
			 var element = elements[j];
			 this.children.push(element);
			 }
			 */
		}
	};

	p.providerChange = function(event) {
		this._removeElements();
		this._addElements(this._provider.value);
	};

	p.destroy = function() {
		this.dataProvider = [];
		tsunami.DisplayObject.destroy.call(this);
	};

}());

