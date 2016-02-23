tsunami = this.tsunami || {};

(function() {

	tsunami.InputRadio = function(o) {

		o.construct = function() {
			this.modelChangeBind = this.modelChange.bind(this);
			this.changeBind = this.change.bind(this);

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
					this.removeEventListener("change", this.changeBind);
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.addEventListener("change", this.changeBind);
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
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

		o.change = function(e) {
			this._model.removeEventListener("change", this.modelChangeBind);
			this._model.value = this.value;
			this._model.addEventListener("change", this.modelChangeBind);
		};

		o.destroy = function() {
			this.model = null;
		};

		o.construct();

		return o;

	}

}());

