AppButton = function(o) {

	o.router = window.router;
	o.pushState = true;

	tsunami.RouterButton(o);

	return o;
};

Shape = function(o) {

	tsunami.BranchWrapper(o);

	o.load = function(assetList) {
		//console.log("load", this.id, "path", this.path, "root", this.root, "router", this.router);
		//console.log(this.id, "load", "assetList", assetList);
	};

	o.show = function(assetList) {
		var transition = tsunami.promises.transition(this);
		this.classList.add("visible");
		return transition;
	};

	o.hide = function(assetList) {
		var transition = tsunami.promises.transition(this);
		this.classList.remove("visible");
		return transition;
	};

	return o;

};

ShapeImage = function(o) {

	Shape(o);

	o.load = function(assetList) {
		this.background = new Image();
		var url = ShapeImage.urlsCopy.shift();
		if (ShapeImage.urlsCopy.length == 0) {
			ShapeImage.urlsCopy = ShapeImage.urls.slice();
		}
		var image = tsunami.promises.image(url + "?test=" + Math.round(Math.random() * 100000).toString(), this.background);
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

ShapeImage.urls = [
	"http://valleysinthevinyl.com/packs-preview/VV_CoolBlueTextures/01.jpg",
	"http://demilked.uuuploads.com/free-grunge-backgrounds-textures/free-grunge-textures-backgrounds-26.jpg",
	"http://cdn.designinstruct.com/files/234-colored_vintage_paper_textures/colored_vintage_paper_texture_04_dark_blue_preview.jpg",
	"http://m.rgbimg.com/cache1nuEGw/users/i/ia/iammi-z/600/meWsdaE.jpg",
	"http://img09.deviantart.net/d705/i/2009/338/5/e/scratched_up_blue_texture_by_beckas.jpg",
	"http://orig06.deviantart.net/84f4/f/2009/327/b/1/blue_texture_1_by_authenticitys.jpg"
];

ShapeImage.urlsCopy = ShapeImage.urls.slice();

Rectangle = function(o) {

	o.load = function(assetList) {
		console.log(this.id, "load", "assetList", assetList);
	};

	o.show = function(assetList) {
		var animation = tsunami.promises.animation(this);
		this.classList.add("anim");
		return animation;
	};

	o.hide = function(assetList) {
		this.classList.remove("anim");
	};

	return o;

};

Preloader = function(o) {
	/*
	 o.show = function() {
	 console.log("Preloader.show");
	 var transition = tsunami.promises.transition(this);
	 this.classList.add("visible");
	 return transition;
	 };

	 o.hide = function() {
	 console.log("Preloader.hide");
	 var transition = tsunami.promises.transition(this);
	 this.classList.remove("visible");
	 return transition;
	 };
	 */
	o.show = function() {
		this.classList.add("visible");
	};

	o.hide = function() {
		this.classList.remove("visible");
	};

	o.setProgress = function(value) {
		var progressbar = this.querySelector(".progressbar");
		progressbar.setScaleX(value);
		progressbar.updateTransform();
	};

	o.setProgress(0);

	return o;

};

router = new tsunami.Router();
router.path = location.origin + location.pathname;
router.forward("", "circle1/circle2");
router.forward("circle3", "circle1/circle2/circle3");
router.fragment = "?";
tsunami.applyWrapperAttribute(document.body, "wrapper");
router.root = tsunami.BranchWrapper(document.body);
router.setHistory(tsunami.history);
router.addEventListener("locationChange", function(e) {
	console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
router.preloader = document.querySelector(".preloader");
tsunami.history.fallback = tsunami.HistoryFallback.HASH;
tsunami.history.start(router.path, router.fragment);
