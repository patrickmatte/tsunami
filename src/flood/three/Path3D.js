(function() {

	tsunami.geom.Path3D = function (segments) {
		if (!segments) {
			segments = [];
		}
		var i = 0;
		while(i < segments.length) {
			this.addSegment(segments[i]);
			i = i + 1;
		}
	}
	
	var c = tsunami.geom.Path3D;
	var p = c.prototype;
	
	p.getPointOnPath = function(position) {
		position = (position < 0) ? 0 : (position > 1) ? 1 : position;
		var m = this.segments.length * position;
		var i = Math.floor(m);
		var nT = m - i;
		var segment = this.segments[i];
		return segment.getPointOnSegment(nT);
	}
	
	p.addSegment = function(segment) {
		this.segments.push(segment);
	}
	
	p.removeSegment = function() {
		this.segments.shift();
	}


}());