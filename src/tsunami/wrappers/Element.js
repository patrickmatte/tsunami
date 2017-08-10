tsunami = this.tsunami || {};

(function () {

    tsunami.Element = function(prototype) {

        prototype.createdCallback = function() {
            this.debug = this.classList.contains("debug-this");
            this.styleManager = new tsunami.Style(this.style);
            this.modelChangeBind = this.modelChange.bind(this);
            this._scope = this;
        };

        Object.defineProperty(prototype, 'scope', {
            get: function() {
                return this.getScope();
            },
            set: function(value) {
                this.setScope(value);
            }
        });

        prototype.getScope = function() {
            return this._scope;
        };

        prototype.setScope = function(value) {
            this._scope = value;

            var model = this.getAttribute("data-model");
            if (model) {
                this.model = tsunami.evalProperty(model, value);
                this.removeAttribute("model");
            }

            this.attributesBinder = [];

            var removeAttributes = [];
            for (var i = 0; i < this.attributes.length; i++) {
                var attribute = this.attributes[i];
                if (attribute.name.indexOf("data-attr-") == 0) {
                    var attr = attribute.name.split("data-attr-")[1];
                    var attrModel = tsunami.evalProperty(attribute.value, value);
                    removeAttributes.push(attribute.name);
                    this.attributesBinder.push(new tsunami.Attribute(this, attr, attrModel, ""));
                }
            }

            for (var j = 0; j < removeAttributes.length; j++) {
                var attribute = removeAttributes[j];
                this.removeAttribute(attribute);
            }

        };

        Object.defineProperty(prototype, 'model', {
            get: function() {
                return this.getModel();
            },
            set: function(value) {
                this.setModel(value);
            }
        });

        prototype.getModel = function() {
            return this._model;
        };

        prototype.setModel = function(value) {
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

            }
        };

        prototype.modelChange = function(event) {
            this.updateValue(this._model.value);
        };

        prototype.updateValue = function(value) {

        };

        prototype.destroy = function() {
            this.model = null;
            this.styleManager.destroy();
            this.innerHTML = "";
            this.scope = null;
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };

        return prototype;

    };

}());