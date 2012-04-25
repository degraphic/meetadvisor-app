var MeetAdvisorLogin = function MeetAdvisorLogin() {};

MeetAdvisorLogin.prototype = {
	
	bindElements: function() {

		// Bind connect button
		$("#submit").click(function() {		
		
			if ($("#login").val() == "" || $("#pwd").val() == "") {
				alert("Merci d'entrer un login et un mot de passe.");
			}
			else {
				meetadvisor.api.login2($("#login").val(),$("#pwd").val());
			}
		});
	
	},
	
}




