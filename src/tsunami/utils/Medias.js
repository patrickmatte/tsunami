tsunami = this.tsunami || {};
tsunami.utils = tsunami.utils || {};

(function() {

	tsunami.utils.Medias = function(medias) {
		tsunami.EventDispatcher.call(this);
		this.medias = medias || new Array();
	};

	tsunami.utils.Medias.CHANGE = "change";

	var p = tsunami.utils.Medias.prototype = Object.create(tsunami.EventDispatcher.prototype);

	p.constructor = tsunami.utils.Medias;

	p.mqlListener = function(event) {
		if (event.matches) {
			for (var i = 0; i < this.medias.length; i++) {
				var media = this.medias[i];
				if (media.mql.media == event.media) {
					this.mql = media.mql;
					this.data = media.data;
				}
			}
		}
		this.dispatchEvent({type:tsunami.utils.Medias.CHANGE});
	};

	p.matchMedia = function(media, data) {
		var mql = window.matchMedia(media);
		mql.addListener(this.mqlListener.bind(this));
		if (mql.matches) {
			this.mql = mql;
			this.data = data;
		}
		this.medias.push({
			mql:mql,
			data:data
		});
	};

}());



