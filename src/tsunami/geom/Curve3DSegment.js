function Curve3DSegment(start, control, end) {
	this.start = start;
	this.end = end;
	this.control = control;
}

Curve3DSegment.prototype.getPointOnSegment = function(t) {
	var dt = 1 - t;
	
	var xt = dt * dt * this.start.x + 2 * t * dt * this.control.x + t * t * this.end.x;
	var yt = dt * dt * this.start.y + 2 * t * dt * this.control.y + t * t * this.end.y;
	var zt = dt * dt * this.start.z + 2 * t * dt * this.control.z + t * t * this.end.z;
	
	return new Vector3D(xt, yt, zt);
}

Curve3DSegment.prototype.getAngleY = function() {
	//var radians = Math.atan2(this.end.z - this.start.z, this.end.x - this.start.x);
	//return radians * 180 / Math.PI;
	return Math.atan2(this.end.z - this.start.z, this.end.x - this.start.x);
}

Curve3DSegment.prototype.getAngleX = function() {
	//var radians = Math.atan2(this.end.y - this.start.y, this.end.z - this.start.z);
	//return radians * 180 / Math.PI;
	return Math.atan2(this.end.y - this.start.y, this.end.z - this.start.z);
}

Curve3DSegment.prototype.toString = function() {
	return "[Curve3DSegment" + " start=" + this.start + " control=" + this.control + " end=" + this.end + "]";
}