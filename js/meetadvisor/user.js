var User = function User() { this.init(); };

User.prototype = {
	
	
	
	
	//  PRIVATE
	init : function () {
		console.log("user: init");
		//window.localStorage.setItem("loggedIn", false);
	},

	// PUBLIC
	
	login: function (id, mail, sex, token, password) {
		// TODO, these are default values
		window.localStorage.setItem("mail", mail);
		window.localStorage.setItem("id", id);
		window.localStorage.setItem("isFemale", sex);
		window.localStorage.setItem("token", token);
		window.localStorage.setItem("password", password);
		window.localStorage.setItem("loggedIn", "1");
    },

	create: function (login, sex) {
		// TODO, these are default values
		window.localStorage.setItem("login", login);
		window.localStorage.setItem("isFemale", sex);
		window.localStorage.setItem("loggedIn", "1");
	},

	logout : function () {
		window.localStorage.removeItem("mail");
		window.localStorage.removeItem("id");
		window.localStorage.removeItem("isFemale");
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("password");
		window.localStorage.removeItem("isFemale");
		window.localStorage.setItem("loggedIn", "0");
	},
	
	isFemale : function () {
		if (window.localStorage.getItem("isFemale") == "1") {
			return (true);
		}
		return (false);
	},
			
	isLoggedIn : function () {
		if (window.localStorage.getItem("loggedIn") == "1") {
			return (true);
		}
		return (false);
	},
	
    id : function() {
        return window.localStorage.getItem("id");
    },

    token : function() {
        return window.localStorage.getItem("token");
    },

    mail : function() {
        return window.localStorage.getItem("mail");
    },
    password : function() {
        return window.localStorage.getItem("password");
    },

	changeSex : function() {
		if (window.localStorage.getItem("isFemale") == "true") {
			window.localStorage.setItem("isFemale", "0");
		} else {
			window.localStorage.setItem("isFemale", "1");
		}
	},
	
	getUid: function() {
		return (window.localStorage.getItem("login"));
	},
	
	

}

