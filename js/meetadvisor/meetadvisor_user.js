var User = function User() {};

User.prototype = {
    
	isFemale: null,
	isVIP: null,
	email: null,
	
	init: function () {
		
    },
	
	create: function () {
		
	},
	
	getProfile: function () {
		// skin selon sex
		if (window.localStorage.getItem("key") == "true" ){
			$("body").addClass("woman");
		}
		else {
			$("body").addClass("man");
		}
	},
}
