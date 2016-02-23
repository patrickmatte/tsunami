tsunami.Button = function(o) {

	o.construct = function() {
		this.onRelease = function(){};

		if (tsunami.isMobile.any) {
			this.ontouchend = this.clickHandler.bind(this);
			this.onclick = this.cancelClick.bind(this);
		} else {
			this.onclick = this.clickHandler.bind(this);
		}
	};

	o.dontClickAfterDrag = function() {
		this.touchMoveHandler = this.touchMove.bind(this);
		this.ontouchstart = this.touchStart.bind(this);
	};

	o.touchStart = function(event) {
		var mouse = event.touches[0];
		this.touchStartPoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);
		document.removeEventListener("touchmove", this.touchMoveHandler);
		document.addEventListener("touchmove", this.touchMoveHandler);
	};

	o.touchMove = function(event) {
		var mouse = event.touches[0];
		var touchMovePoint = new tsunami.geom.Point(mouse.pageX, mouse.pageY);

		var distance = tsunami.geom.Point.distance(touchMovePoint, this.touchStartPoint);
		if (distance > 10) {
			this.invalidTouchend = true;
		}
	};

	o.cancelClick = function(event) {
		event.preventDefault();
	};

	o.clickHandler = function(event) {
		event.preventDefault();
		document.removeEventListener("touchmove", this.touchMoveHandler);
		if (this.invalidTouchend) {
			this.invalidTouchend = false;
			return;
		}
		this.onReleaseEvent(event);
	};

	o.onReleaseEvent = function(event) {
		this.onRelease(event);
	};

	o.construct();

	return o;

};

tsunami.RouterButton = function(o) {

	tsunami.Button(o);

	o.construct = function() {
		var router = o.getAttribute("data-router");
		if (router) {
			o.router = eval(router);
		}

		var pushState = o.getAttribute("data-pushstate");
		if (pushState) {
			o.pushState = eval(pushState);
		}

	};

	o.onReleaseEventButton = o.onReleaseEvent;

	o.onReleaseEvent = function(event) {
		this.onReleaseEventButton(event);

		if (this.router) {
			var path = this.getPath();
			if (path) {
				this.router.setLocation(path, this.pushState);
			}
		} else {
			throw("No router on RouterButton", this);
		}
	};

	o.getPath = function() {
		return this.href;
	};

	o.construct();

	return o;

};