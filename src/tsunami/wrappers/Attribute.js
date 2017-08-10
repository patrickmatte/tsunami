tsunami = this.tsunami || {};

(function() {

    tsunami.Attribute = function(element, attributeName, model, unit) {
        this.modelChangeBind = this.modelChange.bind(this);
        this.element = element;
        this.attributeName = attributeName;
        this.unit = unit;
        this.model = model;
    };

    var p = tsunami.Attribute.prototype;

    p.constructor = tsunami.Attribute;

    Object.defineProperty(p, 'model', {
        get: function() {
            return this.getModel();
        },
        set: function(value) {
            this.setModel(value);
        }
    });

    p.getModel = function() {
        return this._model;
    };

    p.setModel = function(value) {
        if (this._model) {
            if (this._model instanceof tsunami.Data) {
                this._model.removeEventListener("change", this.modelChangeBind);
            }
        }
        this._model = value;
        if (value) {
            if (value instanceof tsunami.Data) {
                value.addEventListener("change", this.modelChangeBind);
                this.modelChange();
            } else {
                this.updateValue(value);
            }
        } else {
            this.updateValue("");
        }
    };

    p.modelChange = function(event) {
        this.updateValue(this._model.value);
    };

    p.updateValue = function(value) {
        var string = value.toString();
        if (string && this.unit) {
            string += this.unit;
        }
        this.element.setAttribute(this.attributeName, string);
    };

}());