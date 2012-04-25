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
			google.load('maps', 3.4, {
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
		// Manage geolocated coordonates
		var geolocatedLat = "40.730885";
		var geolocatedLng = "-73.997383";
		
		if (this.isGpsDevice()) {
			// TODO RETRIEVE GPS LOCATION		
		} else if (this.isGoogleClientLocation()) {
			geolocatedLat = google.loader.ClientLocation.latitude;
			geolocatedLng = google.loader.ClientLocation.longitude;		
		}
		
		// Define map options
		var mapOptions = {
            zoom: 14,
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
    },
	
	gMapSetMarker: function (lat, lng, clickEvent, maData, maParent, mkgImage) {
		
		// Store instance
		var that = this;
		//var ico = new google.maps.MarkerImage(imgUrl);

        this.gMapMarker = new google.maps.Marker({
            map: that.getMap(),
			icon: mkgImage,
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
			data: maData,
			parent: maParent
        });
		
		var icon = new google.maps.MarkerImage("http://domain/path/beach_flag.png", null, null, new google.maps.Point(0, 32));
		

		// some test
		google.maps.event.addListener(this.gMapMarker, 'click', clickEvent);

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
	
	setInfoWindow: function (point, message) {
		//var point = new google.maps.LatLng(lat, lng);
		var coordInfoWindow = new google.maps.InfoWindow();
		
        coordInfoWindow.setContent(message);
        coordInfoWindow.setPosition(point);
        coordInfoWindow.open(this.map);
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





