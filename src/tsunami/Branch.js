tsunami = this.tsunami || {};

(function() {

	tsunami.Branch = function(id, branches) {
		this.id = id;
		this.branches = branches || [];
		this.assets = {
			images:[],
			templates:[],
			scripts:[],
			styles:[],
			json:[]
		}
	};
	
	var prototype = tsunami.Branch.prototype;

	prototype.getBranch = function(id) {
		var selectedBranch;
		for (var i = 0; i < this.branches.length; i++) {
			var branch = this.branches[i];
			if (branch.id == id) {
				selectedBranch = branch;
			}
		}
		return selectedBranch;
	};

	prototype.load = function(assetList) {
		var imageAssets = new tsunami.AssetList();
		assetList.add(imageAssets);
		var imagePromises = [];
		if (this.assets.images) {
			for (var i = 0; i < this.assets.images.length; i++) {
				var image = this.assets.images[i];
				var imagePromise = tsunami.load.image(image);
				imageAssets.add(imagePromise);
				imagePromises.push(imagePromise);
			}
		}
		var imagesPromise = Promise.all(imagePromises);

		var templateAssets = new tsunami.AssetList();
		assetList.add(templateAssets);
		var templatePromises = [];
		if (this.assets.templates) {
			for (var i = 0; i < this.assets.templates.length; i++) {
				var template = this.assets.templates[i];
				var templatePromise = tsunami.load.html(template);
				templateAssets.add(templatePromise);
				templatePromises.push(templatePromise);
			}
		}
		var templatesPromise = Promise.all(templatePromises);

		var styleAssets = new tsunami.AssetList();
		assetList.add(styleAssets);
		var styles = [];
		if (this.assets.styles) {
			styles = this.assets.styles.slice();
		}
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

		var scripts = [];
		if (this.assets.scripts) {
			scripts = this.assets.scripts.slice();
		}
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

		var jsonAssets = new tsunami.AssetList();
		assetList.add(jsonAssets);
		var jsonPromises = [];
		if (this.assets.json) {
			for (var i = 0; i < this.assets.json.length; i++) {
				var json = this.assets.json[i];
				var jsonPromise = tsunami.load.json(json);
				jsonAssets.add(jsonPromise);
				jsonPromises.push(jsonPromise);
			}
		}
		var jsonsPromise = Promise.all(jsonPromises);

		var promise = Promise.all([imagesPromise, templatesPromise, stylesPromise, scriptsPromise, jsonsPromise]);
		var promise2 = promise.then(this.loadComplete.bind(this));
		return promise2;
	};

	prototype.loadComplete = function(assets) {
		this.images = assets[0];
		this.templates = assets[1];
		this.styles = assets[2];
		this.scripts = assets[3];
		this.json = assets[4];
	};

	prototype.hide = function() {
		this.images = null;
		this.templates = null;
		tsunami.removeElements(this.styles);
		this.styles = null;
		tsunami.removeElements(this.scripts);
		this.scripts = null;
		this.json = null;
	};

}());