tsunami = this.tsunami || {};

(function () {

	tsunami.Input = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();

			this.inputBind = this.inputHandler.bind(this);
			this.addEventListener("input", this.inputBind);

			this.changeBind = this.changeHandler.bind(this);
			this.addEventListener("change", this.changeBind);
		};

		prototype.updateValue = function(value) {
			switch(this.type) {
				case "checkbox":
					this.checked = value;
					break;
				case "radio":
					var checked = (value == this.value);
					if (checked != this.checked) {
						this.checked = checked;
					}
					break;
				default:
					this.value = value;
					break;
			}
		};

		prototype.inputHandler = function(event) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
					this._model.value = this.value;
					this._model.addEventListener("change", this.modelChangeBind);
				}
			}
		};

		prototype.changeHandler = function(event) {
			if (this._model) {
				if (this._model instanceof tsunami.Data) {
					this._model.removeEventListener("change", this.modelChangeBind);
					switch(this.type) {
						case "checkbox":
							this._model.value = this.checked;
							break;
						case "radio":
							this._model.value = this.value;
							break;
						default:
							break;
					}
					this._model.addEventListener("change", this.modelChangeBind);
				}
			}
		};

		prototype.destroyElement = prototype.destroy;

		prototype.destroy = function() {
			this.removeEventListener("input", this.inputBind);
			this.removeEventListener("change", this.changeBind);
			this.destroyElement();
		};

		return prototype;

	};

}());
