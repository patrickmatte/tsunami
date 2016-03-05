tsunami = this.tsunami || {};

(function() {

	tsunami.InputCheckbox = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.modelChangeBind = this.modelChange.bind(this);
		this.changeBind = this.change.bind(this);

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

	var p = tsunami.InputCheckbox.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.InputCheckbox;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.removeEventListener("change", this.changeBind);
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.addEventListener("change", this.changeBind);
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					this.element.checked = this._model;
				}
			} else {
				this.element.checked = false;
			}
		}
	});

	p.modelChange = function(event) {
		this.element.checked = this._model.value;
	};

	p.change = function(e) {
		this._model.removeEventListener("change", this.modelChangeBind);
		this._model.value = this.element.checked;
		this._model.addEventListener("change", this.modelChangeBind);
	};

	p.destroy = function() {
		this.model = null;
		tsunami.DisplayObject.destroy.call(this);
	};

}());

