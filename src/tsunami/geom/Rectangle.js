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

	p.intersect = function(b) {
		var a = this;
		var x = Math.max(a.x, b.x);
		var num1 = Math.min(a.x + a.width, b.x + b.width);
		var y = Math.max(a.y, b.y);
		var num2 = Math.min(a.y + a.height, b.y + b.height);
		var result;
		if (num1 >= x && num2 >= y) {
			result = new tsunami.geom.Rectangle(x, y, num1 - x, num2 - y);
		} else {
			result = new tsunami.geom.Rectangle();
		}
		return result;
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

	Object.defineProperty(p, 'size', {
		get: function() {
			return this.getSize();
		},
		set: function(value) {
			this.setSize(value);
		}
	});

	p.getSize = function() {
		return new tsunami.geom.Point(this.width, this.height);
	};

	p.setSize = function(point) {
		this.width = point.x;
		this.height = point.y;
	};

	p.toString = function() {
		return "[Rectangle" + " x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + "]";
	};
	
}());