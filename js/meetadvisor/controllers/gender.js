var MeetAdvisorGender = function MeetAdvisorGender() {};

MeetAdvisorGender.prototype = {
	
	bindElements: function() {

		// Bind connect button
		$(".btWoman").click(function() {
			window.localStorage.setItem("isfemale", "true");
			location.hash = "#map";
		});

		$(".btMan").click(function() {
			window.localStorage.setItem("isfemale", "false");
			location.hash = "#map";
		});
	
	},
	
}




