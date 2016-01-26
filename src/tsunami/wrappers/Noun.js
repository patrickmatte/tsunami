(function() {

	tsunami.Noun = function(o) {

		o.construct = function() {
			this.changeHandler = this.modelChange.bind(this);
			this.plural = this.getAttribute("plural");
			this.singular = this.getAttribute("singular");
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
				if (this._model instanceof tsunami.Number) {
					this._model.removeEventListener("change", this.changeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Number) {
					this._model.addEventListener("change", this.changeHandler);
					this.changeHandler();
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

		o.construct();

		return o;

	};

}());

