(function() {

	tsunami.Style = function(style) {

		this.style = style;

		this.units = new tsunami.StyleUnits();

		this._transform = "";
	};

	var p = tsunami.Style.prototype;

	Object.defineProperty(p, 'fontSize', {
		get: function() {
			return eval(this.style.fontSize.split(this.units.fontSize)[0]) || 0;
		},
		set: function(value) {
			this.style.fontSize = value + this.units.fontSize;
		}
	});

	Object.defineProperty(p, 'marginTop', {
		get: function() {
			return eval(this.style.marginTop.split(this.units.marginTop)[0]) || 0;
		},
		set: function(value) {
			this.style.marginTop = value + this.units.marginTop;
		}
	});

	Object.defineProperty(p, 'marginBottom', {
		get: function() {
			return eval(this.style.marginBottom.split(this.units.marginBottom)[0]) || 0;
		},
		set: function(value) {
			this.style.marginBottom = value + this.units.marginBottom;
		}
	});

	Object.defineProperty(p, 'marginRight', {
		get: function() {
			return eval(this.style.marginRight.split(this.units.marginRight)[0]) || 0;
		},
		set: function(value) {
			this.style.marginRight = value + this.units.marginRight;
		}
	});

	Object.defineProperty(p, 'marginLeft', {
		get: function() {
			return eval(this.style.marginLeft.split(this.units.marginLeft)[0]) || 0;
		},
		set: function(value) {
			this.style.marginLeft = value + this.units.marginLeft;
		}
	});

	Object.defineProperty(p, 'width', {
		get: function() {
			return eval(this.style.width.split(this.units.width)[0]) || 0;
		},
		set: function(value) {
			this.style.width = value + this.units.width;
		}
	});

	Object.defineProperty(p, 'height', {
		get: function() {
			return eval(this.style.height.split(this.units.height)[0]) || 0;
		},
		set: function(value) {
			this.style.height = value + this.units.height;
		}
	});

	Object.defineProperty(p, 'left', {
		get: function() {
			return eval(this.style.left.split(this.units.left)[0]) || 0;
		},
		set: function(value) {
			this.style.left = value + this.units.left;
		}
	});

	Object.defineProperty(p, 'top', {
		get: function() {
			return eval(this.style.top.split(this.units.top)[0]) || 0;
		},
		set: function(value) {
			this.style.top = value + this.units.top;
		}
	});

	Object.defineProperty(p, 'right', {
		get: function() {
			return eval(this.style.right.split(this.units.right)[0]) || 0;
		},
		set: function(value) {
			this.style.right = value + this.units.right;
		}
	});

	Object.defineProperty(p, 'bottom', {
		get: function() {
			return eval(this.style.bottom.split(this.units.bottom)[0]) || 0;
		},
		set: function(value) {
			this.style.bottom = value + this.units.bottom;
		}
	});

	Object.defineProperty(p, 'opacity', {
		get: function() {
			return (isNaN(this.style.opacity))?1:this.style.opacity;
		},
		set: function(value) {
			this.style.opacity = value;
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
			this._transform += this.transformSpace() + "translateX(" + value + this.units.translateX + ")";
		}
	});

	Object.defineProperty(p, 'translateY', {
		get: function() {
			return (isNaN(this._translateY))?0:this._translateY;
		},
		set: function(value) {
			this._translateY = value;
			this._transform += this.transformSpace() + "translateY(" + value + this.units.translateY + ")";
		}
	});

	Object.defineProperty(p, 'translateZ', {
		get: function() {
			return (isNaN(this._translateZ))?0:this._translateZ;
		},
		set: function(value) {
			this._translateZ = value;
			this._transform += this.transformSpace() + "translateZ(" + value + this.units.translateZ + ")";
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
		var style = this.style;
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

	p.destroy = function() {
		this.style = null;
	};

	tsunami.StyleUnits = function() {
		this.fontSize = "px";
		this.marginTop = "px";
		this.marginBottom = "px";
		this.marginRight = "px";
		this.marginLeft = "px";
		this.width = "px";
		this.height = "px";
		this.left = "px";
		this.top = "px";
		this.right = "px";
		this.bottom = "px";
		this.translateX = "px";
		this.translateY = "px";
		this.translateZ = "px";
	};

}());
