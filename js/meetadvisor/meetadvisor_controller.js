var MeetAdvisorController = function MeetAdvisorController() {};

MeetAdvisorController.prototype = {

    _404: function(data) {
        data.page.file = "404";

        // on fait un callback de "post-render"
        meetadvisor.render(data, function(){alert('404')});
    },

    login: function(data) {
        data.page.file = "login";
        meetadvisor.render(data, function() {
			$("#submit").click(function() {		
			    if ($("#login").val() == "" || $("#pwd").val() == "") {
				    alert("Merci d'entrer un login et un mot de passe.");
			    }
			    else {
				    //alert ($("#login").val()+ $("#pwd").val());
				    var ws = new MeetAdvisorApi();
				    ws.login($("#login").val(),$("#pwd").val());
			    }
            });
        });
    },

    createAccount: function(data) {
        data.page.file = "create-account";
        meetadvisor.render(data);
    },

    meetspots: function(data) {
        data.page.file = "meetspots";
        meetadvisor.render(data);
    },

    checkin: function(data) {
        data.page.file = "checkin";
        meetadvisor.render(data);
    },

    profile: function(data) {
        data.page.file = "profile";
        meetadvisor.render(data);
    },

    testMustache: function(data) {
        data.page.file = "test-mustache";

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
        
        // on ajoute un partial qui sera appelable par mustache dans le template
        data.addPartial('bar_element', 'test-partial');

        // on demande a render la page
        meetadvisor.render(data);
    },
};
