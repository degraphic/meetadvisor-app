var MeetAdvisorApi = function MeetAdvisorApi() {};

MeetAdvisorApi.prototype = {

	// properties
	server_address_location : "http://api.meet-advisor.com",
    //server_address_location : "http://localhost",
	
	// methods

	login : function (mail,password) {
        // TODO
		var wsUrl = this.server_address_location + "/User.json.svc/Login";

		var jsonObjects= {"mail":mail,"password":password}

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
						ur.login(data.User.id, mail, data.User.is_female, data.User.token, data.User.password);
						location.hash = "#";
					}
					else {
						alert("Login error");
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					console.log('API: login error ', xhr.status);
					console.log('API: login error ', thrownError);
					//location.hash = "#logout";
				}
			});
    },
	
	loginWithToken : function (token, callback) {
        // TODO
		var wsUrl = this.server_address_location + "/User.json.svc/LoginWithToken/" + token;


		$.ajax({
			url: this.server_address_location 
				+ "/User.json.svc/LoginWithToken/" + token,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) {
					data = jQuery.parseJSON(data);
					console.log(data)
					if (data.Result == true) {
						var ur = new User();
						ur.login(data.User.id, data.User.mail, data.User.is_female, data.User.token, data.User.password);
                        callback();
					}
					else {
						alert("Login error");
						location.hash = "#logout";
					}
		});
    },

	UpdateUser : function (login,password) {
        // TODO
		var wsUrl = this.server_address_location + "/User.json.svc/UpdateUser";
        var ur = new User();
		var jsonObjects= {"id":ur.id(),"mail":login,"password":password}

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
						ur.login(login, data.User.is_female);
						location.hash = "#";
					}
					else {
						alert("Login error");
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					console.log('API: login error ', xhr.status);
					console.log('API: login error ', thrownError);
				}
			});
    },

	register: function(login, password, mail, uid, isfemale) {

		var wsUrl = this.server_address_location + "/User.json.svc/Register";
		
        isfemale = (isfemale ? "true" : "false")

		var jsonObjects= {"mail":mail, "uid":uid, "login":login, "password":password, "is_female":isfemale,"age":"0", }

		$.ajax({
			url: wsUrl,
			type: "POST",
			data: JSON.stringify(jsonObjects),
			dataType: 'json',
			success: function(data) {
				data = jQuery.parseJSON(data);
				if (data.Result == true) {
					var ur = new User();
					ur.create(login, isfemale)
					location.hash = "#";
				}
				else if (data.Error == "ERRORLoginOrMailOrUidExists") {
					alert("Un compte est déjà associé à cet email.");
				} else {
					console.log(data);
				}
			},
			error:function (xhr, ajaxOptions, thrownError){
				console.log('API: register error', xhr.status);
				console.log('API: register error', thrownError);
			}
		});
	},

    venue: function(x, y, callback) {
		$.ajax({
			url: this.server_address_location 
				+ "/Venue.json.svc/VenueByRange/" + x + "/" + y + "/0",
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) { 		
			data = jQuery.parseJSON(data);
			meetadvisor.venues = this.data;
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

		var wsUrl = this.server_address_location + "/Venue.json.svc" + "/VenueByDrinkers/" + 60 * 4 + "/0";

		$.ajax({
			url: wsUrl,
			dataType: 'json',
		}).done(function(data) { 		
			data = jQuery.parseJSON(data);
			// Manage data - wrapper
			//debugger;
			var wrappedData = new Array();
			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value));
			});

			callback(wrappedData);

		});
    },


    VenuesAndDrinkerCount: function(callback) {

		var wsUrl = this.server_address_location + "/Venue.json.svc" + "/VenuesAndDrinkerCount/" + 60 * 4;

		$.ajax({
			url: wsUrl,
			dataType: 'json',
		}).done(function(data) { 		
			data = jQuery.parseJSON(data);
			// Manage data - wrapper
			//debugger;
			var wrappedData = new Array();
			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value.venue, value.count));
			});

			callback(wrappedData);

		});
    },

	getPlaceInfo: function (id, callback) {
		var wsUrl = this.server_address_location + "/Venue.json.svc/VenueById/" + id;
		
		$.ajax({
			url: wsUrl,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) {
			data = jQuery.parseJSON(data);
			callback(data.Venue[0]);
		});
	
	
	},

};