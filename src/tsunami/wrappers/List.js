tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(o) {

		o.construct = function() {
			this.providerChangeHandler = this.providerChange.bind(this);
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
			if (provider && this.template) {
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
					this._provider.removeEventListener("add", this.providerChangeHandler);
					this._provider.removeEventListener("remove", this.providerChangeHandler);
					this._provider.removeEventListener("change", this.providerChangeHandler);
				}
			}
			this._removeElements();
			this._provider = value;
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					this._provider.addEventListener("add", this.providerChangeHandler);
					this._provider.addEventListener("remove", this.providerChangeHandler);
					this._provider.addEventListener("change", this.providerChangeHandler);
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
				var elements = tsunami.append(this.template, this, {index:i, model:model, window:window});
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

		o.construct();

		return o;

	};

}());

