var MeetAdvisorUi = function MeetAdvisorUi() {};

MeetAdvisorUi.prototype = {
	
	setSkin: function() {
		// use user interface to know if it's a woman or man	
		$("body").addClass("woman");
		//$("body").addClass("man");
	}

}