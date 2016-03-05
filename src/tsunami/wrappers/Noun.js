(function() {

	tsunami.Noun = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.modelChangeBind = this.modelChange.bind(this);

		this.plural = this.element.getAttribute("data-plural");
		this.singular = this.element.getAttribute("data-singular");

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

	var p = tsunami.Noun.prototype = Object.create(tsunami.DisplayObject.prototype);

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
			if (this._model) {
				if (this._model instanceof tsunami.Number) {
					this._model.addEventListener("change", this.modelChangeBind);
					this.modelChangeBind();
				} else {
					if (this._model > 1){
						this.element.innerHTML = this.plural;
					} else {
						this.element.innerHTML = this.singular;
					}
				}
			}
		}
	});

	p.modelChange = function(event) {
		if (this._model.value > 1){
			this.element.innerHTML = this.plural;
		} else {
			this.element.innerHTML = this.singular;
		}
	};

	p.destroy = function() {
		this.model = null;
		tsunami.DisplayObject.destroy.call(this);
	};

}());

