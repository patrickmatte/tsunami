tsunami = this.tsunami || {};

(function () {

	tsunami.Branch = function(id, branches, defaultBranch) {
		this.construct(id, branches, defaultBranch);
	};

	var p = tsunami.Branch.prototype;

	p.construct = function(id, branches, defaultBranch) {
		this.id = id;
		this.branches = branches || [];
		this.defaultBranch = defaultBranch;
	};

	p.getBranch = function(id) {
		for (var i = 0; i < this.branches.length; i++) {
			var branch = this.branches[i];
			if (branch.id == id) {
				return branch;
			}
		}
	};

	p.getDefaultBranch = function() {
		return this.defaultBranch;
	};

	p.load = function() {
		console.log("tsunami.Branch.load", this.id);
	};

	p.show = function() {
		console.log("tsunami.Branch.show", this.id);
	};

	p.hide = function() {
		console.log("tsunami.Branch.hide", this.id);
	};

}());