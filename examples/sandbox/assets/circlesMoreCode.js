Shape = function(o) {

	tsunami.BranchWrapper(o);

	o.load = function(assetList) {
		//console.log("load", this.id, "path", this.path, "root", this.root, "router", this.router);
		//console.log(this.id, "load", "assetList", assetList);
	};

	o.show = function(assetList) {
		var transition = tsunami.promise.transition(this, ["height"]);
		this.classList.add("visible");
		return transition;
	};

	o.hide = function(assetList) {
		var transition = tsunami.promise.transition(this, ["height"]);
		this.classList.remove("visible");
		return transition;
	};

	return o;

};

ShapeImage = function(o) {

	Shape(o);

	o.load = function(assetList) {
		this.background = new Image();
		if (ShapeImage.urlsCopy.length == 0) {
			ShapeImage.urlsCopy = ShapeImage.urls.slice();
		}
		var url = ShapeImage.urlsCopy.shift();
		//var image = tsunami.promise.image(url + "?test=" + Math.round(Math.random() * 100000).toString(), this.background);
		var image = tsunami.load.image(url, this.background);
		assetList.add(image);
		return image;
	};

	o.showShape = o.show;

	o.show = function(assetList) {
		this.appendChild(this.background);
		return this.showShape();
	};

	o.hideShape = o.hide;

	o.hide = function(assetList) {
		return this.hideShape().then(this.removeBackground.bind(this));
	};

	o.removeBackground = function(obj) {
		this.removeChild(this.background);
		this.background = null;
	};

	return o;

};

ShapeImage.urlsCopy = [];

Rectangle = function(o) {

	o.load = function(assetList) {
		//console.log(this.id, "load", "assetList", assetList);
	};

	o.show = function(assetList) {
		var animation = tsunami.promise.animation(this, "flash");
		this.classList.add("anim");
		return animation;
	};

	o.hide = function(assetList) {
		this.classList.remove("anim");
	};

	return o;

};
