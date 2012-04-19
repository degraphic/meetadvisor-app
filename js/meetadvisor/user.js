var User = function User() { this.init(); };

User.prototype = {

	// this is a private var !
	hasVagina : null,
	login: null,
	vip: false,

	init : function () {
		window.localStorage.setItem("isFemale", true);
	},

	getVagina : function () {
		if (this.hasVagina == null) {
			this.hasVagina = window.localStorage.getItem("isFemale");
		}
		return (this.hasVagina);
	},

	login: function (login, sex) {
		// TODO, these are default values
		this.hasVagina = true;
		window.localStorage.setItem("isFemale", true);
		this.login = "toto";
    },

	create: function (login, sex) {
		// TODO, these are default values
		this.hasVagina = true;
		window.localStorage.setItem("isFemale", true);
		this.login = "toto";
	},

	isFemale : function () {
		return (this.getVagina());
	},

}

