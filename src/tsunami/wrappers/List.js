tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(o, scope) {

		o.construct = function() {
			this.providerChangeBind = this.providerChange.bind(this);
			this.elements = [];

			var templatePath = this.getAttribute("data-template");
			if (templatePath) {
				this.template = tsunami.evalProperty(templatePath, window);
			}

			var providerPath = this.getAttribute("data-provider");
			var provider;
			if (providerPath) {
				provider = eval(providerPath);
			}
			if (provider) {
				this.provider = provider;
			}
		};

		Object.defineProperty(o, 'provider', {
			get: function() {
				return this.getProvider();
			},
			set: function(value) {
				this.setProvider(value);
			}
		});

		o.getProvider = function() {
			return this._provider;
		};

		o.setProvider = function(value) {
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
		};

		o._removeElements = function() {
			for (var i = 0; i < this.elements.length; i++) {
				var oldElement = this.elements[i];
				oldElement.model = null;
				if (oldElement.parentNode) {
					oldElement.parentNode.removeChild(oldElement);
				}
			}
			this.elements = [];
		};

		o._addElements = function(array) {
			for (var i = 0; i < array.length; i++) {
				var model = array[i];
				var elements = tsunami.append(this.template, this, {model:model, index:i, length:array.length, window:window});
				this.elements = this.elements.concat(elements);
				/*
				for (var j = 0; j < elements.length; j++) {
					var element = elements[j];
					this.elements.push(element);
				}
				*/
			}
		};

		o.providerChange = function(event) {
			this._removeElements();
			this._addElements(this._provider.value);
		};

		o.destroy = function() {
			this.provider = [];
		};

		o.construct();

		return o;

	};

}());

