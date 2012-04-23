var MeetAdvisorRenderData = function MeetAdvisorRenderData() { this.init(); };

MeetAdvisorRenderData.prototype = {
	template: null,
	page: null,
    partial_files: null,
    partial_srcs: null,
    data: null,
    request_params: null,
    inner_rendering_id: null,
    
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
        this.request_params = {};
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
    current_page: null,
	last_page: null,
    current_uri: null,
    last_uri: null,
    current_params: null,
	user: null,

	init: function () {
		this.api = new MeetAdvisorApi();
		this.controller = new MeetAdvisorController();
		this.valid_pages = MEET_ADVISOR_VALID_PAGES;
		this.user = new User();
	},

	navigate: function (uri) {
		var instance = this;		
		var render_data = this.parse_uri(uri);
		
		// check if page change
		if (this.current_uri == this.last_uri)
            return false;

		// do i have a session ?
		if (this.user.isLoggedIn() == false) {
			// no => go to login
			if (this.current_page != "createAccount" &&
                this.current_page != "login"	&&
                this.current_page != "gender") {
				location.hash = '#login';
				return false;
			}
		}
		
		// auto sredirection  
		if (this.current_page == '') {
			location.hash = '#' + MEET_ADVISOR_DEFAULT_PAGE;
			return false;
		} else if (!this.valid_pages[this.current_page]) {
			location.hash = '#' + MEET_ADVISOR_404_PAGE;
			return false;
		}

		// is there a popup
		
		
		// run the standard controller or the update controller
        if (this.current_page != this.last_page) {
            this.loader_overlay(true);
			this.controller[this.current_page](render_data);
        }
        else if (this.controller[this.current_page + '__update'])
			this.controller[this.current_page + '__update'](render_data);                
        else
            return false;

        return true;
	},

    // prends une URI et en extrait l'identifiant de la page ainsi que ses parametres
    // met a jour this.last_page et this.current_page
    // Construit et retourne un objet MeetAdvisorRenderData
    parse_uri: function (uri) {
        var status = 'begin';
        var tmp_key = null;
        var render_data = new MeetAdvisorRenderData();

        render_data.template.file = MEET_ADVISOR_DEFAULT_TEMPLATE;
        this.last_uri = this.current_uri;
        this.last_page = this.current_page;
        this.current_uri = uri;
        splitted_uri = (uri.replace(/^#/, '')).split('/');
        for (k in splitted_uri) {
				if (status == 'begin') {
					this.current_page = splitted_uri[k];
					status = 'need_key';
				}
				else {
					if (status == 'need_key') {
						tmp_key = splitted_uri[k];
						status = 'need_value';
					} 
					else {
							render_data.request_params[tmp_key] = splitted_uri[k];                
							status = 'need_key';
					}
				}
				
			}
        return (render_data);
    },

	render: function(render_data, callback, dont_remove_overlay) {
	
		//TODO ne charger le HTML que quand on change par rapport au precedent  
		//TODO ne charger le HTML que quand le _data est vide

		// Load everything recursively

        // Load template if we are not doing an inner rendering
        if (!render_data.inner_rendering_id && !render_data.template.src) {
			console.log("render : loading template (" + render_data.template.file + ".html)");
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
			console.log("render : loading page (" + render_data.page.file + ".html)");
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
				console.log("render : loading partial (" + render_data.partial_files[partial] + ".html)");
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

		// is there an overlay popup to add ??
		if (render_data.request_params && render_data.request_params.popup) {
			//var overlay = new UiOverlay();
			//overlay.show(render_data.request_params.popup);
		}
		
        // Everything is loaded, let's actually render it :
        if (render_data.inner_rendering_id) {
			console.log("render : inner renderging (" + render_data.inner_rendering_id + ")");
            $(document.getElementById(render_data.inner_rendering_id)).html($.mustache(render_data.page.src, render_data.data, render_data.partial_srcs));
        } else {
			console.log("render : global renderging");
            $(document.getElementById('body')).html($.mustache(render_data.template.src, render_data.data, render_data.partial_srcs));
            $(document.getElementById('content')).html($.mustache(render_data.page.src, render_data.data, render_data.partial_srcs));
        }

		// Set content position
		meetadvisor._set_content_position();
				
		// Set active tab
		meetadvisor._set_active_nav_css(render_data.page.file, $("footer"));
				
		// Bind content position on window resize / used only for desktop version
		$(window).resize(function() {
			meetadvisor._set_content_position();
		});
		
        // call callback if set
        if (callback)
            callback();
        if (!dont_remove_overlay)
            this.loader_overlay(false);
    },

    loader_overlay: function(is_active) {
        document.getElementById('overlay-loading').style.display = is_active ? 'block' : 'none';
    },
	
	popup: function(data) {
		
		console.log(data);
		
		//var overlay = new UiOverlay();
		
		// show popup
		//overlay.show(data);
		
		$.ajax({
			url: "pages/" + data + ".html",
			dataType: 'html',
		}).done(function(html) {
			$("#popup-box").append(html);
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
