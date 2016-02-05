(function() {

	tsunami.Switch = function(o) {

		o.construct = function() {
			this.changeHandler = this.modelChange.bind(this);

			this.caseElements = {};

			this.defaultElement = this.querySelector(".default");

			this.hideElement(this.defaultElement);

			var cases = this.querySelectorAll(".case");
			for (var i = 0; i < cases.length; i++) {
				var element = cases.item(i);
				var val = element.getAttribute("val");
				if (val) {
					this.caseElements[val] = element;
				}
				this.hideElement(element);
			}

			var modelPath = this.getAttribute("model");
			var model;
			if (modelPath) {
				model = eval(modelPath);
			}
			if (model) {
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
				if (this._model instanceof tsunami.Model) {
					this._model.removeEventListener("change", this.changeHandler);
				}
			}
			this._model = value;

			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.addEventListener("change", this.changeHandler);
					this.changeHandler();
				} else {
					this.switchValue(this._model);
				}
			}
		};

		o.modelChange = function(event) {
			this.switchValue(this._model.value);
		};

		o.switchValue = function(value) {
			value = value.toString();

			this.hideElement(this.selectedElement);
			this.selectedElement = this.caseElements[value] || this.defaultElement;
			this.showElement(this.selectedElement);
		};

		o.hideElement = function(element) {
			if (element) {
				if (element.parentNode) {
					element.parentNode.removeChild(element);
				}
			}
		};

		o.showElement = function(element) {
			if (element) {
				this.appendChild(element);
			}
		};

		o.construct();

		return o;

	}

}());
