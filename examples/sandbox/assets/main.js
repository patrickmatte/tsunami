(function () {

	Root = function() {
		this.construct();
	};

	var p = Root.prototype = new tsunami.Branch();

	p.constructBranch = p.construct;

	p.construct = function() {

		this.model = {
			myString:new tsunami.String("test"),
			myCheckbox:new tsunami.Boolean(true),
			myNumber:new tsunami.Number(5),
			myRange:new tsunami.Number(25),
			carMakers:new tsunami.Array(
				{value:"volvo", title:"Volvo"},
				{value:"saab", title:"Saab"},
				{value:"mercedes", title:"Mercedes"},
				{value:"audi", title:"Audi"}
			),
			myCarMaker:new tsunami.String()
		};
		this.model.myCarMaker.value = this.model.carMakers.value[2].value;
		this.model.defaultCarMaker = this.model.carMakers.value[3].value;
		this.model.images = [
			"http://valleysinthevinyl.com/packs-preview/VV_CoolBlueTextures/01.jpg",
			"http://demilked.uuuploads.com/free-grunge-backgrounds-textures/free-grunge-textures-backgrounds-26.jpg",
			"http://cdn.designinstruct.com/files/234-colored_vintage_paper_textures/colored_vintage_paper_texture_04_dark_blue_preview.jpg",
			"http://m.rgbimg.com/cache1nuEGw/users/i/ia/iammi-z/600/meWsdaE.jpg",
			"http://img09.deviantart.net/d705/i/2009/338/5/e/scratched_up_blue_texture_by_beckas.jpg",
			"http://orig06.deviantart.net/84f4/f/2009/327/b/1/blue_texture_1_by_authenticitys.jpg"
		];

		var branches = [
			new tsunami.BranchModule("circles", "assets/circles.js", "Circles"),
			new tsunami.BranchModule("forms", "assets/forms.js", "Forms"),
			new tsunami.ModularBranch("animation",
				this.model.images.slice(),
				[
					"assets/circles.html",
					"assets/forms.html",
					"assets/animation.html"
				],
				[
					"assets/circles.css",
					"assets/forms.css",
					"assets/animation.css"
				],
				[
					"assets/animation.js",
					"assets/circles.js",
					"assets/forms.js"
				])
		];

		this.constructBranch("root", branches);
	};

	p.load = function() {
		var text = document.querySelector("#root-template").text;
		var template = tsunami.compileTemplate(text);
		tsunami.insertBefore(template, document.querySelector(".preloader"), this);
	};

}());

Preloader = function(o) {
/*
	o.show = function() {
	console.log("Preloader.show");
	var transition = tsunami.promise.transition(this);
	this.classList.add("visible");
	return transition;
	};

	o.hide = function() {
	console.log("Preloader.hide");
	var transition = tsunami.promise.transition(this);
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
		progressbar.styler.scaleX = value;
		progressbar.styler.updateTransform();
	};

	o.setProgress(0);

	return o;

};

AppButton = function(o) {

	o.router = window.router;
	o.pushState = true;

	tsunami.RouterButton(o);

	return o;
};


Mustache.escape = function(string) {
	return string;
};
/*
tsunami.mustacheParse = function(text) {
	var token = Mustache.parse(text);
	return text;
};

tsunami.mustacheRender = function(text, scope) {
	return Mustache.render(text, scope);
};
*/
tsunami.compileTemplate = function(text) {
	var template = Handlebars.compile(text);
	return template;
};

tsunami.renderTemplate = function(template, scope) {
	return template(scope);
};

router = new tsunami.Router();
tsunami.applyWrapperAttribute(document.body, "data-wrapper", this);
router.path = location.origin + location.pathname;
router.redirect("", "circles");
router.redirect("circles", "circles/circle1/circle2");
router.redirect("circle3", "circles/circle1/circle2/circle3");
router.fragment = "?";
router.root = new Root();
router.setHistory(tsunami.history);
router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
router.preloader = document.querySelector(".preloader");
tsunami.history.fallback = tsunami.HistoryFallback.HASH;
tsunami.history.start(router.path, router.fragment);
