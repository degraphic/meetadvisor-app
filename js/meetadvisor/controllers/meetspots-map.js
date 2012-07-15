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
				that.gmap.gMapSetMarker(venue.getLat(), venue.getLng(), that.onMarkerClick, venue, that, tab[venue.ambiance]);
			});
		});
	},
	
	onMarkerClick: function (evt) {
		// handler called in GoogleMap
		// this.parent = this
	
		meetadvisor.current_venue = this.data;
		
		var content = '<div class="infobulleTitle"><div class="infobulleName">' + this.data.name + '</div><div class="infobulleType">(bar étudiant)</div></div>';
		content += '<br /><div class="infobulleArrow"><a href="#meetspotsMap/popup/place/id/'+ this.data.id +'"><img src="img/icons/arrow.png" width=29" height="29" alt="an arrow" /></a></div>';
		content += '<div class="infobulleAdresse"><a href="https://maps.google.com/maps?hl=en&q=32,+rue+Albert+Thomas+75010+Paris&ie=UTF-8" target="_blank">32, rue Albert Thomas 75010 Paris</a></div>';

		//content += ' Distance: 900 metres<br/>Reduc: happy hour toute la nuit pour les filles<br/><br/>';
		//content += '<a id="infobulleAction" class="button blue" href="#meetspotsMap/popup/place/id/'+ this.data.id +'">PLUS D INFOS</a></buttons>';
		
		var coordInfoWindow = this.parent.gmap.gMapCreateInfoWindow(this, content, evt.latLng);
		
		// only one info window at a time !
		if (this.parent.last_infoWindow != null) {
			this.parent.last_infoWindow.close();
		} 
		this.parent.last_infoWindow = coordInfoWindow;
	},
}




