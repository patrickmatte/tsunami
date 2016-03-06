sandbox = {};

(function () {

	sandbox.Root = function() {
		tsunami.Branch.call(this, "root");

		this.model = {
			myString:new tsunami.String("test"),
			navModel:"test",
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
		var numbers = new tsunami.Array(this.model.myNumber, this.model.myRange);
		this.model.myNumbersAverage = new tsunami.AverageNumber(numbers);
		/*
		 this.model.images = [
		 "http://valleysinthevinyl.com/packs-preview/VV_CoolBlueTextures/01.jpg",
		 "http://demilked.uuuploads.com/free-grunge-backgrounds-textures/free-grunge-textures-backgrounds-26.jpg",
		 "http://cdn.designinstruct.com/files/234-colored_vintage_paper_textures/colored_vintage_paper_texture_04_dark_blue_preview.jpg",
		 "http://m.rgbimg.com/cache1nuEGw/users/i/ia/iammi-z/600/meWsdaE.jpg",
		 "http://img09.deviantart.net/d705/i/2009/338/5/e/scratched_up_blue_texture_by_beckas.jpg",
		 "http://orig06.deviantart.net/84f4/f/2009/327/b/1/blue_texture_1_by_authenticitys.jpg"
		 ];
		 */
		this.model.images = [
			"assets/images/01.jpg",
			"assets/images/free-grunge-textures-backgrounds-26.jpg",
			"assets/images/colored_vintage_paper_texture_04_dark_blue_preview.jpg",
			"assets/images/meWsdaE.jpg",
			"assets/images/scratched_up_blue_texture_by_beckas.jpg",
			"assets/images/blue_texture_1_by_authenticitys.jpg"
		];
		this.branches = [
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
	};

	var p = sandbox.Root.prototype = Object.create(tsunami.Branch.prototype);

	p.load = function() {
		var text = document.querySelector("#root-template").text;
		var template = tsunami.compileTemplate(text);
		tsunami.insertBefore(template, document.querySelector(".preloader"), this);
	};

}());


(function () {

	sandbox.Nav = function(element, model) {
		this.element = element;
		this.model = model;
	};

	var p = sandbox.Nav.prototype;

	Object.defineProperty(p, 'model', {
		get: function() {
			return this._model;
		},
		set: function(value) {
			this._model = value;
		}
	});

	p.parseElement = function(element, scope) {
		this.element = element;
		var modelPath = element.getAttribute("data-model");
		if (modelPath) {
			this.model = tsunami.evalProperty(modelPath, scope);
		}
	};

}());

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

(function () {

	sandbox.Button = function(element, scope) {
		tsunami.RouterButton.call(this, element, scope);

		this.router = window.router;
		this.pushState = true;
	};

	var p = sandbox.Button.prototype = Object.create(tsunami.RouterButton.prototype);

	p.constructor = sandbox.Button;

}());

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
	return Handlebars.compile(text);
};

tsunami.renderTemplate = function(template, scope) {
	return template(scope);
};

tsunami.applyControllers(document.body, this);

router = new tsunami.Router();
router.path = location.origin + location.pathname;
router.fragment = "?";
router.root = new sandbox.Root();
router.preloader = document.querySelector(".preloader").controller;
router.redirect("", "circles");
router.redirect("circles", "circles/circle1/circle2");
router.redirect("circle3", "circles/circle1/circle2/circle3");
router.addEventListener("locationChange", function(e) {
	//console.log("router locationChange", e.location);
});
router.addEventListener("complete", function() {
	console.log("router complete", router.getLocation());
});
tsunami.applyWrapperAttribute(document.body, "data-wrapper", this);
router.history = new tsunami.History(router.path, router.fragment, tsunami.HistoryFallback.HASH);
router.history.start();
