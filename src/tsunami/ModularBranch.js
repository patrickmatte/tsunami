tsunami = this.tsunami || {};

(function() {

	tsunami.ModularBranch = function(id, imagePaths, scriptPaths, stylePaths, templatePaths, containerSelector) {

		var o = new tsunami.Branch(id);

		o.containerSelector = containerSelector;
		if (!targetSelector) {
			targetSelector = containerSelector + " #" + id;
		}
		o.targetSelector = targetSelector;
		o.htmlPaths = htmlPaths;
		o.scriptPaths = scriptPaths;
		o.stylePaths = stylePaths;
		o.imagePaths = imagePaths;

		o.load = function() {
			var series = new tsunami.Series();

			var parallel = new tsunami.Parallel();
			series.addTask(parallel);

			this.styles = [];
			if (this.stylePaths) {
				for (var i = 0; i < this.stylePaths.length; i++) {
					var stylePath = this.stylePaths[i];
					var css = new tsunami.CSS(stylePath);
					parallel.addTask(css);
					this.styles.push(css);
				}
			}

			this.scripts = [];
			var scriptSeries = new tsunami.Series();
			parallel.addTask(scriptSeries);
			if (this.scriptPaths) {
				for (var i = 0; i < this.scriptPaths.length; i++) {
					var scriptPath = this.scriptPaths[i];
					var script = new tsunami.Script(scriptPath);
					scriptSeries.addTask(script);
					this.scripts.push(script);
				}
			}

			if (this.imagePaths) {
				for (var i = 0; i < this.imagePaths.length; i++) {
					parallel.addTask(new tsunami.Image(this.imagePaths[i]));
				}
			}

			this.htmls = [];
			if (this.htmlPaths) {
				for (var i = 0; i < this.htmlPaths.length; i++) {
					var htmlPath = this.htmlPaths[i];
					var html = new tsunami.HTML(this.containerSelector, htmlPath);
					series.addTask(html);
					this.htmls.push(html);
				}
			}

			series.addTask(new tsunami.Method(this.loadTarget.bind(this), [series]));
			return series;
		};

		o.loadTarget = function(taskManager) {
			var target = document.querySelector(this.targetSelector);
			if (target) {
				target.parent = this.parent;
				target.router = this.router;
				target.root = this.root;
				if (target.load) {
					taskManager.addTask(target.load());
				}
			}
		};

		o.show = function() {
			var target = document.querySelector(this.targetSelector);
			if (target) {
				if (target.show) {
					return target.show();
				}
			}
		};

		o.hide = function() {
			var series = new tsunami.Series();
			var target = document.querySelector(this.targetSelector);
			if (target) {
				if (target.hide) {
					series.addTask(target.hide());
				}
			}
			series.addTask(new tsunami.Method(this.hideComplete.bind(this)));
			return series;
		};

		o.hideComplete = function() {
			for (var i = 0; i < this.htmls.length; i++) {
				var html = this.htmls[i];
				html.remove();
			}
			for (var j = 0; j < this.scripts.length; j++) {
				var script = this.scripts[j];
				script.remove();
			}
			for (var j = 0; j < this.styles.length; j++) {
				var style = this.styles[j];
				style.remove();
			}
		};

		o.getBranch = function(id) {
			var branch;
			var target = document.querySelector(this.targetSelector);
			if (target) {
				if (target.getBranch) {
					branch = target.getBranch(id);
				}
			}
			return branch;
		};

		o.getDefaultBranch = function() {
			var branch;
			var target = document.querySelector(this.targetSelector);
			if (target) {
				if (target.getDefaultBranch) {
					branch = target.getDefaultBranch();
				}
			}
			return branch;
		};

		return o;

	};

}());