(function() {

	tsunami.DisplayObject = function(o, scope) {

		tsunami.Element(o);

		o.styler = new tsunami.Style(o);

		return o;

	};

}());
