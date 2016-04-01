tsunami = this.tsunami || {};

(function () {

	tsunami.List = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();
			this._providerChangeBind = this._providerChange.bind(this);
			this.elements = [];
		};

		prototype.setScopeElement = prototype.setScope;

		prototype.setScope = function(value) {
			this.setScopeElement(value);

			this.template = this.getAttribute("data-template");

			var dataProvider = this.getAttribute("data-provider");
			if (dataProvider) {
				this.dataProvider = tsunami.evalProperty(dataProvider, value);
			}

		};

		Object.defineProperty(prototype, 'template', {
			get: function() {
				return this.getTemplate();
			},
			set: function(value) {
				this.setTemplate(value);
			}
		});

		prototype.getTemplate = function() {
			return this._template;
		};

		prototype.setTemplate = function(value) {
			this._template = value;
			this.dataProvider = this.dataProvider;
		};

		Object.defineProperty(prototype, 'dataProvider', {
			get: function() {
				return this.getDataProvider();
			},
			set: function(value) {
				this.setDataProvider(value);
			}
		});

		prototype.getDataProvider = function() {
			return this._provider;
		};

		prototype.setDataProvider = function(value) {
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.removeEventListener("add", this._providerChangeBind);
					//this._provider.removeEventListener("remove", this._providerChangeBind);
					this._provider.removeEventListener("change", this._providerChangeBind);
				}
			}
			this._removeElements();
			this._provider = value;
			if (this._provider) {
				if (this._provider instanceof tsunami.Array) {
					//this._provider.addEventListener("add", this._providerChangeBind);
					//this._provider.addEventListener("remove", this._providerChangeBind);
					this._provider.addEventListener("change", this._providerChangeBind);
					this._addElements(this._provider.value);
				} else {
					this._addElements(this._provider);
				}
			}
			this.model = this.model;
		};

		prototype._removeElements = function() {
			for (var i = 0; i < this.elements.length; i++) {
				var oldElement = this.elements[i];
				oldElement.model = null;
				if (oldElement.parentNode) {
					oldElement.parentNode.removeChild(oldElement);
				}
			}
			this.elements = [];
		};

		prototype._addElements = function(array) {
			for (var i = 0; i < array.length; i++) {
				var scope = {
					model:array[i],
					index:i,
					length:array.length,
					scope:this.scope
				};
				var elements = tsunami.appendTemplate(this.template, this, scope);
				this.elements = this.elements.concat(elements);
			}
		};

		prototype._providerChange = function(event) {
			this._removeElements();
			this._addElements(this._provider.value);
		};

		prototype.destroyElement = prototype.destroy;

		prototype.destroy = function() {
			this.dataProvider = null;
			this.destroyElement();
		};

		return prototype;

	};

}());
