var MeetspotsMap = function MeetspotsMap() {};

MeetspotsMap.prototype = {
	
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
			uo.show(request_params);
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
		var tab = [
				new google.maps.MarkerImage("img/cocktail.png"),
				new google.maps.MarkerImage("img/coke.png"),
				new google.maps.MarkerImage("img/wine.png")
			];
		
		meetadvisor.api.VenuesAndDrinkerCount(function (data) {
			$.each(data, function(index, venue) {
				that.gmap.gMapSetMarker(venue.getLat(), venue.getLng(), that.onMarkerClick, venue, that, "img/barMapPicto.png");
			});
		});
	},
	
	onMarkerClick: function (evt) {
		meetadvisor.current_venue = this.data;
		
		var content = '<div class="infobulleTitle">';
		content += '<div class="infobulleImage"><img src="img/bar' + ((Math.random() * 100) << 0) % 3 +'.png" width="40" height="32" alt="un bar" /></div>';
		content += '<div class="infobulleName">' + this.data.name + '</div>';
		content += '</div>';
		content += '<div class="infobulleAdresse">' + this.data.location_address + '</div>';
		content += '<div class="infobulleAdresse">' + this.data.location_city + '</div>';
		content += '<div class="infobulleButton"><button class="button action-cancel block" onclick="location.hash = \'#meetspotsMap/popup/place/id/'+ this.data.id +'\';">';
		content += '<div class="infobulleButtonText">Plus d\'infos</div>';
		content += '<div class="infobulleArrow"><img src="img/icons/arrow.png" width=29" height="29" alt="an arrow" /></div>';
		content += '</button></div>';

		//var coordInfoWindow = this.parent.gmap.gMapCreateInfoWindow(this, content, evt.latLng);
		var coordInfoWindow = this.parent.gmap.gMapCreateInfoWindow(this, content, google.maps.LatLng(this.data.location_lat, this.data.location_lng), evt.height);
		
		// only one info window at a time !
		if (this.parent.last_infoWindow != null) {
			this.parent.last_infoWindow.close();
		} 
		this.parent.last_infoWindow = coordInfoWindow;
	},
}




