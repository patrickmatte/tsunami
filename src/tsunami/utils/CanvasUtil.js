(function() {

	tsunami.CanvasUtil = function() {};
	
	var c = tsunami.CanvasUtil;
	
	var p = tsunami.CanvasUtil.prototype;
	
	c.patternFill = function(canvas, pattern) {
		var ctx = canvas.getContext("2d");
		var x = 0;
		var y = 0;
		while (y < canvas.height) {
			x = 0;
			while (x < canvas.width) {
				ctx.drawImage(pattern, x, y);
				x += pattern.width;
			}
			y += pattern.height;
		}
	};
	
	c.cloneImage = function(image, scaleX, scaleY, canvas) {
		if (isNaN(scaleX)) {
			scaleX = 1;
		}
		if (isNaN(scaleY)) {
			scaleY = 1;
		}
		if (canvas == null) {
			canvas = document.createElement("canvas");
		}
		canvas.width = image.width * scaleX;
		canvas.height = image.height * scaleY;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
		return canvas;
	}
	
}());