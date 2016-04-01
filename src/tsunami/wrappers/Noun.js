(function() {

	tsunami.Noun = function(prototype) {

		tsunami.Element(prototype);

		prototype.createCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.plural = this.querySelector(".plural");
			this.singular = this.querySelector(".singular");

			this.createCallbackElement();
		};

		prototype.updateValue = function(value) {
			this.plural.style.display = (value > 1)?"inline-block":"none";
			this.singular.style.display = (value < 2)?"inline-block":"none";
		};

	};

}());

