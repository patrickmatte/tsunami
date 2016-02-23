(function() {

	tsunami.Style = function(element) {

		this.element = element;

		this.units = {
			marginTop:"px",
			marginBottom:"px",
			marginRight:"px",
			marginLeft:"px",
			width:"px",
			height:"px",
			left:"px",
			top:"px",
			right:"px",
			bottom:"px",
			translateX:"px",
			translateY:"px",
			translateZ:"px"
		};

		this._transform = "";
	};

	var p = tsunami.Style.prototype;

	Object.defineProperty(p, 'marginTop', {
		get: function() {
			return eval(this.element.style.marginTop.split(this.units.marginTop)[0]) || 0;
		},
		set: function(value) {
			this.element.style.marginTop = value + this.units.marginTop;
		}
	});

	Object.defineProperty(p, 'marginBottom', {
		get: function() {
			return eval(this.element.style.marginBottom.split(this.units.marginBottom)[0]) || 0;
		},
		set: function(value) {
			this.element.style.marginBottom = value + this.units.marginBottom;
		}
	});

	Object.defineProperty(p, 'marginRight', {
		get: function() {
			return eval(this.element.style.marginRight.split(this.units.marginRight)[0]) || 0;
		},
		set: function(value) {
			this.element.style.marginRight = value + this.units.marginRight;
		}
	});

	Object.defineProperty(p, 'marginLeft', {
		get: function() {
			return eval(this.element.style.marginLeft.split(this.units.marginLeft)[0]) || 0;
		},
		set: function(value) {
			this.element.style.marginLeft = value + this.units.marginLeft;
		}
	});

	Object.defineProperty(p, 'width', {
		get: function() {
			return eval(this.element.style.width.split(this.units.width)[0]) || 0;
		},
		set: function(value) {
			this.element.style.width = value + this.units.width;
		}
	});

	Object.defineProperty(p, 'height', {
		get: function() {
			return eval(this.element.style.height.split(this.units.height)[0]) || 0;
		},
		set: function(value) {
			this.element.style.height = value + this.units.height;
		}
	});

	Object.defineProperty(p, 'left', {
		get: function() {
			return eval(this.element.style.left.split(this.units.left)[0]) || 0;
		},
		set: function(value) {
			this.element.style.left = value + this.units.left;
		}
	});

	Object.defineProperty(p, 'top', {
		get: function() {
			return eval(this.element.style.top.split(this.units.top)[0]) || 0;
		},
		set: function(value) {
			this.element.style.top = value + this.units.top;
		}
	});

	Object.defineProperty(p, 'right', {
		get: function() {
			return eval(this.element.style.right.split(this.units.right)[0]) || 0;
		},
		set: function(value) {
			this.element.style.right = value + this.units.right;
		}
	});

	Object.defineProperty(p, 'bottom', {
		get: function() {
			return eval(this.element.style.bottom.split(this.units.bottom)[0]) || 0;
		},
		set: function(value) {
			this.element.style.bottom = value + this.units.bottom;
		}
	});

	Object.defineProperty(p, 'opacity', {
		get: function() {
			return (isNaN(this.element.style.opacity))?1:this.element.style.opacity;
		},
		set: function(value) {
			this.element.style.opacity = value;
		}
	});

	p.transformSpace = function() {
		return (this.transform)?" ":"";
	};

	Object.defineProperty(p, 'translateX', {
		get: function() {
			return (isNaN(this._translateX))?0:this._translateX;
		},
		set: function(value) {
			this._translateX = value;
			this.transform += this.transformSpace() + "translateX(" + value + this.units.translateX + ")";
		}
	});

	Object.defineProperty(p, 'translateY', {
		get: function() {
			return (isNaN(this._translateY))?0:this._translateY;
		},
		set: function(value) {
			this._translateY = value;
			this.transform += this.transformSpace() + "translateY(" + value + this.units.translateY + ")";
		}
	});

	Object.defineProperty(p, 'translateZ', {
		get: function() {
			return (isNaN(this._translateZ))?0:this._translateZ;
		},
		set: function(value) {
			this._translateZ = value;
			this.transform += this.transformSpace() + "translateZ(" + value + this.units.translateZ + ")";
		}
	});

	Object.defineProperty(p, 'scale', {
		get: function() {
			return this.scaleX;
		},
		set: function(value) {
			this.scaleX = value;
			this.scaleY = value;
		}
	});

	Object.defineProperty(p, 'scaleX', {
		get: function() {
			return (isNaN(this._scaleX))?1:this._scaleX;
		},
		set: function(value) {
			this._scaleX = value;
			this._transform += this.transformSpace() + "scaleX(" + value + ")";
		}
	});

	Object.defineProperty(p, 'scaleY', {
		get: function() {
			return (isNaN(this._scaleY))?1:this._scaleY;
		},
		set: function(value) {
			this._scaleY = value;
			this._transform += this.transformSpace() + "scaleY(" + value + ")";
		}
	});

	Object.defineProperty(p, 'scaleZ', {
		get: function() {
			return (isNaN(this._scaleZ))?1:this._scaleZ;
		},
		set: function(value) {
			this._scaleZ = value;
			this._transform += this.transformSpace() + "scaleZ(" + value + ")";
		}
	});

	Object.defineProperty(p, 'rotateX', {
		get: function() {
			return (isNaN(this._rotateX))?0:this._rotateX;
		},
		set: function(value) {
			this._rotateX = value;
			this._transform += this.transformSpace() + "rotateX(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotateY', {
		get: function() {
			return (isNaN(this._rotateY))?0:this._rotateY;
		},
		set: function(value) {
			this._rotateY = value;
			this._transform += this.transformSpace() + "rotateY(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotateZ', {
		get: function() {
			return (isNaN(this._rotateZ))?0:this._rotateZ;
		},
		set: function(value) {
			this._rotateZ = value;
			this._transform += this.transformSpace() + "rotateZ(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'rotate', {
		get: function() {
			return (isNaN(this._rotate))?0:this._rotate;
		},
		set: function(value) {
			this._rotate = value;
			this._transform += this.transformSpace() + "rotate(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'skewX', {
		get: function() {
			return (isNaN(this._skewX))?0:this._skewX;
		},
		set: function(value) {
			this._skewX = value;
			this._transform += this.transformSpace() + "skewX(" + value + "deg)";
		}
	});

	Object.defineProperty(p, 'skewY', {
		get: function() {
			return (isNaN(this._skewY))?0:this._skewY;
		},
		set: function(value) {
			this._skewY = value;
			this._transform += this.transformSpace() + "skewY(" + value + "deg)";
		}
	});

	p.updateTransform = function() {
		var style = this.element.style;
		var transform = this.getTransform();
		style.msTransform = transform;
		style.webkitTransform = transform;
		//style.oTransform = transform;
		style.transform = transform;
		this.setTransform("");
	};

	p.setTransform = function(value) {
		this._transform = value;
	};

	p.getTransform = function() {
		return this._transform;
	};

}());
