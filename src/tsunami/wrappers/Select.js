tsunami = this.tsunami || {};

(function() {

	tsunami.Select = function(o, scope) {

		tsunami.List(o, scope);

		o.construct = function() {
			this.modelChangeHandler = this.modelChange.bind(this);
			this.inputHandler = this.input.bind(this);

			var modelPath = this.getAttribute("data-model");
			var model;
			if (modelPath) {
				model = tsunami.evalProperty(modelPath, scope);
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

		o.input = function(e) {
			this._model.removeEventListener("change", this.modelChangeHandler);
			this._model.value = this.value;
			this._model.addEventListener("change", this.modelChangeHandler);
		};

		o.destroyList = o.destroy;

		o.destroy = function() {
			this.destroyList();
			this.model = null;
		};

		o.construct();

		return o;

	}

}());

