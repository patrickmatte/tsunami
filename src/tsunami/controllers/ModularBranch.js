tsunami = this.tsunami || {};

(function() {

	tsunami.ModularBranch = function(element, scope) {
		tsunami.Branch.call(element, scope);
		this.assets = {
			images:[],
			templates:[],
			scripts:[],
			styles:[],
			models:[]
		}
	};

	var p = tsunami.ModularBranch.prototype = Object.create(tsunami.Branch.prototype);

	p.load = function(assetList) {
		var imageAssets = new tsunami.AssetList();
		assetList.add(imageAssets);
		var imagePromises = [];
		for (var i = 0; i < this.assets.images.length; i++) {
			var image = this.assets[i];
			var imagePromise = tsunami.load.image(image);
			imageAssets.add(imagePromise);
			imagePromises.push(imagePromise);
		}
		var imagesPromise = Promise.all(imagePromises);

		var templateAssets = new tsunami.AssetList();
		assetList.add(templateAssets);
		var templatePromises = [];
		for (var i = 0; i < this.assets.templates.length; i++) {
			var template = this.assets.templates[i];
			var templatePromise = tsunami.load.htmlTemplates(template);
			templateAssets.add(templatePromise);
			templatePromises.push(templatePromise);
		}
		var templatesPromises = Promise.all(templatePromises);

		var styleAssets = new tsunami.AssetList();
		assetList.add(styleAssets);
		var styles = this.assets.styles.slice();
		var stylesPromise = new Promise(function(resolve, reject) {
			var styles = [];
			var loadStyle = function() {
				if (styles.length > 0) {
					var style = styles.shift();
					var stylePromise = tsunami.load.styleSheet(style);
					styleAssets.add(stylePromise);
					stylePromise.then(function(styleSheet) {
						styles.push(styleSheet);
						loadStyle();
					});
				} else {
					resolve(styles);
				}
			};
			loadStyle();
		});

		var scriptAssets = new tsunami.AssetList();
		assetList.add(scriptAssets);
		var scripts = this.assets.scripts.slice();
		var scriptsPromise = new Promise(function(resolve, reject) {
			var scripts = [];
			var loadScript = function() {
				if (scripts.length > 0) {
					var script = scripts.shift();
					var scriptPromise = tsunami.load.script(script);
					scriptAssets.add(scriptPromise);
					scriptPromise.then(function(scriptElement) {
						scripts.push(scriptElement);
						loadScript();
					});
				} else {
					resolve(scripts);
				}
			};
			loadScript();
		});

		var promise = Promise.all([imagesPromise, templatesPromises, stylesPromise, scriptsPromise]);
		var promise2 = promise.then(this.loadComplete.bind(this));
		return promise2;
	};

	p.loadComplete = function(args){
		this.images = args[0];
		this.templates = args[1];
		this.styles = args[2];
		this.scripts = args[3];
	};

}());