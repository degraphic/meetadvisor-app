var User = function User() {};

User.prototype = {
    isFemale: null,
	email : null,
	isVIP: null,
	
    
    init: function() {
	    this.template = {
		    file: null, 
		    src: null
	    };
	    this.page = {
		    file: null, 
		    src: null
	    };
        this.partial_files = {};
        this.partial_srcs = {};
        this.data = {};
    },
}
