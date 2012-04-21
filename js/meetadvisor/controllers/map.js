var Map = function Map() {};

Map.prototype = {
	
	//map: null,
	ggmap: null,

	init: function(request_params, updating) {
		var ui = new MeetAdvisorUi();
		ui.setSkin();
		
		this.ggmap = new GoogleMap();
		this.ggmap.init(this, updating, this.onMapReady);

		this.updatePopup(request_params);
	},
	
    updatePopup: function (request_params) {
        if (request_params && request_params.popup) {
            // show popup
		    document.getElementById('popup-overlay').style.display = 'block';
		    
		    // bind close popup button
		    $("#close-popup").click(function() {
			    //reset hash
			    location.hash = '#' + meetadvisor.current_page;
		    });
		    
            popup_render_data = new MeetAdvisorRenderData();
            popup_render_data.page.file = request_params.popup;
            popup_render_data.inner_rendering_id = 'popup-box';
            meetadvisor.render(popup_render_data);
        }
        else {
			$("#popup-box").empty();
			document.getElementById('popup-overlay').style.display = 'none';
        }
    },
	
	onMapReady: function (that) {
		that.populate();
	},

	populate: function () {
		var that = this;
		meetadvisor.api.venue(0, 0, function (data) {
			$.each(data, function(index, venue) { 
				that.ggmap.gMapSetMarker(venue.getLat(), venue.getLng(), that.onMarkerClick);
			});
		});
	},
	
	onMarkerClick: function (evt) {
		var content = 'Le Charlus<br />bar de quartier<br/> Distance: 900 metres<br/>Reduc: happy hour toute la nuit pour les filles<br/> <a href="#map/popup/place">PLUS D INFOS</a></buttons>';

		this.setInfoWindow(evt.latLng, content);
	
		// var coordInfoWindow = new google.maps.InfoWindow();
		// coordInfoWindow.setContent(content);
		// coordInfoWindow.setPosition(evt.latLng);
		// coordInfoWindow.open(this.map);
	},
	

}




