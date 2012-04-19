var MeetAdvisorController = function MeetAdvisorController() {};

MeetAdvisorController.prototype = {
    // 0
	profile: function(data) {
        data.page.file = "profile";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');
		
		meetadvisor.render(data, function() {            
            new UiFieldsGroup();	
		});
    },

	// 2
	gender: function(data) {
        data.page.file = "gender";
		
		meetadvisor.render(data, function() {
			$(".btWoman").click(function() {
				window.localStorage.setItem("isfemale", true);
				location.hash = "#womanmapguest";
			});

			$(".btMan").click(function() {
				window.localStorage.setItem("isfemale", false);
				location.hash = "#manmapguest";
			});
        });
		
    },

	// 3
	womanmapguest: function(data) {
        data.page.file = "womanmapguest";
		
		data.addPartial('header', 'header/meetspots-map');
		data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(data, function() {
		
			// skin selon sex
			if (window.localStorage.getItem("key") == "true" ){
				$("body").addClass("woman");
			}
			else {
				$("body").addClass("man");
			}
		
			var map = new MeetspotsMap();
			map.settings = {
				mapContainer: document.getElementById('meetspot-map')
			};
			map.init();
        });
		

	
    },
	
	// 4
	womansubscribe: function(data) {
        data.page.file = "womansubscribe";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 5
	womanmap: function(data) {
        data.page.file = "womanmap";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 6
	womanbar: function(data) {
        data.page.file = "womanbar";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 7
	coupon: function(data) {
        data.page.file = "coupon";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 8
	manmapguest: function(data) {
        data.page.file = "manmapguest";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 9
	mansubscribe: function(data) {
        data.page.file = "mansubscribe";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 10
	manmap: function(data) {
        data.page.file = "manmap";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 11
	manbar: function(data) {
        data.page.file = "manbar";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 12
	becomevip: function(data) {
        data.page.file = "becomevip";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 13
	vipmap: function(data) {
        data.page.file = "vipmap";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 14
	vipbar: function(data) {
        data.page.file = "vipbar";
		
    meetadvisor.render(data, function() {
			
        });
	
    },
	
	// 15
    error404: function(data) {
        data.page.file = "error404";
		
    meetadvisor.render(data, function() {
			
        });
		
    },
	
    login: function(data) {
		data.template.file = "simple";
        data.page.file = "login";
		
        meetadvisor.render(data, function() {
            
            new UiFieldsGroup();
        
            // Bind connect button
            $("#submit").click(function() {		
            
			    if ($("#login").val() == "" || $("#pwd").val() == "") {
				    alert("Merci d'entrer un login et un mot de passe.");
			    }
			    else {
				    meetadvisor.api.login($("#login").val(),$("#pwd").val());
			    }
            });
			
        });
    },

    createAccount: function(data) {

		data.template.file = "simple";
		data.page.file = "create-account";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(data, function() {
			new UiFieldsGroup();
		
			$("#submit").click(function() {		
            
			    if ($("#login").val() == "" || $("#pwd").val() == "" || $("#email").val() == "") {
				    alert("Merci de remplir les champs : login, mot de passe et email.");
			    }
			    else {
					var isfemale = false;
					if ($("#gender").val() == "F") {
						isfemale = true;
					}
				    meetadvisor.api.register($("#login").val(), $("#pwd").val(), $("#login").val(), $("#login").val(), isfemale);
			    }
            });

		});

    },

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
            //console.log(meetspotsList);
            meetadvisor.render(data);            
        });
		
		meetadvisor.render(data, function() {
		
			// skin selon sex
			if (window.localStorage.getItem("key") == "true" ){
				$("body").addClass("woman");
			}
			else {
				$("body").addClass("man");
			}
		});

    },
	
	meetspotsMap: function(data) {
        data.page.file = "meetspots-map";
		
		data.addPartial('header', 'header/meetspots-map');
		data.addPartial('footer', 'footer/tab-bar');

		meetadvisor.render(data, function() {
		
			// skin selon sex
			if (window.localStorage.getItem("key") == "true" ){
				$("body").addClass("woman");
			}
			else {
				$("body").addClass("man");
			}
			
		
		
			var map = new MeetspotsMap();
			map.settings = {
				mapContainer: document.getElementById('meetspot-map')
			};
			map.init();
        });
		

    },

    checkin: function(data) {
        data.page.file = "checkin";
		
		data.addPartial('header', 'header/default');
		data.addPartial('footer', 'footer/tab-bar');
		
        meetadvisor.render(data, function() {

			$("#switchsex").click(function() {		
				if (window.localStorage.getItem("key") == "true" ){
					$("body").removeClass("woman");
					$("body").addClass("man");
					window.localStorage.setItem("key", false);
				}
				else {
					$("body").removeClass("man");
					$("body").addClass("woman");
					window.localStorage.setItem("key", true);
				}
				alert("sex switched !");
				location.hash = "#";
			});
			
			$("#logout").click(function() {		
				window.localStorage.removeItem("key");
				alert("logued out !");
				location.hash = "#";
			});

			$("#VIP").click(function() {
				window.localStorage.setItem("vip", true);
				alert("you are now VIP !");
				location.hash = "#";
			});

			$("#noVIP").click(function() {
				window.localStorage.setItem("vip", false);
				alert("you are no longuer VIP !");
				location.hash = "#";
			});
			
			$("#popup").click(function() {
				location.hash = location.hash + "/create-account";
			});
       
		});
    },

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
