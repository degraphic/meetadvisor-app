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
		
		var content = '<h4>' + this.data.name + '</h4>';
		content += '<br/>';
		content += ' Distance: 900 metres<br/>Reduc: happy hour toute la nuit pour les filles<br/>';
		content += '<a class="button blue" href="#meetspotsMap/popup/place/id/'+ this.data.id +'">PLUS D INFOS</a></buttons>';
		
		var coordInfoWindow = new google.maps.InfoWindow();

		coordInfoWindow.setContent(content);
		coordInfoWindow.setPosition(evt.latLng);
		
		this.parent.gmap.position = evt.latLng;
		console.log("click: center changed" + this.parent.gmap.position.lat() + "  " +  this.parent.gmap.position.lng());
		
		coordInfoWindow.open(this.map);
		
		// only one info window at a time !
		if (this.parent.last_infoWindow != null) {
			this.parent.last_infoWindow.close();
		} 
		this.parent.last_infoWindow = coordInfoWindow;
	},
}




