sandbox.ShapeBranch = function(prototype) {

	prototype.getBranch = function(id) {
		return this.querySelector("." + id);
	};

};

(function () {

	sandbox.Shape = function(prototype) {

		tsunami.Element(prototype);

		prototype.load = function(assetList) {
			//console.log("load", this.id, "path", this.path, "root", this.root, "router", this.router);
			//console.log(this.id, "load", "assetList", assetList);
		};

		prototype.show = function() {
			var transition = tsunami.promise.transition(this, ["height"]);
			this.classList.add("visible");
			return transition;
		};

		prototype.hide = function() {
			var transition = tsunami.promise.transition(this, ["height"]);
			this.classList.remove("visible");
			return transition;
		};

		prototype.getBranch = function(id) {
			return this.querySelector("." + id);
		};

		return prototype;

	};

}());

(function () {

	sandbox.ShapeImage = function(prototype) {

		sandbox.Shape(prototype);

		prototype.load = function(assetList) {
			this.background = new Image();
			if (sandbox.ShapeImage.urlsCopy.length == 0) {
				sandbox.ShapeImage.urlsCopy = this.root.model.images.slice();
			}
			var url = sandbox.ShapeImage.urlsCopy.shift();
			//var image = tsunami.promise.image(url + "?test=" + Math.round(Math.random() * 100000).toString(), this.background);
			var image = tsunami.load.image(url, this.background);
			assetList.add(image);
			return image;
		};

		prototype.showShape = prototype.show;

		prototype.show = function() {
			this.appendChild(this.background);
			return this.showShape();
		};

		prototype.hideShape = prototype.hide;

		prototype.hide = function() {
			var promise = this.hideShape();
			return promise.then(this.removeBackground.bind(this));
		};

		prototype.removeBackground = function(obj) {
			this.removeChild(this.background);
			this.background = null;
		};
		
	};

	sandbox.ShapeImage.urlsCopy = [];

}());

(function () {

	sandbox.Rectangle = function(prototype) {

		tsunami.Branch(prototype);

		prototype.load = function(assetList) {
			//console.log(this.id, "load", "assetList", assetList);
		};

		prototype.show = function() {
			var animation = tsunami.promise.animation(this, "flash");
			this.classList.add("anim");
			return animation;
		};

		prototype.hide = function() {
			this.classList.remove("anim");
		};

	};

}());