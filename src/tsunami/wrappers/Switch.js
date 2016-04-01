(function() {

	tsunami.Switch = function(prototype) {

		tsunami.Element(prototype);

		prototype.createCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.caseElements = {};

			this.defaultElement = this.querySelector(".default");

			this.hideElement(this.defaultElement);

			var cases = this.querySelectorAll(".case");
			for (var i = 0; i < cases.length; i++) {
				var caseElement = cases.item(i);
				var val = caseElement.getAttribute("data-value");
				if (val) {
					this.caseElements[val] = caseElement;
				}
				this.hideElement(caseElement);
			}

			this.createCallbackElement();
		};

		prototype.updateValue = function(value) {
			value = value.toString();

			this.hideElement(this.selectedElement);
			this.selectedElement = this.caseElements[value] || this.defaultElement;
			this.showElement(this.selectedElement);
		};

		prototype.hideElement = function(element) {
			if (element) {
				if (element.parentNode) {
					element.parentNode.removeChild(element);
				}
			}
		};

		prototype.showElement = function(element) {
			if (element) {
				this.appendChild(element);
			}
		};

	};

}());
