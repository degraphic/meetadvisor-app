var MeetAdvisorView = function MeetAdvisorView() {};
var MeetAdvisorViewData = function MeetAdvisorViewData() {};

MeetAdvisorView.prototype = {

    login: function(data) {
        return data;
    },

    createaccount: function(data) {
        return data;
    },

    meetspots: function(data) {
        return data;
    },

    checkin: function(data) {
        return data;
    },

    profile: function(data) {
        return data;
    }

};

MeetAdvisorViewData.prototype = {
	
    template: {
		file: null, 
		src: null,
		data: null
	},
    
	page: {
		file: null, 
		src: null,
		data: null
	}
}