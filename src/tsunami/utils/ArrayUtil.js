tsunami = this.tsunami || {};

(function() {

	tsunami.ArrayUtil = function() {};
	
	var c = tsunami.ArrayUtil;
	
	var p = tsunami.ArrayUtil.prototype;
	
	c.shuffle = function(o) {
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

}());