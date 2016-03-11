(function () {

	sandbox.Shape = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
	};

	var p = sandbox.Shape.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = sandbox.Shape;

	p.load = function(assetList) {
		//console.log("load", this.id, "path", this.path, "root", this.root, "router", this.router);
		//console.log(this.id, "load", "assetList", assetList);
	};

	p.show = function() {
		var transition = tsunami.promise.transition(this.element, ["height"]);
		this.element.classList.add("visible");
		return transition;
	};

	p.hide = function() {
		var transition = tsunami.promise.transition(this.element, ["height"]);
		this.element.classList.remove("visible");
		return transition;
	};


}());

(function () {

	sandbox.ShapeImage = function(element, scope) {
		sandbox.Shape.call(this, element, scope);
	};

	var p = sandbox.ShapeImage.prototype = Object.create(sandbox.Shape.prototype);

	p.constructor = sandbox.ShapeImage;

	p.load = function(assetList) {
		this.background = new Image();
		if (sandbox.ShapeImage.urlsCopy.length == 0) {
			sandbox.ShapeImage.urlsCopy = sandbox.ShapeImage.urls.slice();
		}
		var url = sandbox.ShapeImage.urlsCopy.shift();
		//var image = tsunami.promise.image(url + "?test=" + Math.round(Math.random() * 100000).toString(), this.background);
		var image = tsunami.load.image(url, this.background);
		assetList.add(image);
		return image;
	};


	p.show = function() {
		this.element.appendChild(this.background);
		return sandbox.Shape.prototype.show.call(this);
	};

	p.hide = function() {
		var promise = sandbox.Shape.prototype.hide.call(this);
		return promise.then(this.removeBackground.bind(this));
	};

	p.removeBackground = function(obj) {
		this.element.removeChild(this.background);
		this.background = null;
	};

	sandbox.ShapeImage.urlsCopy = [];

}());

(function () {

	sandbox.Rectangle = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
	};

	var p = sandbox.Rectangle.prototype = Object.create(tsunami.Branch.prototype);

	p.constructor = sandbox.Rectangle;

	p.load = function(assetList) {
		//console.log(this.id, "load", "assetList", assetList);
	};

	p.show = function() {
		var animation = tsunami.promise.animation(this.element, "flash");
		this.element.classList.add("anim");
		return animation;
	};

	p.hide = function() {
		this.element.classList.remove("anim");
	};

}());