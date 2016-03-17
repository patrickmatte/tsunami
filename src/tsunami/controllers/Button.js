(function() {

	tsunami.Button = function(element, scope) {
		tsunami.HTMLElement.call(this, element, scope);

		this.onRelease = function(){};

		if (tsunami.isMobile.any) {
			this.element.ontouchend = this.clickHandler.bind(this);
			this.element.onclick = this.cancelClick.bind(this);
		} else {
			this.element.onclick = this.clickHandler.bind(this);
		}
	};

	var p = tsunami.Button.prototype = Object.create(tsunami.HTMLElement.prototype);

	p.constructor = tsunami.Button;

	p.dontClickAfterDrag = function() {
		this.element.touchMoveHandler = this.touchMove.bind(this);
		this.element.ontouchstart = this.touchStart.bind(this);
	};

	p.touchStart = function(event) {
		var mouse = event.touches[0];
		this.touchStartPoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);
		document.removeEventListener("touchmove", this.touchMoveHandler);
		document.addEventListener("touchmove", this.touchMoveHandler);
	};

	p.touchMove = function(event) {
		var mouse = event.touches[0];
		var touchMovePoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);

		var distance = tsunami.geom.Point.distance(touchMovePoint, this.touchStartPoint);
		if (distance > 10) {
			this.invalidTouchend = true;
		}
	};

	p.cancelClick = function(event) {
		event.preventDefault();
	};

	p.clickHandler = function(event) {
		event.preventDefault();
		document.removeEventListener("touchmove", this.touchMoveHandler);
		if (this.invalidTouchend) {
			this.invalidTouchend = false;
			return;
		}
		this.onReleaseEvent(event);
	};

	p.onReleaseEvent = function(event) {
		this.onRelease(event);
	};

}());

(function() {

	tsunami.RouterButton = function(element, scope) {

		tsunami.Button.call(this, element, scope);

		var router = element.getAttribute("data-router");
		if (router) {
			this.router = tsunami.evalProperty(router, scope);
		}

		var pushState = element.getAttribute("data-pushstate");
		if (pushState) {
			this.pushState = tsunami.evalProperty(pushState, scope);
		}

	};

	var p = tsunami.RouterButton.prototype = Object.create(tsunami.Button.prototype);

	p.constructor = tsunami.RouterButton;

	p.onReleaseEvent = function(event) {
		tsunami.Button.prototype.onReleaseEvent.call(this, event);

		if (this.router) {
			var path = this.getPath();
			if (path) {
				this.router.setLocation(path, this.pushState);
			}
		} else {
			throw("No router on RouterButton", this);
		}
	};

	p.getPath = function() {
		return this.element.href;
	};

}());