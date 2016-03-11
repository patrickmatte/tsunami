tsunami = this.tsunami || {};

(function() {

	tsunami.InputText = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.modelChangeBind = this.modelChange.bind(this);
		this.inputBind = this.input.bind(this);

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

	var p = tsunami.InputText.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.InputText;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.removeEventListener("input", this.inputBind);
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.addEventListener("input", this.inputBind);
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					this.element.value = this._model;
				}
			} else {
			}
		}
	});

	p.modelChange = function(event) {
		this.element.value = this._model.value;
	};

	p.input = function(e) {
		this._model.removeEventListener("change", this.modelChangeBind);
		this._model.value = this.element.value;
		this._model.addEventListener("change", this.modelChangeBind);
	};

	p.destroy = function() {
		this.model = null;
		tsunami.DisplayObject.prototype.destroy.call(this);
	};

}());
