var MeetAdvisorApi = function MeetAdvisorApi() {};

MeetAdvisorApi.prototype = {

	// properties
	server_address : "http://api.meet-advisor.com:1000/LoginService.svc",
	server_address_location : "http://api.meet-advisor.com",
	
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
						
						location.hash = "#meetspotsMap";
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
	
	login2 : function (login,password) {
        // TODO
		var wsUrl = this.server_address_location + "/User.json.svc/Login";
		
		var jsonObjects= {"mail":login,"password":password}
		
		$.ajax({
				url: wsUrl,
				type: "POST",
				data: JSON.stringify(jsonObjects),
				dataType: 'json',
				success: function(data) {
					data = jQuery.parseJSON(data);
					console.log(data)
					if (data.Result == true) {
						var ur = new User();
						ur.login(data.isfemale);
						location.hash = "#meetspotsMap";
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
					debugger;
					ur.create(login, isfemale)
					location.hash = "#meetspotsMap";
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
			url: this.server_address_location 
				+ "/Venue.json.svc/VenueByRange/" + x + "/" + y + "/0",

			
			dataType: 'json',
		}).done(function(data) { 		
			data = jQuery.parseJSON(data);
			// Manage data - wrapper
			var wrappedData = new Array();

			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value));
			});
					
			callback(wrappedData);
			
		});
    },

	validateCoupon: function (barid, uid) {
		$.ajax({
			url: this.server_address_location 
				+ "/Venue.json.svc/CouponValidated/" + barid + "/" + uid,
			dataType: 'json',
		}).done(function(data) { 		
			// TODO : check validation 
		});
	},
	
	venueByDrinkers: function(callback) {
		
		$.ajax({
			url: this.server_address_location 
				+ "/VenueByDrinkers/600/0",
			dataType: 'json',
		}).done(function(data) { 		
			data = jQuery.parseJSON(data);
			// Manage data - wrapper
			debugger;
			var wrappedData = new Array();

			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value));
			});
					
			callback(wrappedData);
			
		});
    },
	
	
	
};
