tsunami = this.tsunami || {};

(function() {

    tsunami.HistoryFallback = {
        HASH:"hash",
        RELOAD:"reload"
    };

    tsunami.History = function(base, fragment, fallback) {
        tsunami.EventDispatcher.call(this);

        this.base = base;
        this.fragment = fragment;
        this.fallback = fallback;

        this.hasPushed = false;

        this.hash = "#!";

        this.state = null;
        this._updateOnHashChange = true;

        this.historyIsAvailable = (history.pushState)?true:false;

        if (this.historyIsAvailable) {
            window.onpopstate = this._popStateHandler.bind(this);
        } else if (this.fallback == tsunami.HistoryFallback.HASH) {
            window.onhashchange = this._hashChangeHandler.bind(this);
        }
    };

    var p = tsunami.History.prototype = Object.create(tsunami.EventDispatcher.prototype);

    p.constructor = tsunami.History;

    p.start = function() {
        this.state = {};
        if (location.hash.indexOf(this.hash) != -1) {
            this.state.path = this.base + this.fragment + window.location.hash.split(this.hash)[1];
            if (this.state.path != this.base && this.historyIsAvailable) {
                history.replaceState(this.state, "", this.state.path);
            }
        } else {
            this.state.path = window.location.href;
            if (this.state.path != this.base) {
                if (!this.historyIsAvailable) {
                    if (this.fallback == tsunami.HistoryFallback.HASH) {
                        if (!location.hash) {
                            var deeplink = this.state.path.split(this.base)[1];
                            deeplink = deeplink.split(this.fragment)[1];
                            this._updateOnHashChange = false;
                            location.replace(this.base + this.hash + deeplink);
                        }
                    } else if(this.fallback == tsunami.HistoryFallback.RELOAD) {
                        if (location.hash) {
                            location.replace(this.base + this.fragment + this.state.path);
                        }
                    }
                } else {
                    //this.replaceState({path:this.state.path}, "", this.state.path);
                }
            }
        }
        this.dispatchEvent({type:"popstate", state:{path:this.state.path}});
    };

    p.pushState = function(state, title, url) {
        console.log();
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
            //return;
        }
        var state = event.state;
        if (state == null) {
            state = {path:window.location.href};
        }
        this.state = state;
        this.dispatchEvent({type:"popstate", state:state});
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

}());