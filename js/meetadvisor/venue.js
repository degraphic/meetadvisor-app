var MeetAdvisorVenue = function MeetAdvisorVenue(data) { this.init(data); };

MeetAdvisorVenue.prototype = {
	
	id: null,
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
	title: null,
	
	init: function(data) {
		
		this.id = data.id;
		this.ambiance = data.ambiance;
		this.average_age = data.average_age;
		this.categories = data.categories;
		this.community_score = data.community_score;
		this.drinkernb = data.drinkernb;
		this.foursquare_id = data.foursquare_id;
		this.foursquare_url = data.foursquare_url;
		this.image = data.image;
		this.location_address = data.location_address;
		this.location_borough = data.location_borough;
		this.location_city = data.location_city;
		this.location_country = data.location_country;
		this.location_lat = data.location_lat;
		this.location_lng = data.location_lng;
		this.location_postal_code = data.location_postal_code;
		this.location_state = data.location_state;
		this.name = data.name;
		this.percentage_of_girls = data.percentage_of_girls;
		this.title = data.title;
    },

	
	
	/******************** UTILS ********************/
	getFullAddress: function() {
		return this.getAddress() + ", " + this.getAddress() + this.getCity() + ", " + this.getCountry();
	},	

	
	
	/******************** GETTERS / SETTERS ********************/
	/*ambiance*/
	getAmbiance: function() {
		return this.ambiance;
	},
	
	setAmbiance: function(ambiance) {
		this.ambiance = ambiance;
	},	

	/*average age*/
	getAverageAge: function() {
		return this.average_age;
	},
	
	setAverageAge: function(averageAge) {
		this.average_age = averageAge;
	},	
	
	/*categories*/
	getCategories: function() {
		return this.categories;
	},
	
	setCategories: function(categories) {
		this.categories = categories;
	},	
	
	/*community score*/
	getCommunityScore: function() {
		return this.community_score;
	},
	
	setCommunityScore: function(communityScore) {
		this.community_score = communityScore;
	},	
	
	/*community score*/
	getDrinkernb: function() {
		return this.drinkernb;
	},
	
	setDrinkernb: function(drinkernb) {
		this.drinkernb = drinkernb;
	},		

	/*foursquare id*/
	getFoursquareId: function() {
		return this.foursquare_id;
	},
	
	setFoursquareId: function(foursquareId) {
		this.foursquare_id = foursquareId;
	},
	
	/*foursquare url*/
	getFoursquareUrl: function(foursquareUrl) {
		this.foursquare_url = foursquareUrl;
	},
	
	setFoursquareUrl: function(foursquareUrl) {
		this.foursquare_url = foursquareUrl;
	},
	
	/*image*/
	getImage: function() {
		return this.image;
	},
	
	setImage: function(image) {
		 this.image = image
	},
	
	/*location address*/
	getAddress: function() {
		return this.location_address;
	},
	
	setAddress: function(address) {
		this.location_address = address;
	},
	
	/*location borough*/
	getBorough: function() {
		return this.location_borough;
	},
	
	setBorough: function(borough) {
		this.location_borough = borough;
	},
	
	/*location city*/
	getCity: function() {
		return this.location_city;
	},
	
	setCity: function(city) {
		this.location_city = city;
	},
	
	/*location country*/
	getCountry: function() {
		return this.location_country;
	},
	
	setCountry: function(country) {
		this.location_country = country;
	},
	
	/*location latitude*/
	getLat: function() {
		return this.location_lat;
	},
	
	setLat: function(lat) {
		this.location_lat = lat;
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
		this.location_postal_code = postalCode;
	},
	
	/*location state*/
	getState: function() {
		return this.location_state;
	},
	
	setLocationState: function (state) {
		this.location_state = state;
	},
	
	/*name*/
	getName: function() {
		return this.name;
	},
	
	setName: function(name) {
		this.name = name;
	},
	
	/*percentage of girls*/
	getPercentageOfGirls: function() {
		return this.percentage_of_girls;
	},
	
	setPercentageOfGirls: function(percentageOfGirls) {
		this.percentage_of_girls = percentageOfGirls;
	},
	
	/*title*/
	getTitle: function(title) {
		return this.title;
	},
	
	setTitle: function(title) {
		this.title = title;
	}
}