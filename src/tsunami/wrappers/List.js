tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(o) {

		o.construct = function() {

			this.changeHandler = this.modelChange.bind(this);
			this.elements = [];

			var templateSelector = this.getAttribute("template");
			var script;
			if (templateSelector) {
				script = document.querySelector(templateSelector);
			}
			if (script) {
				this.template = script.text;
				//script.parentNode.removeChild(script);
			}
			var modelPath = this.getAttribute("model");
			var model;
			if (modelPath) {
				model = eval(modelPath);
			}
			if (model && this.template) {
				this.model = model;
			}
		};

		Object.defineProperty(o, 'model', {
			get: function() {
				return this.getModel();
			},
			set: function(value) {
				this.setModel(value);
			}
		});

		o.getModel = function() {
			return this._model;
		};

		o.setModel = function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Array) {
					this._model.removeEventListener("add", this.changeHandler);
					this._model.removeEventListener("remove", this.changeHandler);
					this._model.removeEventListener("change", this.changeHandler);
				}
			}
			this._removeElements();
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Array) {
					this._model.addEventListener("add", this.changeHandler);
					this._model.addEventListener("remove", this.changeHandler);
					this._model.addEventListener("change", this.changeHandler);
					this._addElements(this._model.value);
				} else {
					this._addElements(this._model);
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
				var element = tsunami.createElement(this.template, this, "wrapper", model, i);
				this.elements.push(element);
			}
		};

		o.modelChange = function(event) {
			this._removeElements();
			this._addElements(this._model.value);
		};

		o.construct();

		return o;

	};

}());

