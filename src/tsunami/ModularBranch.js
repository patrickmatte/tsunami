tsunami = this.tsunami || {};

(function() {

	tsunami.ModularBranch = function(id, imagePaths, scriptPaths, stylePaths, templatePaths, template, parentNode, referenceNode) {
		this.construct(id, imagePaths, scriptPaths, stylePaths, templatePaths, template, parentNode, referenceNode);
	};

	var p = tsunami.ModularBranch.prototype = new tsunami.Branch();

	p.construct = function(id, images, templates, styles, scripts, template, parentNode, referenceNode) {
		this.id = id;
		this.images = images;
		this.templates = templates;
		this.scripts = scripts;
		this.styles = styles;
		this.template = template;
		this.parentNode = parentNode;
		this.referenceNode = referenceNode;
	};

	p.load = function(assetList) {
		var imageAssets = new tsunami.AssetList();
		assetList.add(imageAssets);
		var imagePromises = [];
		for (var i = 0; i < this.images.length; i++) {
			var image = this.images[i];
			var imagePromise = tsunami.load.image(image);
			imageAssets.add(imagePromise);
			imagePromises.push(imagePromise);
		}
		var imagesPromise = Promise.all(imagePromises);

		var templateAssets = new tsunami.AssetList();
		assetList.add(templateAssets);
		var templatePromises = [];
		for (var i = 0; i < this.templates.length; i++) {
			var template = this.templates[i];
			var templatePromise = tsunami.load.htmlTemplates(template);
			templateAssets.add(templatePromise);
			templatePromises.push(templatePromise);
		}
		var templatesPromises = Promise.all(templatePromises);

		var styleAssets = new tsunami.AssetList();
		assetList.add(styleAssets);
		var styles = this.styles.slice();
		var stylesPromise = new Promise(function(resolve, reject) {
			var styleSheets = [];
			var loadStyle = function() {
				if (styles.length > 0) {
					var style = styles.shift();
					var stylePromise = tsunami.load.styleSheet(style);
					styleAssets.add(stylePromise);
					stylePromise.then(function(styleSheet) {
						styleSheets.push(styleSheet);
						loadStyle();
					});
				} else {
					resolve(styleSheets);
				}
			};
			loadStyle();
		});

		var scriptAssets = new tsunami.AssetList();
		assetList.add(scriptAssets);
		var scripts = this.scripts.slice();
		var scriptsPromise = new Promise(function(resolve, reject) {
			var scriptElements = [];
			var loadScript = function() {
				if (scripts.length > 0) {
					var script = scripts.shift();
					var scriptPromise = tsunami.load.script(script);
					scriptAssets.add(scriptPromise);
					scriptPromise.then(function(scriptElement) {
						scriptElements.push(scriptElement);
						loadScript();
					});
				} else {
					resolve(scriptElements);
				}
			};
			loadScript();
		});

		var promise = Promise.all([imagesPromise, templatesPromises, stylesPromise, scriptsPromise]);
		var promise2 = promise.then(this.loadComplete.bind(this));
		return promise2;
	};

	p.loadComplete = function(args){
		console.log("loadComplete", args);
		this.imageElements = args[0];
		this.templateElements = args[1];
		this.styleElements = args[2];
		this.scriptElements = args[3];
	};

	p.show = function() {
		for (var i = 0; i < this.imageElements.length; i++) {
			document.body.appendChild(this.imageElements[i]);
		}
	};

	p.getBranch = function(id) {
		var branch;
		var target = document.querySelector(this.targetSelector);
		if (target) {
			if (target.getBranch) {
				branch = target.getBranch(id);
			}
		}
		return branch;
	};

}());