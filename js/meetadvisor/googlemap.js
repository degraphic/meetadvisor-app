var GoogleMap = function GoogleMap() {};

GoogleMap.prototype = {

	lat: null,
	lng: null,
	parent: null,
	target: null,
	onReady: null,
	map: null,
	
	init: function(that, updating, handler) {
		this.onReady = handler;
		this.parent = that;
		
		if (!this.isGMapsAlreadyLoaded()) {
			this.loadGmapApi(that);
		} else if (!updating) {
			this.gMapInit(that);
		}
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
	
	loadGmapApi: function (instance) {
		var sensorValue = this.isGpsDevice() ? "true" : "false";
		var that = this;
		
		$.getJSON('https://www.google.com/jsapi?callback=?', function () {		
			google.load('maps', 3.9, {
				callback: function () {
					that.gMapInit(instance);
				},
				other_params: "sensor="+sensorValue
			});
		});
	},
	
	isGpsDevice: function() {
		// TODO : If phonegap gps device is dectected then set param sensor to true
		return false;
	},
	
	gMapInit: function (that) {
		// Manage geolocated coordonates : 48;2 is Paris
		var geolocatedLat = 48.85872551801016;
		var geolocatedLng = 2.3372126802368243;
		
		if (this.isGpsDevice()) {
			// TODO RETRIEVE GPS LOCATION		
		} else if (this.isGoogleClientLocation()) {
			geolocatedLat = google.loader.ClientLocation.latitude;
			geolocatedLng = google.loader.ClientLocation.longitude;		
		}
		
		// Define map options
		var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(geolocatedLat, geolocatedLng),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: true,
            scrollwheel: false,
            streetViewControl: true
        };
	
        this.setMap(new google.maps.Map(that.settings.mapContainer, mapOptions));

		// Set map position & marker with geolocated data
		this.gMapSetPosition(geolocatedLat, geolocatedLng);
		
		// fire the ready event !
		this.onReady(that);
    },
	
	gMapSetPosition: function (lat, lng) {
        this.getMap().setCenter(new google.maps.LatLng(lat, lng));
		var test = this.getMap().getCenter();
		console.log("position:" + test.lat() + " " + test.lng());
    },
	
	gMapSetMarker: function (lat, lng, clickEvent, maData, maParent, mkgImage) {
		
		// Store instance
		var that = this;

        this.gMapMarker = new google.maps.Marker({
            map: that.getMap(),
			icon: mkgImage,
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
			data: maData,
			parent: maParent
        });
		
		// some test
		google.maps.event.addListener(this.gMapMarker, 'click', clickEvent);

	},
	
	gMapCreateInfoWindow: function (content, pos) {
		var window = new google.maps.InfoWindow();

		window.setContent(content);
		window.setPosition(pos);
		//window.open(this.map);
		
		return (window);		
	},
	
	
	isGoogleClientLocation: function() {
	
		if (typeof(google.loader) == "undefined") {
			return false;
		} else {
			if (typeof(google.loader.ClientLocation) == "undefined" || google.loader.ClientLocation == null) {
				return false;
			} else {
				return true;
			}
		}

	},
	
	test : function () {
		alert("googlemap");
	},
	
	/* GETTERS - SETTERS */
	getMap: function() {
		return this.map;
	},
	
	setMap: function(gMap) {
		this.map = gMap;
	}

}





