var MeetAdvisorApi = function MeetAdvisorApi () {};

MeetAdvisorApi.prototype = {
	// properties

	server_address : "http://api.meet-advisor.com/LoginService.svc",
	
	// methods
	
    login : function (login,password) {
        // TODO
	
		$.ajax({
				url: this.server_address + "/login/" + login + "/" + password,
							dataType: 'json',
				}).done(function(data) { 
					
					alert('success');
					
			});
    },
	
	register : function (login, password, mail, uid, isfemale) {
	
			$.ajax({
				url: this.server_address + "/register/" + login + "/" + password + "/" + mail + "/" + uid + "/" + isfemale,
							dataType: 'json',
				}).done(function(data) { 
					console.log(data);
					alert('success');
					
			});
	
	}
	
};
