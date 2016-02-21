tsunami = this.tsunami || {};

(function() {

	tsunami.DataBind = function(o) {

		o.construct = function() {
			this.changeHandler = this.modelChange.bind(this);

			var modelPath = this.getAttribute("data-model");
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
					this._model.removeEventListener("change", this.changeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.addEventListener("change", this.changeHandler);
					this.changeHandler();
				} else {
					this.innerHTML = this._model;
				}
			} else {
				this.innerHTML = "";
			}
		};

		o.modelChange = function(event) {
			this.innerHTML = this._model.value;
		};

		o.construct();

		return o;

	}

}());

