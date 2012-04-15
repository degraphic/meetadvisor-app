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

		$.ajax({
			url: 'https://maps-api-ssl.google.com/maps/api/js?v=3&sensor=true',
			dataType: 'json',
		}).done(function(data) { 
			console.log(data);
			alert('success');
		});
		/*
		$.getJSON('https://maps-api-ssl.google.com/maps/api/js?v=3&sensor=false&callback=?', function () {
			console.log('loaded');
			instance_.gMapInit();
		})
		.success(function() { console.log('success'); return "SUCCESS"; })
		.error(function() {  console.log('error'); return "ERROR"; })
		.complete(function() { console.log('complete'); return "COMPLETE"; });
		*/
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
		
        setMap(new google.maps.Map(this.settings.mapContainer, mapOptions));
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