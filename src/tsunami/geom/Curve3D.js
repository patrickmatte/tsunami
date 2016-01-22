function Curve3D(segments) {
	if (!segments) {
		segments = [];
	}
	this.segments = segments;
}

Curve3D.prototype.getPointOnPath = function (position) {
	var object = {};
	if (this.segments.length > 0) {
		var m = this.segments.length * position;
		var i = Math.floor(m);
		i = Math.min(this.segments.length - 1, i);
		var segment = this.segments[i];
		object.vector = segment.getPointOnSegment(m - i);
		object.angleX = segment.getAngleX();
		object.angleY = segment.getAngleY();
	}
	return object;
}

Curve3D.prototype.addSegment = function (segment) {
	this.segments.push(segment);
}

Curve3D.prototype.removeSegment = function () {
	this.segments.shift();
}