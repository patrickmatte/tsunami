tsunami = this.tsunami || {};

(function() {

	tsunami.DataBind = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.modelChangeBind = this.modelChange.bind(this);

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

	var p = tsunami.DataBind.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.DataBind;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (!this.element) {
				return;
			}
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					this.element.innerHTML = this._model;
				}
			} else {
				this.element.innerHTML = "";
			}
		}
	});

	p.modelChange = function(event) {
		this.element.innerHTML = this._model.value;
	};

	p.destroy = function() {
		this.model = null;
		tsunami.DisplayObject.prototype.destroy.call(this);
	};

}());
