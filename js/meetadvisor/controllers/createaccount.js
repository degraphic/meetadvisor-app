var MeetAdvisorCreateAccount = function MeetAdvisorCreateAccount() {};

MeetAdvisorCreateAccount.prototype = {
	
	bindElements: function() {

		// Bind subscribe button
		$("#submit").click(function() {		
            
			    if ($("#login").val() == "" || $("#pwd").val() == "" || $("#email").val() == "") {
				    alert("Merci de remplir les champs : login, mot de passe et email.");
			    }
			    else {
					var isfemale = false;
					if ($("#gender").val() == "F") {
						isfemale = true;
					}
				    meetadvisor.api.register($("#login").val(), $("#pwd").val(), $("#login").val(), $("#login").val(), isfemale);
			    }
            });
	
	},
	
}



