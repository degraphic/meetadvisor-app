var MeetAdvisorVenue = function MeetAdvisorVenue(data) { this.init(data); };

MeetAdvisorVenue.prototype = {
	
	venue: {
		ambiance: null,
		average_age: null,
		categories: null,
		community_score: null,
		drinkernb: null,
		foursquare_id:null,
		foursquare_url: null,
		image: null,
		location_address: null,
		location_borough: null,
		location_city: null,
		location_country: null,
		location_lat: null,
		location_lng: null,
		location_postal_code: null,
		location_state: null,
		name: null,
		percentage_of_girls: null,
		title: null
	},
	
	init: function(data) {
	
		this.venue.ambiance = data.ambiance;
		this.venue.average_age = data.average_age;
		this.venue.categories = data.categories;
		this.venue.community_score = data.community_score;
		this.venue.drinkernb = data.drinkernb;
		this.venue.foursquare_id = data.foursquare_id;
		this.venue.foursquare_url = data.foursquare_url;
		this.venue.image = data.image;
		this.venue.location_address = data.location_address;
		this.venue.location_borough = data.location_borough;
		this.venue.location_city = data.location_city;
		this.venue.location_country = data.location_country;
		this.venue.location_lat = data.location_lat;
		this.venue.location_lng = data.location_lng;
		this.venue.location_postal_code = data.location_postal_code;
		this.venue.location_state = data.location_state;
		this.venue.name = data.name;
		this.venue.percentage_of_girls = data.percentage_of_girls;
		this.venue.title = data.title;
		
    },

	
	
	/******************** UTILS ********************/
	getFullAddress: function() {
		return this.venue.getAddress() + ", " + this.venue.getPostalCode() + this.venue.getCity() + ", " + this.venue.getCountry();
	},	

	
	
	/******************** GETTERS / SETTERS ********************/
	/*ambiance*/
	getAmbiance: function() {
		return this.venue.ambiance;
	},
	
	setAmbiance: function(ambiance) {
		this.venue.ambiance = ambiance;
	},	

	/*average age*/
	getAverageAge: function() {
		return this.venue.average_age;
	},
	
	setAverageAge: function(averageAge) {
		this.venue.average_age = averageAge;
	},	
	
	/*categories*/
	getCategories: function() {
		return this.venue.categories;
	},
	
	setCategories: function(categories) {
		this.venue.categories = categories;
	},	
	
	/*community score*/
	getCommunityScore: function() {
		return this.venue.community_score;
	},
	
	setCommunityScore: function(communityScore) {
		this.venue.community_score = communityScore;
	},	
	
	/*community score*/
	getDrinkernb: function() {
		return this.venue.drinkernb;
	},
	
	setDrinkernb: function(drinkernb) {
		this.venue.drinkernb = drinkernb;
	},		

	/*foursquare id*/
	getFoursquareId: function() {
		return this.venue.foursquare_id;
	},
	
	setFoursquareId: function(foursquareId) {
		this.venue.foursquare_id = foursquareId;
	},
	
	/*foursquare url*/
	getFoursquareUrl: function(foursquareUrl) {
		this.venue.foursquare_url = foursquareUrl;
	},
	
	setFoursquareUrl: function(foursquareUrl) {
		this.venue.foursquare_url = foursquareUrl;
	},
	
	/*image*/
	getImage: function() {
		return this.venue.image;
	},
	
	setImage: function(image) {
		 this.venue.image = image
	},
	
	/*location address*/
	getAddress: function() {
		return this.venue.location_address;
	},
	
	setAddress: function(address) {
		this.venue.location_address = address;
	},
	
	/*location borough*/
	getBorough: function() {
		return this.venue.location_borough;
	},
	
	setBorough: function(borough) {
		this.venue.location_borough = borough;
	},
	
	/*location city*/
	getCity: function() {
		return this.venue.location_city;
	},
	
	setCity: function(city) {
		this.venue.location_city = city;
	},
	
	/*location country*/
	getCountry: function() {
		return this.venue.location_country;
	},
	
	setCountry: function(country) {
		this.venue.location_country = country;
	},
	
	
	/*location latitude*/
	getLat: function() {
		return this.venue.location_lat;
	},
	
	setLat: function(lat) {
		this.venue.location_lat = lat;
	},
	
	/*location longitude*/
	getLng: function() {
		return this.location_lng;
	},
	
	setLng: function(lng) {
		this.location_lng = lng;
	},
	
	/*location postalcode*/
	getPostalCode: function() {
		return this.location_postal_code;
	},
	
	setPostalCode: function (postalCode) {
		this.venue.location_postal_code = postalCode;
	},
	
	/*location state*/
	getState: function() {
		return this.venue.location_state;
	},
	
	setLocationState: function (state) {
		this.venue.location_state = state;
	},
	
	/*name*/
	getName: function() {
		return this.venue.name;
	},
	
	setName: function(name) {
		this.venue.name = name;
	},
	
	/*percentage of girls*/
	getPercentageOfGirls: function() {
		return this.venue.percentage_of_girls;
	},
	
	setPercentageOfGirls: function(percentageOfGirls) {
		this.venue.percentage_of_girls = percentageOfGirls;
	},
	
	/*title*/
	getTitle: function(title) {
		return this.venue.title;
	},
	
	setTitle: function(title) {
		this.venue.title = title;
	}
}