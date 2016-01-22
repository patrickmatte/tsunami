tsunami = this.tsunami || {};
tsunami.geom = tsunami.geom || {};

(function() {

	tsunami.geom.Point = function(x, y) {
		this.constructor(x, y);
	};

    var c = tsunami.geom.Point;
    var p = tsunami.geom.Point.prototype;

    p.constructor = function(x, y) {
		this.x = (isNaN(x))?0:x;
		this.y = (isNaN(y))?0:y;
	};
	
	p.clone = function() {
		return new tsunami.geom.Point(this.x, this.y);
	};

	p.add = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x + p.x;
		point.y = this.y + p.y;
		return point;
	};

	p.multiply = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x * p.x;
		point.y = this.y * p.y;
		return point;
	};

	p.divide = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x / p.x;
		point.y = this.y / p.y;
		return point;
	};

	p.equals = function(point) {
		return (this.x == point.x && this.y == point.y);
	};

	p.copyFrom = function(p) {
		this.x = p.x;
		this.y = p.y;
	};

	p.subtract = function(p) {
		var point = new tsunami.geom.Point();
		point.x = this.x - p.x;
		point.y = this.y - p.y;
		return point;
	};

	p.clamp = function(minX, maxX, minY, maxY) {
		this.clampX(minX, maxX);
		this.clampY(minY, maxY);
	};

	p.clampX = function(min, max) {
		this.x = Math.max(this.x, min);
		this.x = Math.min(this.x, max);
	};

	p.clampY = function(min, max) {
		this.y = Math.max(this.y, min);
		this.y = Math.min(this.y, max);
	};

	p.toString = function() {
		return "[Point" + " x=" + this.x + " y=" + this.y + "]";
	};

	c.distance = function(p1, p2) {
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	};

	c.polar = function(len, radians) {
		return new tsunami.geom.Point(len * Math.cos(radians), len * Math.sin(radians));
	};
	
}());