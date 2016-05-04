(function() {
	
	tsunami.geom.Vector3D = function(x, y, z) {
		this.constructor(x, y, z);
	};
	
	var c = tsunami.geom.Vector3D;
	var p = c.prototype;
	
	p.constructor = function(x, y, z) {
		if (isNaN(x)) x = 0;
		if (isNaN(y)) y = 0;
		if (isNaN(z)) z = 0;
		this.x = x;
		this.y = y;
		this.z = z;
	};
	
	p.clone = function() {
		return new tsunami.geom.Vector3D(this.x, this.y, this.z);
	};
	
	p.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
		this.z += vector.z;
		return this;
	};
	
	p.multiply = function(vector) {
		this.x = this.x * vector.x;
		this.y = this.y * vector.y;
		this.z = this.z * vector.z;
		return this;
	};
	
	p.divide = function(vector) {
		this.x = this.x / vector.x;
		this.y = this.y / vector.y;
		this.z = this.z / vector.z;
		return this;
	};
	
	p.copyFrom = function(vector) {
		this.x = vector.x;
		this.y = vector.y;
		this.z = vector.z;
		return this;
	};
	
	p.subtract = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	};
	
	p.toString = function() {
		return "[Vector3D" + " x=" + this.x + " y=" + this.y + " z=" + this.z + "]";
	};
	
	c.interpolate = function(v1, v2, position) {
		var x = (v1.x + v2.x) * position;
		var y = (v1.y + v2.y) * position;
		var z = (v1.z + v2.z) * position;
		return new tsunami.geom.Vector3D(x, y, z);
	};
	
	c.distance = function(v1, v2) {
		return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z));
	};
	
	c.polar = function(length, radians) {
		var vector = new tsunami.geom.Vector3D();
		vector.x = length * Math.cos(radians);
		vector.y = length * Math.sin(radians);
		return vector;
	};

	c.spherePoint = function(radius, radiansX, radiansY) {
		var xCoord2 = radius * Math.cos(radiansX);
		var yCoord2 = radius * Math.sin(radiansX);
		var xCoord = xCoord2 * Math.cos(radiansY);
		var yCoord = xCoord2 * Math.sin(radiansY);
		return new tsunami.geom.Vector3D(xCoord, yCoord2, yCoord);
	};

}());
