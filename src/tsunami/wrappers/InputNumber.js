tsunami = this.tsunami || {};

(function() {

	tsunami.InputNumber = function(o, scope) {

		o.construct = function() {
			this.modelChangeBind = this.modelChange.bind(this);
			this.inputBind = this.input.bind(this);

			console.log("scope", scope);

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
					this.removeEventListener("input", this.inputBind);
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.addEventListener("input", this.inputBind);
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					this.value = this._model;
				}
			} else {
				this.value = NaN;
			}
		};

		o.modelChange = function(event) {
			this.value = this._model.value;
		};

		o.input = function(e) {
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

