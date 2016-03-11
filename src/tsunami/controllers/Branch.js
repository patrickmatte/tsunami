tsunami = this.tsunami || {};

(function () {

	tsunami.Branch = function(element, scope) {
		tsunami.DisplayObject.call(this, element, scope);
	};

	var p = tsunami.Branch.prototype = Object.create(tsunami.DisplayObject.prototype);

	p.constructor = tsunami.Branch;

	p.getBranch = function(id) {
		var parent = this.element;
		if (!parent) {
			return null;
		}
		var child = parent.querySelector("." + id);
		if (!child) {
			return null;
		}
		return child.controller;
	};

	p.load = function() {
		//console.log("tsunami.Branch.load", this.id);
	};

	p.show = function() {
		//console.log("tsunami.Branch.show", this.id);
	};

	p.hide = function() {
		//console.log("tsunami.Branch.hide", this.id);
	};

}());