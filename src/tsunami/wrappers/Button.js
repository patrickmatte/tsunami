(function() {

	tsunami.Button = function(prototype) {

		tsunami.Element(prototype);

		prototype.createdCallbackElement = prototype.createdCallback;

		prototype.createdCallback = function() {
			if ("ontouchend" in this) {
				this.ontouchend = this.clickHandler.bind(this);
				this.onclick = this.cancelClick.bind(this);
			} else {
				this.onclick = this.clickHandler.bind(this);
			}
		};

		prototype.dontClickAfterDrag = function() {
			this.touchMoveHandler = this.touchMove.bind(this);
			this.ontouchstart = this.touchStart.bind(this);
		};

		prototype.touchStart = function(event) {
			var mouse = event.touches[0];
			this.touchStartPoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);
			document.removeEventListener("touchmove", this.touchMoveHandler);
			document.addEventListener("touchmove", this.touchMoveHandler);
		};

		prototype.touchMove = function(event) {
			var mouse = event.touches[0];
			var touchMovePoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);

			var distance = tsunami.geom.Point.distance(touchMovePoint, this.touchStartPoint);
			if (distance > 10) {
				this.invalidTouchend = true;
			}
		};

		prototype.cancelClick = function(event) {
			event.preventDefault();
		};

		prototype.clickHandler = function(event) {
			event.preventDefault();
			document.removeEventListener("touchmove", this.touchMoveHandler);
			if (this.invalidTouchend) {
				this.invalidTouchend = false;
				return;
			}
			this.onReleaseEvent(event);
		};

		prototype.onReleaseEvent = function(event) {
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

		prototype.setScopeElement = prototype.setScope;

		prototype.setScope = function(value) {
			this.setScopeElement(value);

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

		prototype.onReleaseEventButton = prototype.onReleaseEvent;

		prototype.onReleaseEvent = function(event) {
			this.onReleaseEventButton(event);

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
			return this.href;
		};

		return prototype;

	};

}());