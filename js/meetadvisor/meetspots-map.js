var MeetspotsMap = function MeetspotsMap() {};

MeetspotsMap.prototype = {
	
	map: null,
	chicago: null,

	init: function() {	
		
		if (!this.isGMapsAlreadyLoaded()) {
			this.loadGmapApi();
		} else {
			this.gMapInit();
		}
		
	},
	
	loadGmapApi: function () {

		var instance_ = this;
		var sensorValue = this.isGpsDevice() ? "true" : "false";
		
		$.getJSON('https://www.google.com/jsapi?callback=?', function () {		
		
			google.load('maps', 3.8, {
				callback: function () {
					instance_.gMapInit();
				},
				other_params: "sensor="+sensorValue
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
	
	isGoogleClientLocation: function() {
	
		if (typeof(google.loader) == "undefined") {
			return false;
		} else {
			if (typeof(google.loader.ClientLocation) == "undefined") {
				return false;
			} else {
				return true;
			}
		}

	},
	
	isGpsDevice: function() {
		// TODO : If phonegap gps device is dectected then set param sensor to true
		return false;
	},
	
	isHtml5Gelocation: function() {
		// TODO : Check if html5 geoLocation is available
		return false;	
	},
	
	gMapInit: function () {
    	
		// Manage geolocated coordonates
		var geolocatedLat = "40.730885";
		var geolocatedLng = "-73.997383";
		
		if (this.isGpsDevice()) {
			// TODO RETRIEVE GPS LOCATION		
		} else if (this.isGoogleClientLocation()) {
			geolocatedLat = google.loader.ClientLocation.latitude;
			geolocatedLng = google.loader.ClientLocation.longitude;		
		} else if (isHtml5Gelocation()) {
			// USE HTML5 GEOLOCATION
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
	
        this.setMap(new google.maps.Map(this.settings.mapContainer, mapOptions));

		// Set map position & marker with geolocated data
		this.gMapSetPosition(geolocatedLat, geolocatedLng);
		this.gMapSetMarker(geolocatedLat, geolocatedLng);
		
		// some test
		this.Antoinetestdestrucs();
    },
	
    gMapSetPosition: function (lat, lng) {
        this.getMap().setCenter(new google.maps.LatLng(lat, lng));
    },
	
	gMapSetMarker: function (lat, lng) {
		
		// Store instance
		var instance_ = this;

        this.gMapMarker = new google.maps.Marker({
            map: instance_.getMap(),
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP
        });

	},
	
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	
	Antoinetestdestrucs: function () {
		this.chicago = new google.maps.LatLng(48.850033,2.297383);
	
		var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(this.createInfoWindowContent());
        coordInfoWindow.setPosition(this.chicago);
        coordInfoWindow.open(this.map);
	},
	
		
	
	createInfoWindowContent: function () {
        var numTiles = 1 << this.map.getZoom();
        var projection = new MercatorProjection();
        var worldCoordinate = projection.fromLatLngToPoint(this.chicago);
        var pixelCoordinate = new google.maps.Point(
            worldCoordinate.x * numTiles,
            worldCoordinate.y * numTiles);
        var tileCoordinate = new google.maps.Point(
            Math.floor(pixelCoordinate.x / TILE_SIZE),
            Math.floor(pixelCoordinate.y / TILE_SIZE));

        return ['Chicago, IL',
                'LatLng: ' + this.chicago.lat() + ' , ' + this.chicago.lng(),
                'World Coordinate: ' + worldCoordinate.x + ' , ' +
                  worldCoordinate.y,
                'Pixel Coordinate: ' + Math.floor(pixelCoordinate.x) + ' , ' +
                  Math.floor(pixelCoordinate.y),
                'Tile Coordinate: ' + tileCoordinate.x + ' , ' +
                  tileCoordinate.y + ' at Zoom Level: ' + this.map.getZoom() +
				  '<br /><a href="#womanmapguest/create-account">inscription a meetadvisor</a>'
               ].join('<br>');
    },
	
	
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee
	// ANTOINEEEEEEEEEEEEEEEee

	
	/* GETTERS - SETTERS */
	getMap: function() {
		return this.map;
	},
	
	setMap: function(gMap) {
		this.map = gMap;
	}
}


// ANTOINEEEEEEEEEEEEEEEee
// ANTOINEEEEEEEEEEEEEEEee
// ANTOINEEEEEEEEEEEEEEEee
// ANTOINEEEEEEEEEEEEEEEee
// ANTOINEEEEEEEEEEEEEEEee
// ANTOINEEEEEEEEEEEEEEEee


var TILE_SIZE = 256;

function MercatorProjection() {
	this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2,
		TILE_SIZE / 2);
	this.pixelsPerLonDegree_ = TILE_SIZE / 360;
	this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}
	  
	  
MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
        var me = this;
        var point = opt_point || new google.maps.Point(0, 0);
        var origin = me.pixelOrigin_;

        point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

        // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
        // 89.189.  This is about a third of a tile past the edge of the world
        // tile.
        var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
            0.9999);
        point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
            -me.pixelsPerLonRadian_;
        return point;
};

MercatorProjection.prototype.fromPointToLatLng = function(point) {
        var me = this;
        var origin = me.pixelOrigin_;
        var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
        var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
        var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) -
            Math.PI / 2);
        return new google.maps.LatLng(lat, lng);
};

function bound(value, opt_min, opt_max) {
	if (opt_min != null) value = Math.max(value, opt_min);
	if (opt_max != null) value = Math.min(value, opt_max);
	return value;
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

