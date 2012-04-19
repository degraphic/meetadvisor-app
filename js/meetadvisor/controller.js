var MeetAdvisorController = function MeetAdvisorController() {};

MeetAdvisorController.prototype = {
    
	// Page profile
	profile: function(data) {
        data.page.file = "profile";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');
		
		meetadvisor.render(data, function() {            
            new UiFieldsGroup();	
		});
    },

	// Page gender	
	gender: function(data) {
        data.page.file = "gender";
		
		meetadvisor.render(data, function() {
		
			var maGender = new MeetAdvisorGender();
			maGender.bindElements();
		
        });
		
    },
			
	// Page 404
    error404: function(data) {
        data.page.file = "error404";
		meetadvisor.render(data);
    },

	// Page login	
    login: function(data) {
		data.template.file = "simple";
        data.page.file = "login";
		
        meetadvisor.render(data, function() {
            
            new UiFieldsGroup();
			
			// Bind elements
			var maLogin = new MeetAdvisorLogin();
			maLogin.bindElements();
			
        });
    },

	// Page createAccount
    createAccount: function(data) {

		data.template.file = "simple";
		data.page.file = "create-account";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(data, function() {
			
			new UiFieldsGroup();
		
			// Bind elements
			var maCreateAccount = new MeetAdvisorCreateAccount.bindElements();
			maCreateAccount.bindElements();

		});

    },
	
	// Page Meetspots List
    meetspotsList: function(data) {
        data.page.file = "meetspots-list";
		
		data.addPartial('header', 'header/meetspots-list');
		data.addPartial('meetspotItem', 'list/item-meetspot');
		data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.api.venue(0, 0, function (meetspotsList) {
			
			// minimize list
			var tab = [];
			for (i=0;i<=10;i++) {
				tab[i] = meetspotsList[i];
			}

            data.data.meetspots = tab;
            
			meetadvisor.render(data);            
			
        });
		
		meetadvisor.render(data);

    },
	
	// Page Meetspots Map
	meetspotsMap: function(data) {
        data.page.file = "meetspots-map";
		
		data.addPartial('header', 'header/meetspots-map');
		data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(data, function() {
		
			var map = new MeetspotsMap();
			map.settings = {
				mapContainer: document.getElementById('meetspot-map')
			};
			map.init();
			
			meetadvisor.api.venue(0, 0, function (data) {

				$.each(data, function(index, venue) { 
					/*console.log(venue);
					map.gMapSetMarker(venue.getLat(), venue.getLng());*/
				});
				
			});
			
        });
		

    },
	
	// Page checkin
    checkin: function(data) {
        data.page.file = "checkin";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.render(data, function() {

			var maCheckIn = new MeetAdvisorCheckIn();
			maCheckIn.bindElements();
       
		});
    },

	// Page Test
    testMustache: function(data) {
        data.page.file = "test-mustache";

        // on ajoute un partial qui sera appelable par mustache dans le template
		data.addPartial('header', 'header/default');
		data.addPartial('meetspotItem', 'list/item-meetspot');
		data.addPartial('footer', 'footer/tab-bar');
		
        // on determine la data qui sera utilisee par mustache pour aficher le template
        data.data = {
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
        meetadvisor.render(data);
    },
	

};