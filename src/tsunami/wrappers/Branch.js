tsunami = this.tsunami || {};

(function () {

	tsunami.Branch = function(prototype) {

		tsunami.Element(prototype);

		prototype.getBranch = function(id) {
			return this.querySelector("." + id);
		};

		prototype.load = function() {
			//console.log("tsunami.Branch.load", this.id);
		};

		prototype.show = function() {
			//console.log("tsunami.Branch.show", this.id);
		};

		prototype.hide = function() {
			//console.log("tsunami.Branch.hide", this.id);
		};

	};

}());