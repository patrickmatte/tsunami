(function () {

	sandbox.Inputs = function() {
		tsunami.Branch.call(this, "inputs");
		this.assets = {
			styles: [
				"assets/css/inputs.css"
			],
			templates: [
				"assets/html/inputs.html",
				"assets/html/radio.html",
				"assets/html/selectOption.html"
			]
		}
	};

	var prototype = sandbox.Inputs.prototype = Object.create(tsunami.Branch.prototype);

	prototype.constructor = sandbox.Inputs;

	prototype.loadComplete = function(assets) {
		tsunami.Branch.prototype.loadComplete.call(this, assets);
		this.element = tsunami.importTemplate(this.templates[0], this);
		this.parent.querySelector(".content").appendChild(this.element);
	};

	prototype.show = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.add("visible");
		return transition;
	};

	prototype.hide = function() {
		var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.remove("visible");
		return transition.then(this.hideComplete.bind(this));
	};

	prototype.hideComplete = function() {
		tsunami.destroyElement(this.element);
		this.element = null;
		return tsunami.Branch.prototype.hide.call(this);
	};

	prototype.getBranch = function(id) {
		return this.element.querySelector("." + id);
	};


}());