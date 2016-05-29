tsunami = this.tsunami || {};
tsunami.utils = tsunami.utils || {};

(function () {

	tsunami.utils.KeyCode = function(code, data) {
		this.code = code;
		this.pressed = new tsunami.Boolean();
		this.data = data;
	};

})();

(function () {

	tsunami.utils.KeyPressGroup = function(keyCodes) {
		tsunami.EventDispatcher.call(this);
		this.keyCodes = keyCodes;
		this.keyDownBind = this.keyDownHandler.bind(this);
		this.keyUpBind = this.keyUpHandler.bind(this);
		document.addEventListener("keydown", this.keyDownBind);
		document.addEventListener("keyup", this.keyUpBind);
		this.keysPressed = [];
	};

	var p = tsunami.utils.KeyPressGroup.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.utils.KeyPressGroup;

	p.keyDownHandler = function(e) {
		e = e || window.event;
		for (var i = 0; i < this.keyCodes.length; i++) {
			var keyCode = this.keyCodes[i];
			if (keyCode.code == e.keyCode) {
				if (!keyCode.pressed.value) {
					keyCode.pressed.value = true;
				}
				if (this.keysPressed.indexOf(keyCode) == -1) {
					this.keysPressed.push(keyCode);
					if (this.keysPressed.length == 1) {
						this.dispatchEvent({type:"keydown"});
					}
				}
			}
		}
	};

	p.keyUpHandler = function(e) {
		e = e || window.event;

		var keys = [];
		for (var i = 0; i < this.keyCodes.length; i++) {
			var keyCode = this.keyCodes[i];
			if (keyCode.code == e.keyCode) {
				if (keyCode.pressed.value) {
					keyCode.pressed.value = false;
				}

				var keys = [];
				for (var j = 0; j < this.keysPressed.length; j++) {
					var keyPressed = this.keysPressed[j];
					if (keyPressed != keyCode) {
						keys.push(keyPressed);
					}
				}
				this.keysPressed = keys;
				if (this.keysPressed.length == 0) {
					this.dispatchEvent({type:"keyup"});
				}
			}
		}

	};

	p.destroy = function() {
		document.removeEventListener("keydown", this.keyDownBind);
		document.removeEventListener("keyup", this.keyUpBind);
		tsunami.EventDispatcher.destroy.call(this);
	};

})();