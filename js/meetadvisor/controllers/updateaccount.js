var MeetAdvisorUpdateAccount = function MeetAdvisorUpdateAccount() {};

MeetAdvisorUpdateAccount.prototype = {
	
	bindElements: function() {

    var u = new User();

        $("#login").val(u.mail());
        $("#pwd").val(u.password());
		// Bind connect button
		$("#submit").click(function() {		
		
			if ($("#login").val() == "" || $("#pwd").val() == "") {
				alert("Merci d'entrer un login et un mot de passe.");
			}
			else {
				meetadvisor.api.UpdateUser($("#login").val(),$("#pwd").val());
			}
		});
	
	},
	
}




