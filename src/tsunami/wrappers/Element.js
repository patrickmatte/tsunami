tsunami = this.tsunami || {};

(function () {

	tsunami.Element = function(prototype) {

		prototype.createdCallback = function() {
			this.styleManager = new tsunami.Style(this);
			this.modelChangeBind = this.modelChange.bind(this);
			this._scope = this;
		};

		Object.defineProperty(prototype, 'scope', {
			get: function() {
				return this.getScope();
			},
			set: function(value) {
				this.setScope(value);
			}
		});

		prototype.getScope = function() {
			return this._scope;
		};

		prototype.setScope = function(value) {
			this._scope = value;

			var model = this.getAttribute("data-model");
			if (model) {
				this.model = tsunami.evalProperty(model, value);
			}
			this.removeAttribute("model");
		};

		Object.defineProperty(prototype, 'model', {
			get: function() {
				return this.getModel();
			},
			set: function(value) {
				this.setModel(value);
			}
		});

		prototype.getModel = function() {
			return this._model;
		};

		prototype.setModel = function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (value) {
				if (value instanceof tsunami.Data) {
					value.addEventListener("change", this.modelChangeBind);
					this.modelChange();
				} else {
					this.updateValue(value);
				}
			} else {

			}
		};

		prototype.modelChange = function(event) {
			this.updateValue(this._model.value);
		};

		prototype.updateValue = function(value) {

		};

		prototype.destroy = function() {
			this.model = null;
			this.styleManager.destroy();
			this.innerHTML = "";
			this.scope = null;
		};

		return prototype;

	};

}());
