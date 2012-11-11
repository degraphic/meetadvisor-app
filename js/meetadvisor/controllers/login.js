var MeetAdvisorLogin = function MeetAdvisorLogin() {};

MeetAdvisorLogin.prototype = {
	
	bindElements: function() {

		$("#loginForm").submit(function () {
			meetadvisor.api.login($("#login").val(),$("#pwd").val());
			return false;
		});
		
		$("#btGoFacebook").click(function () {
			document.location = "http://www.meet-advisor.com/login_fb.html";
		});
		
		$("#createAccount").click(function () {
			document.location.hash = "#createAccount";
		});
		
		
		
	},
	
}




