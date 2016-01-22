(function() {

	tsunami.DisplayObject = function(p) {

		tsunami.Element(p);

		p.construct = function() {
			this.units = {};
			this.units.marginTop = "px";
			this.units.marginBottom = "px";
			this.units.marginRight = "px";
			this.units.marginLeft = "px";
			this.units.width = "px";
			this.units.height = "px";
			this.units.left = "px";
			this.units.top = "px";
			this.units.right = "px";
			this.units.bottom = "px";
			this.units.translateX = "px";
			this.units.translateY = "px";
			this.units.translateZ = "px";

			this.transform = "";
		};

		p.getMarginTop = function() {
			return eval(this.style.marginTop.split(this.units.marginTop)[0]) || 0;
		};

		p.setMarginTop = function(value) {
			this.style.marginTop = value + this.units.marginTop;
		};

		p.getMarginBottom = function() {
			return eval(this.style.marginBottom.split(this.units.marginBottom)[0]) || 0;
		};

		p.setMarginBottom = function(value) {
			this.style.marginBottom = value + this.units.marginBottom;
		};

		p.getMarginRight = function() {
			return eval(this.style.marginRight.split(this.units.marginRight)[0]) || 0;
		};

		p.setMarginRight = function(value) {
			this.style.marginRight = value + this.units.marginRight;
		};

		p.getMarginLeft = function() {
			return eval(this.style.marginLeft.split(this.units.marginLeft)[0]) || 0;
		};

		p.setMarginLeft = function(value) {
			this.style.marginLeft = value + this.units.marginLeft;
		};

		p.getWidth = function() {
			return eval(this.style.width.split(this.units.width)[0]) || 0;
		};

		p.setWidth = function(value) {
			this.style.width = value + this.units.width;
		};

		p.getHeight = function() {
			return eval(this.style.height.split(this.units.height)[0]) || 0;
		};

		p.setHeight = function(value) {
			this.style.height = value + this.units.height;
		};

		p.getLeft = function() {
			return eval(this.style.left.split(this.units.left)[0]) || 0;
		};

		p.setLeft = function(value) {
			this.style.left = value + this.units.left;
		};

		p.getTop = function() {
			return eval(this.style.top.split(this.units.top)[0]) || 0;
		};

		p.setTop = function(value) {
			this.style.top = value + this.units.top;
		};

		p.getRight = function() {
			return eval(this.style.right.split(this.units.right)[0]) || 0;
		};

		p.setRight = function(value) {
			this.style.right = value + this.units.right;
		};

		p.getBottom = function() {
			return eval(this.style.bottom.split(this.units.bottom)[0]) || 0;
		};

		p.setBottom = function(value) {
			this.style.bottom = value + this.units.bottom;
		};

		p.getOpacity = function() {
			return (isNaN(this.opacity))?1:this.opacity;
		};

		p.setOpacity = function(value) {
			this.opacity = value;
			this.style.opacity = this.opacity;
			return this;
		};

		p.transformSpace = function() {
			return (this.transform)?" ":"";
		};

		p.getTranslateX = function() {
			return (isNaN(this.translateX))?0:this.translateX;
		};

		p.setTranslateX = function(value) {
			this.translateX = value;
			this.transform += this.transformSpace() + "translateX(" + value + this.units.translateX + ")";
		};

		p.getTranslateY = function() {
			return (isNaN(this.translateY))?0:this.translateY;
		};

		p.setTranslateY = function(value) {
			this.translateY = value;
			this.transform += this.transformSpace() + "translateY(" + value + this.units.translateY + ")";
		};

		p.getTranslateZ = function() {
			return (isNaN(this.translateZ))?0:this.translateZ;
		};

		p.setTranslateZ = function(value) {
			this.translateZ = value;
			this.transform += this.transformSpace() + "translateZ(" + value + this.units.translateZ + ")";
		};

		p.getScale = function() {
			return this.getScaleX();
		};

		p.setScale = function(value) {
			this.setScaleX(value);
			this.setScaleY(value);
		};

		p.getScaleX = function() {
			return (isNaN(this.scaleX))?1:this.scaleX;
		};

		p.setScaleX = function(value) {
			this.scaleX = value;
			this.transform += this.transformSpace() + "scaleX(" + value + ")";
		};

		p.getScaleY = function() {
			return (isNaN(this.scaleY))?1:this.scaleY;
		};

		p.setScaleY = function(value) {
			this.scaleY = value;
			this.transform += this.transformSpace() + "scaleY(" + value + ")";
		};

		p.getScaleZ = function() {
			return (isNaN(this.scaleZ))?1:this.scaleZ;
		};

		p.setScaleZ = function(value) {
			this.scaleZ = value;
			this.transform += this.transformSpace() + "scaleZ(" + value + ")";
		};

		p.getRotateX = function() {
			return (isNaN(this.rotateX))?0:this.rotateX;
		};

		p.setRotateX = function(value) {
			this.rotateX = value;
			this.transform += this.transformSpace() + "rotateX(" + value + "deg)";
		};

		p.getRotateY = function() {
			return (isNaN(this.rotateY))?0:this.rotateY;
		};

		p.setRotateY = function(value) {
			this.rotateY = value;
			this.transform += this.transformSpace() + "rotateY(" + value + "deg)";
		};

		p.getRotateZ = function() {
			return (isNaN(this.rotateZ))?0:this.rotateZ;
		};

		p.setRotateZ = function(value) {
			this.rotateZ = value;
			this.transform += this.transformSpace() + "rotateZ(" + value + "deg)";
		};

		p.getRotate = function() {
			return (isNaN(this.rotate))?0:this.rotate;
		};

		p.setRotate = function(value) {
			this.rotate = value;
			this.transform += this.transformSpace() + "rotate(" + value + "deg)";
		};

		p.getSkewX = function() {
			return (isNaN(this.skewX))?0:this.skewX;
		};

		p.setSkewX = function(value) {
			this.skewX = value;
			this.transform += this.transformSpace() + "skewX(" + value + "deg)";
		};

		p.getSkewY = function() {
			return (isNaN(this.skewY))?0:this.skewY;
		};

		p.setSkewY = function(value) {
			this.skewY = value;
			this.transform += this.transformSpace() + "skewY(" + value + "deg)";
		};

		p.updateTransform = function() {
			var style = this.style;
			var transform = this.getTransform();
			style.msTransform = transform;
			style.webkitTransform = transform;
			//style.oTransform = transform;
			style.transform = transform;
			this.setTransform("");
		};

		p.setTransform = function(value) {
			this.transform = value;
		};

		p.getTransform = function() {
			return this.transform;
		};

		p.construct();

		return p;

	};

}());

