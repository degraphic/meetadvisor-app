var MeetAdvisorLogin = function MeetAdvisorLogin() {};

MeetAdvisorLogin.prototype = {
	
	bindElements: function() {

		// Bind connect button
		
		// $("#submit").click(function() {		
		
			// if ($("#login").val() == "" || $("#pwd").val() == "") {
				// alert("Merci d'entrer un login et un mot de passe.");
			// }
			// else {
				// meetadvisor.api.login($("#login").val(),$("#pwd").val());
			// }
		// });
		
		$("#loginForm").submit(function () {
			meetadvisor.api.login($("#login").val(),$("#pwd").val());
			return false;
		});
		
		$("#createAccount").click(function () {
			document.location.hash = "#createAccount";
		});
		
	},
	
}




