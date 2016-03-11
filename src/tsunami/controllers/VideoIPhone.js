(function() {

	tsunami.VideoIPhone = function(o) {

		Object.defineProperty(o, 'src_audio', {
			get: function() {
				return this.getAttribute("src_audio");
			},
			set: function(value) {
				this.setAttribute("src_audio", value);
			}
		});

		o.isIphone = (navigator.userAgent.toLowerCase().indexOf("iphone") != -1);

		//o.isIphone = true;

		if (o.isIphone) {

			var canvas = document.createElement("canvas");
			canvas.video = o;
			o.canvas = canvas;

			canvas.construct = function() {
				this.ctx = this.getContext("2d");

				//this.videoReadyHandler = this.videoReady.bind(this);
				this.drawFirstFrameHandler = this.drawFirstFrame.bind(this);

				this.animateHandler = this.animate.bind(this);

				this.id = this.video.id;
				this.className = this.video.className;

				this.video.parentNode.insertBefore(this, this.video);
				this.video.parentNode.removeChild(this.video);
				//document.querySelector("#intro").appendChild(this.video);

				if (this.video.src) {
					this.load();
				}

				this.src_audio = this.video.src_audio;

				if (this.video.readyState != 4) {
					this.video.addEventListener("loadeddata", this.drawFirstFrameHandler);
				} else {
					this.drawFirstFrame();
				}

				this._paused = this.video.paused;
				if (!this._paused) {
					this.play();
				}
			};

			Object.defineProperty(canvas, 'currentTime', {
				get: function() {
					return this.video.currentTime;
				},
				set: function(value) {
					this.video.currentTime = value;
					if (this.audio) {
						this.audio.currentTime = value;
					}
					setTimeout(this.drawFrame.bind(this), 10);
				}
			});

			Object.defineProperty(canvas, 'poster', {
				get: function() {
					return this.video.poster;
				},
				set: function(value) {
					this.video.poster = value;
				}
			});

			Object.defineProperty(canvas, 'paused', {
				get: function() {
					return this._paused;
				}
			});

			Object.defineProperty(canvas, 'volume', {
				get: function() {
					return this.video.volume;
				},
				set: function(value) {
					this.video.volume = value;
					if (this.audio) {
						this.audio.volume = value;
					}
				}
			});

			Object.defineProperty(canvas, 'loop', {
				get: function() {
					return this.video.loop;
				},
				set: function(value) {
					this.video.loop = value;
				}
			});

			Object.defineProperty(canvas, 'src', {
				get: function() {
					return this.video.src;
				},
				set: function(value) {
					this.video.addEventListener("loadeddata", this.drawFirstFrameHandler);
					this.video.src = value;
					this.video.load();
				}
			});

			Object.defineProperty(canvas, 'src_audio', {
				get: function() {
					return this.video.src_audio;
				},
				set: function(value) {
					if (this.audio) {
						this.audio.pause();
						this.audio = null;
					}
					if (value) {
						this.video.src_audio = value;
						this.audio = document.createElement("audio");
						this.audio.id = "audio";
						this.audio.src = value;
						this.audio.load();
					}
				}
			});


			Object.defineProperty(canvas, 'duration', {
				get: function() {
					return this.video.duration;
				}
			});

			Object.defineProperty(canvas, 'videoWidth', {
				get: function() {
					return this.video.videoWidth;
				}
			});

			Object.defineProperty(canvas, 'videoHeight', {
				get: function() {
					return this.video.videoHeight;
				}
			});

			canvas.load = function() {
				if (this.video.src) {
					this.video.load();
				}
			};

			canvas.play = function() {
				this.drawFrame();
				this._paused = false;
				this.videoReadyInterval = setInterval(this.checkVideoReady.bind(this), 100);
				this.checkVideoReady();
			};

			canvas.checkVideoReady = function() {
				var isReady = (this.video.readyState == 4);
				if (isReady && this.audio) {
					isReady = (this.audio.readyState == 4);
				}
				if (isReady) {
					clearInterval(this.videoReadyInterval);
					this.videoReady();
				}
			};

			canvas.videoReady = function(event) {
				this.width = this.video.videoWidth;
				this.height = this.video.videoHeight;
				this.drawFrame();
				if (this.audio) {
					if (Math.round(this.audio.currentTime) == Math.round(this.video.duration)) {
						this.audio.currentTime = 0;
					}
					this.audio.play();
				}
				// if no audio
				this.startDate = new Date();
				this.startTime = this.video.currentTime;
				if (Math.round(this.startTime) == Math.round(this.video.duration)) {
					this.startTime = 0;
				}
				//
				this.animate();
				var event = new CustomEvent("play", {detail: {}});
				this.dispatchEvent(event);
			};

			canvas.pause = function() {
				this._paused = true;
				clearInterval(this.videoReadyInterval);
				//this.video.removeEventListener("canplay", this.videoReadyHandler);
				if (this.audio) {
					this.audio.pause();
				}
				var event = new CustomEvent("pause", {detail: {}});
				cancelAnimationFrame(this.requestID);
				this.dispatchEvent(event);
			};

			canvas.animate = function() {
				var time = (new Date() - this.startDate) / 1000 + this.startTime;
				var duration = this.video.duration;
				if (this.audio) {
					time = this.audio.currentTime;
					if (this.audio.duration < duration) {
						duration = this.audio.duration;
					}
				}
				time = Math.min(time, this.video.duration);
				this.video.currentTime = time;
				this.drawFrame();
				if (Math.abs(time - duration) <= 0.1) {
					var loop = this.video.loop;
					if (loop) {
						//this.pause();
						this.startDate = new Date();
						this.startTime = 0;
						this.currentTime = 0;
						if (this.audio) {
							this.audio.play();
						}
					} else {
						this.pause();
						var event = new CustomEvent("ended", {detail: {}});
						this.dispatchEvent(event);
					}
				}
				if (!this.paused) {
					this.requestID = requestAnimationFrame(this.animateHandler);
				}
			};

			canvas.drawFrame = function() {
				this.ctx.drawImage(this.video, 0, 0);
			};

			canvas.drawFirstFrame = function() {
				this.width = this.video.videoWidth;
				this.height = this.video.videoHeight;
				this.drawFrame();
				this.video.removeEventListener("loadeddata", this.drawFirstFrameHandler);
				if (this.onloadeddata) {
					this.onloadeddata({target:this, currentTarget:this});
				}
			};

			canvas.construct();

		}

		return o;

	};


}());



