var MeetAdvisorApi = function MeetAdvisorApi() {};

MeetAdvisorApi.prototype = {

	// properties
	server_address : "http://api.meet-advisor.com/LoginService.svc",
	server_address_location : "http://api.meet-advisor.com/LocationService.svc",
	
	// methods
	
    login : function (login,password) {
        // TODO
		var wsUrl = this.server_address + "/login/" + login + "/" + password;
		
		$.ajax({
				url: wsUrl,
				dataType: 'json',
				success: function(data) {
					if (data.Result == true) {

						var ur = new User();
						ur.login(data.isfemale);
						
						location.hash = "#map";
					}
					else {
						alert("Login error");
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					console.log('error', xhr.status);
					console.log('error', thrownError);
				}
			});
    },
	
	register: function(login, password, mail, uid, isfemale) {
	    
	    var wsUrl = this.server_address + "/register/" + login + "/" + password + "/" + login + "/" + uid + "/" + isfemale;
		$.ajax({
			url: wsUrl,
			dataType: 'json',
			success: function(data) {
				if (data.Result == true) {
					var ur = new User();
					ur.setSex(data.isfemale);
				
					location.hash = "#map";
				}
				else if (data.Error == "ERRORLoginOrMailOrUidExists") {
					alert("Un compte est déjà associé à cet email.");
				} else {
					console.log(data);
				}
			},
			error:function (xhr, ajaxOptions, thrownError){
				console.log('error', xhr.status);
				console.log('error', thrownError);
			}
		});
	},

    venue: function(x, y, callback) {
		
		$.ajax({
			url: this.server_address_location + "/venue/" + x + "/" + y,
			dataType: 'json',
		}).done(function(data) { 		
			
			// Manage data - wrapper
			var wrappedData = new Array();

			$.each(data, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value));
			});
					
			callback(wrappedData);
			
		});
        
    }
	
};
