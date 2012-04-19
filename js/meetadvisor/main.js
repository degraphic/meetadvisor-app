var MeetAdvisorRenderData = function MeetAdvisorRenderData() {};

MeetAdvisorRenderData.prototype = {
	template : null,
	page : null,
    partial_files : null,
    partial_srcs : null,
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
        this.partial_files = {};
        this.partial_srcs = {};
        this.data = {};
    },

	addPartial: function(partial_name, partial_file) {
        this.partial_files[partial_name] = partial_file;
        this.partial_srcs[partial_name] = null;
    },
}

var MeetAdvisor = function MeetAdvisor() {};

MeetAdvisor.prototype = {
  
	api: null,
    controller: null,
    valid_pages: null,
	last_page: null,
	user: null,

	init: function () {
		
		this.api = new MeetAdvisorApi();
		this.controller = new MeetAdvisorController();
		this.valid_pages = MEET_ADVISOR_VALID_PAGES;
		
	},
    
	navigate: function (uri) {
        this.loader_overlay(true);

		var page = uri.replace(/^#/, '');
		var instance = this;
		
		//popup hook
		var tab = page.split('/');
		if (tab.length == 2) {
			page = tab[0];
			this.popup(tab[1]);
		}
		
		// check if page change
		if (page != this.last_page) {
			// do i have a session ?
			if (localStorage.getItem("key") == null) {
				// no => go to login
				if (page != "createAccount" && page != "gender") {
					page = "login";
				}
			}
			
			// check des rules
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
			this.last_page = page;
		}
		else {
			this.loader_overlay(false);
		}
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
			return;
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
        for (partial in render_data.partial_files) {
            if (!render_data.partial_srcs[partial]) {
                $.ajax({
			        url: "templates/parts/" + render_data.partial_files[partial] + ".html",
			        dataType: 'html',			
		        }).done(function(html) { 
                    render_data.partial_srcs[partial] = html;
                    meetadvisor.render(render_data, callback);
			    });
                return ;
            }
        }

        // Everything is loaded, let's actually render it :        
        $(document.getElementById('body')).html($.mustache(render_data.template.src, render_data.data, render_data.partial_srcs));
        $(document.getElementById('content')).html($.mustache(render_data.page.src, render_data.data, render_data.partial_srcs));

		// Set content position
		meetadvisor._set_content_position();
				
		// Set active tab
		meetadvisor._set_active_nav_css(render_data.page.file, $("footer"));
				
		// Bind content position on window resize / used only for desktop version
		$(window).resize(function() {
			meetadvisor._set_content_position();
		});
		
        // call callback if set
        if (callback) {
            callback();
        }
        this.loader_overlay(false);
    },

    loader_overlay: function(is_active) {
        document.getElementById('loading-overlay').style.display = is_active ? 'block' : 'none';
    },
	
	popup: function(data) {
		// show popup
		document.getElementById('popup-overlay').style.display = 'block';
		
		// bind close popup button
		$("#close-popup").click(function() {
			$("#popup-box").empty();
			document.getElementById('popup-overlay').style.display = 'none';
			
			//reset hash
			var tab = location.hash.split('/');
			location.hash = tab[0];
		});
		
		$.ajax({
			url: "pages/" + data + ".html",
			dataType: 'html',
		}).done(function(html) {
			$("#popup-box").append(html);
			//render_data.page.src = html;
			//meetadvisor.render(render_data, callback);
		});
		
	},
	
	_set_content_position: function() {
	    
		var headerEl = $('header');
		
		// Set Decal top & height for overflow management
		$('#content').css('margin-top', headerEl.outerHeight()).css('height', ($(window).height() - ( headerEl.outerHeight() + $('footer').outerHeight() ) ) );
		
	},
    
	_set_active_nav_css: function (page, footerEl) {
		$('li', footerEl).removeClass('active');
		$('#' + page, footerEl).addClass('active');
	}
};