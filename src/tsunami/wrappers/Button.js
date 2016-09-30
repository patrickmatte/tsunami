(function() {

	tsunami.Button = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			this.addEventListener("click", this.clickHandler.bind(this));
		};

		prototype.clickHandler = function(event) {
			this.onReleaseHandler(event);
		};

		prototype.onReleaseHandler = function(event) {
			if (this.onRelease) {
				this.onRelease(event);
			}
		};

		return prototype;

	};

}());

(function() {

	tsunami.RouterButton = function(prototype) {

		tsunami.Button(prototype);

		prototype.setScopeRouterButton = prototype.setScope;

		prototype.setScope = function(value) {
			this.setScopeRouterButton(value);

			var router = this.getAttribute("data-router");
			if (router) {
				this.router = tsunami.evalProperty(router, scope);
			}

			var pushState = this.getAttribute("data-pushstate");
			if (pushState) {
				this.pushState = tsunami.evalProperty(pushState, scope);
			}

		};

		Object.defineProperty(prototype, 'router', {
			get: function() {
				return this.getRouter();
			},
			set: function(value) {
				this.setRouter(value);
			}
		});

		prototype.getRouter = function() {
			return this._router;
		};

		prototype.setRouter = function(value) {
			this._router = value;
		};

		prototype.onReleaseHandlerButton = prototype.onReleaseHandler;

		prototype.onReleaseHandler = function(event) {
			event.preventDefault();
			this.onReleaseHandlerButton(event);

			if (this.router) {
				var path = this.getPath();
				if (path != undefined && path != null) {
					this.router.setLocation(path, this.pushState);
				}
			} else {
				console.log("The property 'router' is undefined in RouterButton", this);
			}
		};

		prototype.getPath = function() {
			return this.href || this.getAttribute("data-path");
		};

		return prototype;

	};

}());