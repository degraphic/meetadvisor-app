var MeetAdvisorUi = function MeetAdvisorUi() {};

MeetAdvisorUi.prototype = {
	
	SKIN_WOMAN: "woman",
	SKIN_MAN: "man",
	
	setSkin: function() {

		var ur = new User();
		
		if (ur.isFemale()) {
			$("body").addClass(this.SKIN_WOMAN);
		} else {
			$("body").addClass(this.SKIN_MAN);
		}
		
	}
}