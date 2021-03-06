var MeetAdvisorController = function MeetAdvisorController() {};

MeetAdvisorController.prototype = {
	// Page DrinkersMap
	drinkersMap: function (render_data) {
	    console.log("controller: drinkersMap");
		
		render_data.page.file = "drinkers-map";
		render_data.addPartial('header', 'header/drinkers-map');

		meetadvisor.render(render_data, function() {
		
			var map = new DrinkersMap();
			map.settings = { 
				mapContainer: document.getElementById('meetspot-map')
			};
			map.init(render_data.request_params, false);
		});
	},
	
	// Page Map update 
	drinkersMap__update: function(render_data) {
		var msMap = new DrinkersMap();
		msMap.settings = {
			mapContainer: document.getElementById('meetspot-map')
		};
		msMap.init(render_data.request_params, false);
    },

    // Page Coupon
	coupon: function (render_data) {
		console.log("controller: coupon");
		render_data.page.file = "coupon";
		var cp = new Coupon();
		cp.render(render_data);
		$('#overlay-close').attr('style','display: none !important');
	},
	
	// Page place
	place: function (render_data) {
		console.log("controller: place");
		meetadvisor.loader.loading();
        render_data.page.file = "place";
		$('#overlay-close').attr('style','display: block');
        if (meetadvisor.current_venue == null) {
        	console.log("place->complicated:before rendering");
			meetadvisor.current_venue = render_data;
			meetadvisor.api.getPlaceInfo(render_data.request_params["id"], function (data) {
				var render_data = meetadvisor.current_venue;
				meetadvisor.current_venue = data;
				meetadvisor.render(render_data, function() {
        			console.log("place->complicated:after rendering");
					var maPlace = new Place();
					maPlace.init();
				});
			}, render_data);
		} else { 
        	console.log("place->simple:before rendering");
			render_data.data = meetadvisor.current_venue;
			meetadvisor.render(render_data, function() {
	        	console.log("place->simple:after rendering");
				var maPlace = new Place();
				maPlace.init();
			});
		}
	},
	
	// Page profile
	profile: function(render_data) {
		console.log("controller: profile");
        render_data.page.file = "profile";

		render_data.addPartial('header', 'header/default');
		render_data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.render(render_data, function() {
            
            new UiFieldsGroup();
			
			// Bind elements
            var model = new MeetAdvisorUpdateAccount();
			model.bindElements();
			
        });
    },

	// Page gender	
	gender: function(render_data) {
        render_data.page.file = "gender";
		
		meetadvisor.render(render_data, function() {
			var maGender = new MeetAdvisorGender();
			maGender.bindElements();
        });
    },
			
	// Page 404
    error404: function(render_data) {
        render_data.page.file = "error404";
		meetadvisor.render(render_data);
    },

	// Page login	
    login: function(render_data) {
		render_data.template.file = "simple";
        render_data.page.file = "login";
		
        meetadvisor.render(render_data, function() {
            
            new UiFieldsGroup();
			
			// Bind elements
			var maLogin = new MeetAdvisorLogin();
			maLogin.bindElements();
			
        });
    },

	// Action logout
    logout: function(render_data) {
		var ur = new User();
		ur.logout(true);
        location.hash = "#login"
    },

	// Page createAccount
    createAccount: function(render_data) {

		render_data.template.file = "simple";
		render_data.page.file = "create-account";
		
		render_data.addPartial('header', 'header/default');
		render_data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(render_data, function() {
			
			new UiFieldsGroup();
		
			// Bind elements
			var maCreateAccount = new MeetAdvisorCreateAccount();
			maCreateAccount.bindElements();

		});

    },
	
	// Page Meetspots List
    meetspotsList: function(render_data) {
        render_data.page.file = "meetspots-list";
		
		render_data.addPartial('header', 'header/meetspots-list');
		render_data.addPartial('meetspotItem', 'list/item-meetspot');
		render_data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.api.venue(0, 0, function (meetspotsList) {
			
			// minimize list
			var tab = [];
			for (i=0;i<=10;i++) {
				tab[i] = meetspotsList[i];
			}

            render_data.data.meetspots = tab;
            
			meetadvisor.render(render_data);            
			
        });
		
		meetadvisor.render(render_data);

    },
	
	// Page map
	meetspotsMap: function(render_data) {
        console.log("controller: meetspotsMap");
		//debugger;
		render_data.page.file = "meetspots-map";
		
		render_data.addPartial('header', 'header/meetspots-map');
		//render_data.addPartial('footer', 'footer/tab-bar');

		
		
		meetadvisor.render(render_data, function() {
			var msMap = new MeetspotsMap();
			
			msMap.settings = { 
				mapContainer: document.getElementById('meetspot-map')
			};
			msMap.init(render_data.request_params, false);
		});

    },

	// Page Map update 
	meetspotsMap__update: function(render_data) {
		var msMap = new MeetspotsMap();
		msMap.settings = {
			mapContainer: document.getElementById('meetspot-map')
		};
		msMap.init(render_data.request_params, true);
    },
	
	// Page checkin
    checkin: function(render_data) {
        render_data.page.file = "checkin";
		
		render_data.addPartial('header', 'header/default');
		render_data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.render(render_data, function() {

			var maCheckIn = new MeetAdvisorCheckIn();
			maCheckIn.bindElements();
       
		});
    },

	// Page Test
    testMustache: function(render_data) {
        render_data.page.file = "test-mustache";

        // on ajoute un partial qui sera appelable par mustache dans le template
		render_data.addPartial('header', 'header/default');
		render_data.addPartial('meetspotItem', 'list/item-meetspot');
		render_data.addPartial('footer', 'footer/tab-bar');
		
        // on determine la data qui sera utilisee par mustache pour aficher le template
        render_data.data = {
            bars : [
                {name : "toto", type : "tutu"},
                {name : "pouet", type : "blup"},
                {name : "machin", type : "chose"},
                {name : "bidule", type : "42"},                
            ],
            title : "ceci est une page de test",
            context : {
                age_du_capitaine : 52,
                number_of_fucks_i_give : 0
            }
        };

        // on demande a render la page
        meetadvisor.render(render_data);
    },
	

};