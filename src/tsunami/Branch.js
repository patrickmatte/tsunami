tsunami = this.tsunami || {};

(function () {

	tsunami.Branch = function(id, branches) {
		this.id = id;
		this.branches = branches || [];
	};

	var p = tsunami.Branch.prototype;

	p.getBranch = function(id) {
		for (var i = 0; i < this.branches.length; i++) {
			var branch = this.branches[i];
			if (branch.id == id) {
				return branch;
			}
		}
	};

	p.load = function() {
		//console.log("tsunami.Branch.load", this.id);
	};

	p.show = function() {
		//console.log("tsunami.Branch.show", this.id);
	};

	p.hide = function() {
		//console.log("tsunami.Branch.hide", this.id);
	};

}());