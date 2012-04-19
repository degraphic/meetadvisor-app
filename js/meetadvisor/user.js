var MeetAdvisorUser = function MeetAdvisorUser() { this.init(); };

MeetAdvisorUser.prototype = {
    
	PROFILE_FEMALE: "f",
	PROFILE_MALE: "m",
	
	profile: {
		sex: null,
		login: null,
		vip: null,
	},
	
	init: function () {
		
		// Init profile - TODO : from api login & set in session ?
		if (window.localStorage.getItem("key") == "true" ) {
			this.profile.sex = this.PROFILE_FEMALE;
		} else {
			this.profile.sex = this.PROFILE_MALE;
		}
		
    },
	
	create: function () {
		
	},
	
	isFemale: function() {
		return this.profile.sex == this.PROFILE_FEMALE ? true : false;
	},
	
	isMale: function() {
		return this.profile.sex == this.PROFILE_MALE ? true : false;
	},
	
	
	/******************** GETTERS / SETTERS ********************/
	getProfile: function () {
		return this.profile;
	},
	
	setProfile: function (profile) {
		this.profile = profile;
	}
}