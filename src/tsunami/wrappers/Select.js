tsunami = this.tsunami || {};

(function() {

	tsunami.Select = function(prototype) {

		tsunami.List(prototype);

		prototype.createdCallbackList = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackList();
			this.inputBind = this.inputHandler.bind(this);
			this.addEventListener("input", this.inputBind);
		};

		prototype.updateValue = function(value) {
			this.value = value;
		};

		prototype.inputHandler = function(e) {
			if (this._model) {
				this._model.removeEventListener("change", this.modelChangeBind);
				this._model.value = this.value;
				this._model.addEventListener("change", this.modelChangeBind);
			}
		};

		prototype.destroyList = prototype.destroy;

		prototype.destroy = function() {
			this.removeEventListener("input", this.inputBind);
			this.destroyList();
		};

	};

}());

