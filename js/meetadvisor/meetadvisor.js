var MeetAdvisor = function MeetAdvisor() {};

MeetAdvisor.prototype = {
    
	current_template: null,
	current_page: null,
	current_template_src: null,
	current_page_src: null,
	view: null,
    
	init: function () {
		this.api = new MeetAdvisorApi();
		this.view = new MeetAdvisorView();
		this.navigation_config = MEET_ADVISOR_NAVIGATION;
	},
    
	navigate: function (uri) {
        
		uri_base = uri.replace(/^#/, '');
		nav = this.navigation_config[uri_base];
	    

        if (uri_base == '') {
			uri_base = MEET_ADVISOR_NAVIGATION_404;
			nav = this.navigation_config['_404'];            
        } else if (!nav) {
			uri_base = MEET_ADVISOR_NAVIGATION_DEFAULT;
			nav = this.navigation_config[uri_base];
		}
	    
		var view_data = new MeetAdvisorViewData();
		view_data.template.file = nav.template;
		view_data.page.file = nav.page;        
		view_data = this.view[uri_base](view_data);
	    
		//TODO ne charger le HTML que quand on change par rapport au precedent  
		//TODO ne charger le HTML que quand le _data est vide
		//TODO handle le _src avec mustache + le _data
	    
		that = this;
        
		$.ajax({
			url: "templates/" + view_data.template.file + ".html",
			dataType: 'html',
		}).done(function(html) { 
			
			$("body").html(html);
			
			$.ajax({			
				url: "pages/" + view_data.page.file + ".html",
				dataType:'html',
			}).done(function(html) { 
				
				$("#content").html(html);
				
				// Set content position
				that._set_content_position();
				
				// Set active tab
				that._set_active_nav_css(uri_base, $("footer"));
				
				// Bind content position on window resize / used only for desktop version
				$(window).resize(function() {
					that._set_content_position()
				});
				
			});
			
		});
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
