(function() {

	tsunami.DisplayObject = function(o) {

		tsunami.Element(o);

		o.styler = new tsunami.Style(o);

		return o;

	};

}());
