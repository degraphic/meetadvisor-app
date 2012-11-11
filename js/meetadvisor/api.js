var MeetAdvisorApi = function MeetAdvisorApi() {};

MeetAdvisorApi.prototype = {

	// properties
	server_address_location : "http://meetadvisor.cloudapp.net",
	
	// methods
	login : function (mail,password) {
		meetadvisor.loader.loading();

		var wsUrl = this.server_address_location + "/User.json.svc/Login";

		var jsonObjects= {"mail":mail,"password":password}

		$.ajax({
				url: wsUrl,
				type: "POST",
				data: JSON.stringify(jsonObjects),
				dataType: 'json',
				success: function(data) {
					meetadvisor.loader.completed();
					console.log(data)
					if (data.Result == true) {
						var ur = new User();
						ur.login(data.User.id, mail, data.User.is_female, data.User.token, data.User.password);
						location.hash = "#";
					}
					else {
						alert("mot de passe incorrect.");
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					meetadvisor.loader.completed();
					console.log('API: login error ', xhr.status);
					console.log('API: login error ', thrownError);
				}
			});
    },
	
	loginWithToken : function (token, callback) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/User.json.svc/LoginWithToken/" + token;
		$.ajax({
			url: this.server_address_location 
				+ "/User.json.svc/LoginWithToken/" + token,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.completed();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) {
					meetadvisor.loader.completed();
					console.log(data)
					var ur = new User();
					if (data.Result == true) {
						ur.login(data.User.id, data.User.mail, data.User.is_female, data.User.token, data.User.password);
                        callback();
					}
					else {
						alert("Login error !");
						ur.logout(true);
						location.hash = "#";
						window.location.href = window.location.href;
					}
		});
    },

	UpdateUser : function (id, login, password, sex, token) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/User.json.svc/UpdateUser";
        var ur = new User();
		var jsonObjects= {"id":ur.id(),"mail":login,"password":password}

		$.ajax({
				url: wsUrl,
				type: "POST",
				data: JSON.stringify(jsonObjects),
				dataType: 'json',
				success: function(data) {
					meetadvisor.loader.completed();
					console.log(data)
					if (data.Result == true) {
						var ur = new User();
						ur.login(id, login, sex, token, password);
						alert("Mise à jour: OK");
						location.hash = "#";
					}
					else {
						alert("Login error !!");
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					meetadvisor.loader.completed();
					console.log('API: login error ', xhr.status);
					console.log('API: login error ', thrownError);
				}
			});
    },

	register: function(login, password, mail, uid, isfemale) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/User.json.svc/Register";
        isfemale = (isfemale ? "true" : "false")
		var jsonObjects= {"mail":mail, "uid":uid, "login":login, "password":password, "is_female":isfemale,"age":"0", "token":"lol"}

		$.ajax({
			url: wsUrl,
			type: "POST",
			data: JSON.stringify(jsonObjects),
			dataType: 'json',
			success: function(data) {
				meetadvisor.loader.completed();
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
				meetadvisor.loader.completed();
				console.log('API: register error', xhr.status);
				console.log('API: register error', thrownError);
			}
		});
	},

    venue: function(x, y, callback) {
		meetadvisor.loader.loading();
		$.ajax({
			url: this.server_address_location 
				+ "/Venue.json.svc/VenueByRange/" + x + "/" + y + "/0",
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.completed();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			},
			success:function(data) {
				meetadvisor.loader.completed();
				meetadvisor.venues = this.data;
				var wrappedData = new Array();
				$.each(data.Venue, function(index, value) { 
					wrappedData.push(new MeetAdvisorVenue(value));
				});
				callback(wrappedData);
			}
		});
    },

	validateCoupon: function (barid, uid) {
		meetadvisor.loader.loading();
		$.ajax({
			url: this.server_address_location 
				+ "/Venue.json.svc/CouponValidated/" + barid + "/" + uid,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.completed();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			},
			success:function(data) {
				meetadvisor.loader.completed();
			}
		});
	},

	// clone de ValidateCoupon mais avec une callback	
	checkIn: function (barid, uid, callback) {
		meetadvisor.loader.loading();
		$.ajax({
			url: this.server_address_location 
				+ "/Venue.json.svc/CouponValidated/" + barid + "/" + uid,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.completed();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			},
			success:function(data) {
				meetadvisor.loader.completed();
				callback(data);
			}
		});
	},

	venueByDrinkers: function(callback) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/Venue.json.svc" + "/VenueByDrinkers/" + 60 * 4 + "/0";
		$.ajax({
			url: wsUrl,
			dataType: 'json',
		}).done(function(data) {
			meetadvisor.loader.completed(); 		
			var wrappedData = new Array();
			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value));
			});
			callback(wrappedData);
		});
    },


    VenuesAndDrinkerCount: function(callback) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/Venue.json.svc" + "/VenuesAndDrinkerCount/" + 60 * 4;
		$.ajax({
			url: wsUrl,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.loading();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) {
			meetadvisor.loader.completed();
			var wrappedData = new Array();
			$.each(data.Venue, function(index, value) { 
				wrappedData.push(new MeetAdvisorVenue(value.venue, value.count));
			});
			callback(wrappedData);
		});
    },

	getPlaceInfo: function (id, callback) {
		meetadvisor.loader.loading();
		var wsUrl = this.server_address_location + "/Venue.json.svc/VenueById/" + id;
		$.ajax({
			url: wsUrl,
			dataType: 'json',
			error:function (xhr, ajaxOptions, thrownError){
				meetadvisor.loader.completed();
				console.log('API: venue error', xhr.status);
				console.log('API: venue error', thrownError);
			}
		}).done(function(data) {
			meetadvisor.loader.completed();
			callback(data.Venue[0]);
		});
	},

};