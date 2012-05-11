var MeetAdvisorCreateAccount = function MeetAdvisorCreateAccount() {};

MeetAdvisorCreateAccount.prototype = {
	
	bindElements: function() {

		// Bind subscribe button
		
		// $("#submit").click(function() {		
            
			    // if ($("#login").val() == "" || $("#pwd").val() == "" || $("#email").val() == "") {
				    // alert("Merci de remplir les champs : login, mot de passe et email.");
			    // }
			    // else {
					// var isfemale = false;
					// if ($("#gender").val() == "F") {
						// isfemale = true;
					// }
				    // meetadvisor.api.register($("#login").val(), $("#pwd").val(), $("#login").val(), $("#login").val(), isfemale);
			    // }
            // });
			
		$("#createAccountForm").submit(function () {
			//meetadvisor.api.login($("#login").val(),$("#pwd").val());
			var isfemale = false;
			if ($("#gender").val() == "F") {
				isfemale = true;
			}
			meetadvisor.api.register($("#login").val(), $("#pwd").val(), $("#login").val(), $("#login").val(), isfemale);
			
			return false;
		});
		
		$("#btlogin").click(function () {
			document.location.hash = "#login";
		});
	
	},
	
}




