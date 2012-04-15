var MeetspotsMap = function MeetspotsMap() {};

MeetspotsMap.prototype = {
	
	map: null,

	init: function() {	
		
		if (!this.isGMapsAlreadyLoaded()) {
			this.loadGmapApi();
		} else {
			this.gMapInit();
		}
		
	},
	
	loadGmapApi: function () {

		var instance_ = this;
		
		$.getJSON('https://www.google.com/jsapi?callback=?', function () {		
		
			google.load('maps', 3.4, {
				callback: function () {
					instance_.gMapInit();
				},
				other_params: 'sensor=false'
			});
		});

	},
	
    isGMapsAlreadyLoaded: function () {
		
		if (typeof(google)== 'undefined') {
            
			return false;
			
        } else {
		
            if (typeof(google.maps) == 'undefined') {
			
                return false;
            } else {
                return true;
            }
        }
    },
	
	gMapInit: function () {
    
		var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(40.730885, -73.997383),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: true,
            scrollwheel: false,
            streetViewControl: true
        };
		
        this.setMap(new google.maps.Map(this.settings.mapContainer, mapOptions));
    },
	
    gMapSetPosition: function (lat, lng) {
        
		var instance_ = this;
        
		if (this.getMap() == null) {
            this.gMapInit();
        }
		
        //this.showMap();
		
        var gmapLatLng = new google.maps.LatLng(lat, lng)
        this.getMap().setCenter(gmapLatLng);
		
        if (this.gMapMarker != null) {
            this.gMapMarker.setMap(null);
        }
		
        this.gMapMarker = new google.maps.Marker({
            map: instance_.getMap(),
            position: gmapLatLng,
            animation: google.maps.Animation.DROP
        });
    },
	
	/* GETTERS - SETTERS */
	getMap: function() {
		return this.map;
	},
	
	setMap: function(map) {
		this.map = map;
	}
}