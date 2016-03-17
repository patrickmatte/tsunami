(function() {

	tsunami.Noun = function(element, scope) {
		tsunami.HTMLElement.call(this, element, scope);

		this.modelChangeBind = this.modelChange.bind(this);

		this.plural = this.element.querySelector(".plural");
		this.singular = this.element.querySelector(".singular");

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

	var p = tsunami.Noun.prototype = Object.create(tsunami.HTMLElement.prototype);

	p.constructor = tsunami.Noun;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Number) {
					this._model.removeEventListener("change", this.modelChangeBind);
				}
			}
			this._model = value;
			if (!isNaN(this._model)) {
				if (this._model instanceof tsunami.Number) {
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					this.update(this.model);
				}
			}
		}
	});

	p.modelChange = function(event) {
		this.update(this.model.value);
	};

	p.update = function(value) {
		this.plural.style.display = (value > 1)?"inline-block":"none";
		this.singular.style.display = (value < 2)?"inline-block":"none";
	};

	p.destroy = function() {
		this.model = null;
		tsunami.HTMLElement.prototype.destroy.call(this);
	};

}());

