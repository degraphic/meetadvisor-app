var MeetAdvisorRenderData = function MeetAdvisorRenderData() {};

MeetAdvisorRenderData.prototype = {
	template : null,
	page : null,
    partials : null,
    data : null,
    
    init: function() {
	    this.template = {
		    file: null, 
		    src: null
	    };
	    this.page = {
		    file: null, 
		    src: null
	    };
        this.partials = {};
        this.data = {};
    },

	addPartial: function(partial) {
        this.partials[partial] = null;
    },
}

var MeetAdvisor = function MeetAdvisor() {};

MeetAdvisor.prototype = {
    api : null,
    controller : null,
    valid_pages : null,

	init: function () {
		this.api = new MeetAdvisorApi();
		this.controller = new MeetAdvisorController();
		this.valid_pages = MEET_ADVISOR_VALID_PAGES;
	},
    
	navigate: function (uri) {
		var page = uri.replace(/^#/, '');
		var instance = this;
	    
		if (page == '') {
			location.hash = '#' + MEET_ADVISOR_DEFAULT_PAGE;
			return ;
		} else if (!this.valid_pages[page]) {
			location.hash = '#' + MEET_ADVISOR_404_PAGE;
			return ;
		}
	    
		var render_data = new MeetAdvisorRenderData();
        render_data.init();
		render_data.template.file = MEET_ADVISOR_DEFAULT_TEMPLATE;
		this.controller[page](render_data);			
	},

    render: function(render_data, callback) {
		//TODO ne charger le HTML que quand on change par rapport au precedent  
		//TODO ne charger le HTML que quand le _data est vide

        // Load everything recursively


        // Load template
        if (!render_data.template.src) {
            $.ajax({
			    url: "templates/" + render_data.template.file + ".html",
			    dataType: 'html',			
		    }).done(function(html) { 
                render_data.template.src = html;
                meetadvisor.render(render_data, callback);                
			});
            return ;
        }

        // Load page
        if (!render_data.page.src) {
            $.ajax({
			    url: "pages/" + render_data.page.file + ".html",
			    dataType: 'html',			
		    }).done(function(html) { 
                render_data.page.src = html;
                meetadvisor.render(render_data, callback);
			});
            return ;
        }

        // Load the first missing partial
        for (partial in render_data.partials) {
            if (!render_data.partials[partial]) {
                $.ajax({
			        url: "templates/parts/" + partial + ".html",
			        dataType: 'html',			
		        }).done(function(html) { 
                    render_data.partials[partial] = html;
                    meetadvisor.render(render_data, callback);
			    });
                return ;
            }
        }

        // Everything is loaded, let's actually render it :        
        $("body").html($.mustache(render_data.template.src, render_data.data));
        $("#content").html($.mustache(render_data.page.src, render_data.data, render_data.partials));

		// Set content position
		that._set_content_position();
				
		// Set active tab
		that._set_active_nav_css(uri_base, $("footer"));
				
		// Bind content position on window resize / used only for desktop version
		$(window).resize(function() {
			that._set_content_position()
		});
				
		if (render_data.page.file == "login") {
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
        }

        // call callback if set
        if (callback)
            callback();
    },
	
	_set_content_position: function() {
	    
		var headerEl = $('header');
		
		// Set Decal top & height for overflow management
		$('#content').css('margin-top', headerEl.outerHeight())
			.css('height', ($(window).height() - ( headerEl.outerHeight() + $('footer').outerHeight() ) ) );
		
	},
    
	_set_active_nav_css: function (page, footerEl) {
		$('li', footerEl).removeClass('active');
		$('#' + page, footerEl).addClass('active');
	}
};
