(function() {

	tsunami.Noun = function(o, scope) {

		o.construct = function() {
			this.modelChangeBind = this.modelChange.bind(this);
			this.plural = this.getAttribute("data-plural");
			this.singular = this.getAttribute("data-singular");
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
				if (this._model instanceof tsunami.Number) {
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Number) {
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					if (this._model > 1){
						this.innerHTML = this.plural;
					} else {
						this.innerHTML = this.singular;
					}
				}
			}
		};

		o.modelChange = function(event) {
			if (this._model.value > 1){
				this.innerHTML = this.plural;
			} else {
				this.innerHTML = this.singular;
			}
		};

		o.destroy = function() {
			this.model = null;
		};

		o.construct();

		return o;

	};

}());

