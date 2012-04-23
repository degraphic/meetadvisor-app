var MeetspotsMap = function MeetspotsMap() {};

MeetspotsMap.prototype = {
	
	//map: null,
	gmap: null,
	last_infoWindow: null,

	init: function(request_params, updating) {
		var ui = new MeetAdvisorUi();
		ui.setSkin();

		this.gmap = new GoogleMap();
		this.gmap.init(this, updating, this.onMapReady);

		this.updatePopup(request_params);
	},
	
    updatePopup: function (request_params) {
        if (request_params && request_params.popup) {
			var uo = new UiOverlay();
			uo.show("place");
        }
        else {
			var uo = new UiOverlay();
			uo.hide();
        }
    },
	
	onMapReady: function (that) {
		that.populate();
	},

	populate: function () {
		var that = this;
		meetadvisor.api.venue(0, 0, function (data) {
			$.each(data, function(index, venue) {
				that.gmap.gMapSetMarker(venue.getLat(), venue.getLng(), that.onMarkerClick, venue, that);
			});
		});
	},
	
	onMarkerClick: function (evt) {
		var content = this.data.name + '<br />';
		content += this.data.ambiance + '<br/>';
		content += ' Distance: 900 metres<br/>Reduc: happy hour toute la nuit pour les filles<br/>';
		content += '<a href="#meetspotsMap/popup/place/id/'+ this.data.foursquare_id +'">PLUS D INFOS</a></buttons>';
		
		var coordInfoWindow = new google.maps.InfoWindow();

		coordInfoWindow.setContent(content);
		coordInfoWindow.setPosition(evt.latLng);
		coordInfoWindow.open(this.map);
		
		// only one info window at a time !
		if (this.parent.last_infoWindow != null) {
			this.parent.last_infoWindow.close();
		} 
		this.parent.last_infoWindow = coordInfoWindow;
		
		
	},

}




