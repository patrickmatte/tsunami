tsunami = this.tsunami || {};

(function () {

	tsunami.DataBind = function(prototype) {

		tsunami.Element(prototype);

		prototype.setModelElement = prototype.setModel;

		prototype.setModel = function(value) {
			this.setModelElement(value);
			if (value) {
				if (this._model instanceof tsunami.Data) {
					this.modelChange();
				} else {
					this.innerHTML = this._model;
				}
			} else {
				this.innerHTML = "";
			}
		};

		prototype.modelChange = function(event) {
			this.innerHTML = this.model.value;
		};

		return prototype;

	};

}());
