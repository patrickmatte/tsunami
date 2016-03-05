(function() {

	tsunami.Switch = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);

		this.modelChangeHandler = this.modelChange.bind(this);

		this.caseElements = {};

		this.defaultElement = this.element.querySelector(".default");

		this.hideElement(this.defaultElement);

		var cases = this.element.querySelectorAll(".case");
		for (var i = 0; i < cases.length; i++) {
			var caseElement = cases.item(i);
			var val = caseElement.getAttribute("data-value");
			if (val) {
				this.caseElements[val] = caseElement;
			}
			this.hideElement(caseElement);
		}

		var modelPath = this.element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}

	};

	var p = tsunami.Switch.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.Switch;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.removeEventListener("change", this.modelChangeHandler);
				}
			}
			this._model = value;
			if (this._model) {
				if (this._model instanceof tsunami.Model) {
					this._model.addEventListener("change", this.modelChangeHandler);
					this.modelChangeHandler();
				} else {
					this.switchValue(this._model);
				}
			}
		}
	});

	p.modelChange = function(event) {
		this.switchValue(this._model.value);
	};

	p.switchValue = function(value) {
		value = value.toString();

		this.hideElement(this.selectedElement);
		this.selectedElement = this.caseElements[value] || this.defaultElement;
		this.showElement(this.selectedElement);
	};

	p.hideElement = function(element) {
		if (element) {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		}
	};

	p.showElement = function(element) {
		if (element) {
			this.element.appendChild(element);
		}
	};

	p.destroy = function() {
		this.model = null;
		tsunami.DisplayObject.destroy.call(this);
	};

}());
