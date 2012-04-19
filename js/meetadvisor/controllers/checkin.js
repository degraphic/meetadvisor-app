var MeetAdvisorCheckIn = function MeetAdvisorCheckIn() {};

MeetAdvisorCheckIn.prototype = {
	
	bindElements: function() {

		$("#switchsex").click(function() {		
				if (window.localStorage.getItem("key") == "true" ){
					$("body").removeClass("woman");
					$("body").addClass("man");
					window.localStorage.setItem("key", false);
				}
				else {
					$("body").removeClass("man");
					$("body").addClass("woman");
					window.localStorage.setItem("key", true);
				}
				alert("sex switched !");
				location.hash = "#";
			});
			
			$("#logout").click(function() {	
				var ur = new User();
				ur.logout();
				
				alert("logued out !");
				location.hash = "#";
			});

			$("#VIP").click(function() {
				window.localStorage.setItem("vip", true);
				alert("you are now VIP !");
				location.hash = "#";
			});

			$("#noVIP").click(function() {
				window.localStorage.setItem("vip", false);
				alert("you are no longuer VIP !");
				location.hash = "#";
			});
			
			$("#popup").click(function() {
				location.hash = location.hash + "/create-account";
			});
	
	},
	
}




