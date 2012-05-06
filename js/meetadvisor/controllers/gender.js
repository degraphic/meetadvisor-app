var MeetAdvisorGender = function MeetAdvisorGender() {};

MeetAdvisorGender.prototype = {
	
	bindElements: function() {

		// Bind connect button
		$(".btWoman").click(function() {
			window.localStorage.setItem("isfemale", "1");
			location.hash = "#map";
		});

		$(".btMan").click(function() {
			window.localStorage.setItem("isfemale", "0");
			location.hash = "#map";
		});
	
	},
	
}




