function Path3DCurve(segments) {
	this.segments = [];
	this.curve = new Curve3D();
	if (!segments) {
		segments = [];
	}
	var i = 0;
	while(i < segments.length) {
		this.addSegment(segments[i]);
		i = i + 1;
	}
}

Path3DCurve.prototype.getPointOnPath = function(position) {
	return this.curve.getPointOnPath(position);
}

Path3DCurve.prototype.addSegment = function(segment) {
	this.segments.push(segment);
	if (this.segments.length > 1) {
		var curveSegment = new Curve3DSegment();
		curveSegment.start = this.segments[this.segments.length - 2].getPointOnSegment(0.5);
		curveSegment.control = segment.start;
		curveSegment.end = segment.getPointOnSegment(0.5);
		this.curve.addSegment(curveSegment);
	}
}	

Path3DCurve.prototype.removeSegment = function() {
	this.segments.shift();
	this.curve.removeSegment();
}
