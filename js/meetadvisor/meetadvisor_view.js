var MeetAdvisorView = function MeetAdvisorView() {};
var MeetAdvisorViewData = function MeetAdvisorViewData() {};

MeetAdvisorView.prototype = {
	gender: function(data) {
        return data;
    },
	
    _404: function(data) {
        return data;
    },

    login: function(data) {
        return data;	
    },

    createAccount: function(data) {
        return data;
    },

    meetspotsList: function(data) {
        return data;
    },

    meetspotsMap: function(data) {
        return data;
    },

    checkin: function(data) {
        return data;
    },

    profile: function(data) {
        return data;
    },

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
