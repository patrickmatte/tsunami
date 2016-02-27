tsunami = this.tsunami || {};

(function() {

	tsunami.DataBind = function(o, scope) {

		o.construct = function() {
			this.modelChangeBind = this.modelChange.bind(this);

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
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
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

		o.destroy = function() {
			this.model = null;
		};

		o.construct();

		return o;

	}

}());

