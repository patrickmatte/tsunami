tsunami = this.tsunami || {};

(function() {

	tsunami.Select = function(element, scope) {
		tsunami.List.call(this, element, scope);

		this.modelChangeHandler = this.modelChange.bind(this);
		this.inputHandler = this.input.bind(this);

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}

	};

	var p = tsunami.Select.prototype = Object.create(tsunami.List.prototype);

	p.constructor = tsunami.Select;

	Object.defineProperty(p, 'model', {
		get: function() {
			return Object.getOwnPropertyDescriptor(tsunami.List.prototype, 'model').get.call(this);
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.removeEventListener("input", this.inputHandler);
					this._model.removeEventListener("change", this.modelChangeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this.element.addEventListener("input", this.inputHandler);
					this._model.addEventListener("change", this.modelChangeHandler);
					this.modelChangeHandler();
				} else {
					this.element.value = this._model;
				}
			} else {
				this.element.value = "";
			}
		}
	});

	p.modelChange = function(event) {
		this.element.value = this._model.value;
	};

	p.input = function(e) {
		this._model.removeEventListener("change", this.modelChangeHandler);
		this._model.value = this.element.value;
		this._model.addEventListener("change", this.modelChangeHandler);
	};

	p.destroy = function() {
		this.model = null;
		tsunami.List.prototype.destroy.call(this);
	};

}());

