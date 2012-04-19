var MeetAdvisorUi = function MeetAdvisorUi() {};

MeetAdvisorUi.prototype = {
	
	SKIN_WOMAN = "woman";
	SKIN_MAN = "man";
	
	setSkin: function() {

		var maUser = MeetAdvisorUser();
		
		if (maUser.isFemale()) {
			$("body").addClass(this.SKIN_WOMAN);
		} else {
			$("body").addClass(this.SKIN_MAN);
		}
		
	}
}