sandbox = this.sandbox || {};

(function () {

	sandbox.Root = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.createdCallbackElement();
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
			/*
			 this.branches = [
			 new tsunami.BranchModule("shapes", "assets/shapes.js", "Shapes"),
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
			 */
			
			this.branches = {
				shapes:new sandbox.Shapes(),
				inputs:new sandbox.Inputs()
			}
		};

		prototype.getBranch = function(id) {
			return this.branches[id];
		};

		return prototype;

	};

}());