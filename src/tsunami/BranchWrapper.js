tsunami = this.tsunami || {};

(function() {

	tsunami.BranchWrapper = function(o) {

		if (!o) {
			o = {};
		}

		o.path = "";

		o.branches = [];

		o.addBranch = function(branch) {
			this.branches.push(branch);
		};

		o.getBranch = function(id) {
			return this.querySelector("." + id);
		};

		o.getDefaultBranch = function() {
			return this.defaultBranch;
		};

		o.load = function() {
			//console.log(this.id, "load");
		};

		o.show = function() {
			//console.log(this.id, "show");
		};

		o.hide = function() {
			//console.log(this.id, "hide");
		};

		o.toString = function() {
			return "[BranchWrapper" + " id=" + this.id + "]";
		};

		return o;

	}


}());



