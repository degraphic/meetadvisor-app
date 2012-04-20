var User = function User() { this.init(); };

User.prototype = {

	//  PRIVATE

	init : function () {
		//window.localStorage.setItem("loggedIn", false);
	},

	// PUBLIC
	
	login: function (sex) {
		// TODO, these are default values
		window.localStorage.setItem("isFemale", sex);
		window.localStorage.setItem("loggedIn", true);
    },

	create: function (login, sex) {
		// TODO, these are default values
		window.localStorage.setItem("isFemale", sex);
		window.localStorage.setItem("loggedIn", true);
	},

	logout : function () {
		window.localStorage.removeItem("isFemale");
		window.localStorage.setItem("loggedIn", false);
	},
	
	isFemale : function () {
		if (window.localStorage.getItem("isFemale") == "true") {
			return (true);
		}
		return (false);
	},
			
	isLoggedIn : function () {
		if (window.localStorage.getItem("loggedIn") == "true") {
			return (true);
		}
		return (false);
	},

}

