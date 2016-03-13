tsunami = this.tsunami || {};

(function() {

	tsunami.BranchModules = function(element, scope) {
		tsunami.Branch.call(this, element, scope);
		this.assets = {
			images:[],
			templates:[],
			scripts:[],
			styles:[],
			models:[]
		}
	};

	var p = tsunami.BranchModules.prototype = Object.create(tsunami.Branch.prototype);

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
			var templatePromise = tsunami.load.templates(template);
			templateAssets.add(templatePromise);
			templatePromises.push(templatePromise);
		}
		var templatesPromises = Promise.all(templatePromises);

		var styleAssets = new tsunami.AssetList();
		assetList.add(styleAssets);
		var styles = this.assets.styles.slice();
		var stylesPromise = new Promise(function(resolve, reject) {
			var elements = [];
			var loadStyle = function() {
				if (styles.length > 0) {
					var style = styles.shift();
					var stylePromise = tsunami.load.style(style);
					styleAssets.add(stylePromise);
					stylePromise.then(function(element) {
						elements.push(element);
						loadStyle();
					});
				} else {
					resolve(elements);
				}
			};
			loadStyle();
		});

		var scriptAssets = new tsunami.AssetList();
		assetList.add(scriptAssets);
		var scripts = this.assets.scripts.slice();
		var scriptsPromise = new Promise(function(resolve, reject) {
			var elements = [];
			var loadScript = function() {
				if (scripts.length > 0) {
					var script = scripts.shift();
					var scriptPromise = tsunami.load.script(script);
					scriptAssets.add(scriptPromise);
					scriptPromise.then(function(element) {
						elements.push(element);
						loadScript();
					});
				} else {
					resolve(elements);
				}
			};
			loadScript();
		});

		var promise = Promise.all([imagesPromise, templatesPromises, stylesPromise, scriptsPromise]);
		var promise2 = promise.then(this.loadComplete.bind(this));
		return promise2;
	};

	p.loadComplete = function(assets){
		this.images = assets[0];
		this.templates = assets[1];
		this.styles = assets[2];
		this.scripts = assets[3];
	};

}());