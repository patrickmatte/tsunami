tsunami = this.tsunami || {};

(function() {

    tsunami.EventDispatcher = function() {
        this.listeners = [];
        this._debug = false;
    };

    var p = tsunami.EventDispatcher.prototype;

    p.setDebug = function(value) {
        this._debug = value;
    };

    p.getDebug = function() {
        return this._debug;
    };

    Object.defineProperty(p, 'debug', {
        get: function() {
            return this.getDebug();
        },
        set: function(value) {
            this.setDebug(value);
        }
    });

    p.addEventListener = function(type, func) {
        this.listeners.push({type:type, func:func});
    };

    p.removeEventListener = function(type, func) {
        var newListeners = [];
        for (var i = 0 ; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            if (listener.type == type && listener.func == func) {

            } else {
                newListeners.push(listener);
            }
        }

        this.listeners = newListeners;
    };

    p.dispatchEvent = function(event) {
        event.target = this;
        if (!event.currentTarget) {
            event.currentTarget = this;
        }
        var listeners = this.listeners.slice();
        for (var i = 0 ; i < listeners.length; i++) {
            var listener = listeners[i];
            if (listener.type == event.type) {
                try {
                    listener.func(event);
                } catch(e) {
                    console.log(e, this);
                }
            }
        }
    };

    p.destroy = function() {
        this.listeners = [];
    };

}());
