var MeetAdvisorCheckIn = function MeetAdvisorCheckIn() {};

MeetAdvisorCheckIn.prototype = {
	
	bindElements: function() {

		$("#switchsex").click(function() {
				var u = new User();
				u.changeSex();
				
				alert("sex switched !");
				location.hash = "#";
			});
			
			$("#logout").click(function() {
				var uo = new UiOverlay();
				uo.hide();			
				location.hash = "#logout";
			});

			$("#VIP").click(function() {
				window.localStorage.setItem("vip", "true");
				alert("you are now VIP !");
				location.hash = "#";
			});

			$("#noVIP").click(function() {
				window.localStorage.setItem("vip", "false");
				alert("you are no longuer VIP !");
				location.hash = "#";
			});
			
			$("#popup").click(function() {
				location.hash = location.hash + "/create-account";
			});
	
	},
	
}




