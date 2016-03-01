tsunami = this.tsunami || {};
tsunami.geom = tsunami.geom || {};

(function() {

	tsunami.geom.Rectangle = function(x, y, width, height) {
		this.x = (isNaN(x))?0:x;
		this.y = (isNaN(y))?0:y;
		this.width = (isNaN(width))?0:width;
		this.height = (isNaN(height))?0:height;
	};
	
	var p = tsunami.geom.Rectangle.prototype;

    p.containsPoint = function(point) {
		var hit = (point.x >= this.x && point.x <= this.x + this.width && point.y >= this.y && point.y <= this.y + this.height)?true:false;
		return hit;
    };

	p.intersects = function(rect) {
		return rect.x + rect.width > this.x && rect.y + rect.height > this.y && rect.x < this.x + this.width && rect.y < this.y + this.height;
	};

	p.equals = function(rect) {
		return (this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height);
	};

	p.clone = function(rect) {
		return new tsunami.geom.Rectangle(this.x, this.y, this.width, this.height);
	};

	p.copyFrom = function(rect) {
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
	};

	p.scale = function(x, y) {
		return new tsunami.geom.Rectangle(this.x, this.y, this.width * x, this.height * y);
	};

	p.getScaleToFill = function(rect) {
		var scale;
		var thisSize = this.width / this.height;
		var rectSize = rect.width / rect.height;
		if (thisSize > rectSize) {
			scale = rect.height / this.height;
		} else {
			scale = rect.width / this.width;
		}
		return scale;
	};

	p.getScaleToFit = function(rect) {
		var scale;
		var thisSize = this.width / this.height;
		var rectSize = rect.width / rect.height;
		if (thisSize > rectSize) {
			scale = rect.width / this.width;
		} else {
			scale = rect.height / this.height;
		}
		return scale;
	};

	p.getSize = function() {
		return new tsunami.geom.Point(this.width, this.height);
	};

	p.toString = function() {
		return "[Rectangle" + " x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
	};
	
}());