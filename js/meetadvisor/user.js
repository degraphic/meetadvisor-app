var User = function User() { this.init(); };

User.prototype = {
	
	
	
	
	//  PRIVATE
	init : function () {
		console.log("user: init");
		//window.localStorage.setItem("loggedIn", false);
	},

	// PUBLIC
	
	login: function (login, sex) {
		// TODO, these are default values
		window.localStorage.setItem("login", login);
		window.localStorage.setItem("isFemale", sex);
		window.localStorage.setItem("loggedIn", true);
    },

	create: function (login, sex) {
		// TODO, these are default values
		window.localStorage.setItem("login", login);
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
	
	changeSex : function() {
		if (window.localStorage.getItem("isFemale") == "true") {
			window.localStorage.setItem("isFemale", false);
		} else {
			window.localStorage.setItem("isFemale", true);
		}
	},
	
	getUid: function() {
		return (window.localStorage.getItem("login"));
	},
	
	

}

