sandbox = this.sandbox || {};

(function () {

	sandbox.Preloader = function(prototype) {

		prototype.createdCallback = function() {
			this.setProgress(0);
		};

		prototype.show = function() {
			//var transition = tsunami.promise.transition(this.element, ["opacity"]);
			this.classList.add("visible");
			//return transition;

		};

		prototype.hide = function() {
			//var transition = tsunami.promise.transition(this.element, ["opacity"]);
			this.classList.remove("visible");
			//return transition;
		};

		prototype.setProgress = function(value) {
			var progressbar = this.querySelector(".progressbar");
			progressbar.styleManager.scaleX = value;
			progressbar.styleManager.updateTransform();
		};

	};

	var p = sandbox.Preloader.prototype;


}());