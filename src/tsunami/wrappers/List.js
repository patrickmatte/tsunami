tsunami = this.tsunami || {};

(function() {

	tsunami.List = function(o) {

		o.construct = function() {
			this.elements = [];

			var script = this.querySelector(".template");
			if (script) {
				this.template = script.text;
				script.parentNode.removeChild(script);
			}
			var array = eval(this.getAttribute("model"));
			if (array && this.template) {
				this.model = array;
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
			this._removeElements();
			this._model = value;
			this._addElements();
			if (this._model) {
				if (this._model.isData) {
					this._model.addEventListener("add", this.modelChange.bind(this));
					this._model.addEventListener("remove", this.modelChange.bind(this));
					this._model.addEventListener("change", this.modelChange.bind(this));
				}
			}
		};

		o._removeElements = function() {
			console.log("_removeElements");
			for (var i = 0; i < this.elements.length; i++) {
				var oldElement = this.elements[i];
				oldElement.model = null;
				if (oldElement.parentNode) {
					oldElement.parentNode.removeChild(oldElement);
				}
			}
			this.elements = [];
		};

		o._addElements = function() {
			console.log("_addElements", this._model.value);
			for (var i = 0; i < this._model.value.length; i++) {
				var model = this._model.item(i);
				var element = tsunami.createElement(this.template, this, "wrapper", model, i);
				this.elements.push(element);
			}
		};

		o.modelChange = function(event) {
			console.log("modelChange", event.type);
			this._removeElements();
			this._addElements();
		};

		o.construct();

		return o;

	};

}());

