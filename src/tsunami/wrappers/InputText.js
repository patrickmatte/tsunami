tsunami = this.tsunami || {};

(function() {

	tsunami.InputText = function(o) {

		o.construct = function() {
			this.modelChangeHandler = this.modelChange.bind(this);
			this.inputHandler = this.inputEvent.bind(this);

			var modelPath = this.getAttribute("model");
			var model;
			if (modelPath) {
				model = tsunami.evalProperty(modelPath, window);
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
					this.removeEventListener("input", this.inputHandler);
					this._model.removeEventListener("change", this.modelChangeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.addEventListener("input", this.inputHandler);
					this._model.addEventListener("change", this.modelChangeHandler);
					this.modelChangeHandler();
				} else {
					this.value = this._model;
				}
			} else {
				this.value = "";
			}
		};

		o.modelChange = function(event) {
			this.value = this._model.value;
		};

		o.inputEvent = function(e) {
			this._model.removeEventListener("change", this.modelChangeHandler);
			this._model.value = this.value;
			this._model.addEventListener("change", this.modelChangeHandler);
		};

		o.construct();

		return o;

	}

}());

