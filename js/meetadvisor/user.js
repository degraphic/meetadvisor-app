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
		if (this.hasVagina == null) {
			alert("HTML5 window.localStorage doesn't seem to work on your phone :(");
		}
		return (this.hasVagina);
	},

	setSex : function (sex) {
		window.localStorage.setItem("isFemale", sex);
		this.hasVagina = sex;
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

