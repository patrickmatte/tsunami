sandbox = this.sandbox || {};

(function () {

	sandbox.Preloader = function(element) {
		this.element = element;

		this.setProgress(0);
	};

	var p = sandbox.Preloader.prototype;

	p.show = function() {
		//var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.add("visible");
		//return transition;

	};

	p.hide = function() {
		//var transition = tsunami.promise.transition(this.element, ["opacity"]);
		this.element.classList.remove("visible");
		//return transition;
	};

	p.setProgress = function(value) {
		if (this.element) {
			var progressbar = this.element.querySelector(".progressbar").controller;
			progressbar.style.scaleX = value;
			progressbar.style.updateTransform();
		}
	};

	p.parseElement = function(element, scope) {
		this.element = element;
	};

}());