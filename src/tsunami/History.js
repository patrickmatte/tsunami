tsunami = this.tsunami || {};

(function() {

	tsunami.HistoryFallback = {
		HASH:"hash",
		RELOAD:"reload"
	};

	tsunami.History = function() {
		this.construct();
	};
	
	var p = tsunami.History.prototype = new tsunami.EventDispatcher();

	p.constructEventDispatcher = p.construct;

	p.construct = function() {
		this.constructEventDispatcher();

		this.hasPushed = false;

		this.fragment = "";
		
		this.hash = "#!";

		this.state = null;
		this._updateOnHashChange = true;

		this.historyIsAvailable = (history.pushState)?true:false;

		if (this.historyIsAvailable) {
			window.onpopstate = this._popStateHandler.bind(this);
		} else if (this.fallback == "hashChange") {
			window.onhashchange = this._hashChangeHandler.bind(this);
		}
	};

	p.start = function(base, fragment) {
		this.base = base;
		this.fragment = fragment;

		this.state = {};
		if (location.hash.indexOf(this.hash) != -1) {
			this.state.path = base + fragment + window.location.hash.split(this.hash)[1];
			if (this.state.path != base && this.historyIsAvailable) {
				history.replaceState(this.state, "", this.state.path);
			}
		} else {
			this.state.path = window.location.href;
			if (this.state.path != base) {
				if (!this.historyIsAvailable) {
					if (this.fallback == tsunami.HistoryFallback.HASH) {
						if (!location.hash) {
							var deeplink = this.state.path.split(base)[1];
							this._updateOnHashChange = false;
							console.log("1");
							location.replace(base + this.hash + deeplink);
						}
					} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
						if (location.hash) {
							console.log("2");
							location.replace(base + fragment + this.state.path);
						}
					}
				} else {
					//console.log("3");
					//this.replaceState({path:this.state.path}, "", this.state.path);
				}
			}
		}
		//console.log("4");
		this.dispatchEvent({type:"popstate", state:{path:this.state.path}});
	};

	p.pushState = function(state, title, url) {
		this.hasPushed = true;

		this.state = state;
		if (this.historyIsAvailable) {
			history.pushState(this.state, title, url);
		} else if (this.fallback == tsunami.HistoryFallback.HASH) {
			this._updateOnHashChange = false;
			window.location.href = this.hash + this.state.path.split(this.base + this.fragment)[1];
		} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
			location.assign(url);
		}
	};

	p.replaceState = function(state, title, url) {
		this.state = state;
		if (this.historyIsAvailable) {
			history.replaceState(this.state, title, url);
		} else if (this.fallback == tsunami.HistoryFallback.HASH) {
			this._updateOnHashChange = false;
			location.replace(this.hash + this.state.path);
		} else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
			location.replace(url);
		}
	};

	p._popStateHandler = function(event) {
		if (!this.hasPushed) {
			return;
		}
		this.state = event.state;
		this.dispatchEvent({type:"popstate", state:event.state});
	};

	p._hashChangeHandler = function(e) {
		if (this._updateOnHashChange) {
			var path = location.hash.split(this.hash)[1] || "";
			this.state = {path:this.base + this.fragment + path};
			this.dispatchEvent({type:"popstate", state:this.state});
		} else {
			this._updateOnHashChange = true;
		}
	};

	tsunami.history = new tsunami.History();

}());
