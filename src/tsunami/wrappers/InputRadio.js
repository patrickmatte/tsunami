tsunami = this.tsunami || {};

(function() {

	tsunami.InputRadio = function(o) {

		o.construct = function() {
			this.modelChangeHandler = this.modelChange.bind(this);
			this.changeHandler = this.changeEvent.bind(this);

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
					this.removeEventListener("change", this.changeHandler);
					this._model.removeEventListener("change", this.modelChangeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.addEventListener("change", this.changeHandler);
					this._model.addEventListener("change", this.modelChangeHandler);
					this.modelChangeHandler();
				} else {
					this.checked = (this._model == this.value);
				}
			} else {
				this.checked = false;
			}
		};

		o.modelChange = function(event) {
			this.checked = (this._model.value == this.value);
		};

		o.changeEvent = function(e) {
			this._model.removeEventListener("change", this.modelChangeHandler);
			this._model.value = this.value;
			this._model.addEventListener("change", this.modelChangeHandler);
		};

		o.construct();

		return o;

	}

}());

