(function() {
	
	tsunami.geom.Path3DSegment = function(start, end) {
		this.constructor(start, end);
	}
	
	var c = tsunami.geom.Path3DSegment;
	var p = c.prototype;
	
	p.constructor = function(start, end) {
		this.start = start;
		this.end = end;
	}
	
	p.clone = function() {
		return new tsunami.geom.Path3DSegment(this.start.clone(), this.end.clone());
	}

	p.getPointOnSegment = function(position) {
		var x = this.start.x + (this.end.x - this.start.x) * position;
		var y = this.start.y + (this.end.y -this.start.y) * position;
		var z = this.start.z + (this.end.z - this.start.z) * position;
		return new tsunami.geom.Vector3D(x, y, z);
	}
	
	p.getAngleY = function() {
		return Math.atan2(this.end.z - this.start.z, this.end.x - this.start.x);
	}
	
	p.getAngleX = function() {
		return Math.atan2(this.end.y - this.start.y, this.end.z - this.start.z);
	}
	
	p.getAngleZ = function() {
		return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
	}
	
	p.getLength = function() {
		return tsunami.geom.Vector3D.distance(this.start, this.end);
	}
	
	p.toString = function() {
		return "[Path3DSegment" + " start=" + this.start + " end=" + this.end + "]";
	}

}());
