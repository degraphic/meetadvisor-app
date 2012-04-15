var MeetAdvisorApi = function MeetAdvisorApi () {};

MeetAdvisorApi.prototype = {

	// properties
	server_address : "http://api.meet-advisor.com/LoginService.svc",
	
	// methods
	
    login : function (login,password) {
        // TODO
		var wsUrl = this.server_address + "/login/" + login + "/" + password;
		
		$.ajax({
				url: wsUrl,
					dataType: 'json',
					success: function(data) {
						console.log(data);
						if(data.Result == true){
							window.localStorage.setItem("key", data.isfemale);
							location.hash = "#meetspots";
						}
						else {
							alert("Login error");
						}
					},
					error:function (xhr, ajaxOptions, thrownError){
						alert(xhr.status);
						alert(thrownError);
					},  
					
				error:function (xhr, ajaxOptions, thrownError){
					console.log('error', xhr.status);
					console.log('error', thrownError);
				},  
					
			}).done(function(data) { 
					
				console.log('retrieve data', data);
					
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
