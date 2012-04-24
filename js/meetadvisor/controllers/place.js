var Place = function Place() {};

Place.prototype = {
	
	init: function() {
	
	},
	
	getInfo: function(render_data) {
		var tab = {
			id: render_data.request_params["id"],
			name: "Le Charlus",
			type: "bar de quartier",
			description: "Un petit bar sympa avec une ambiance chaleureuse",
			location_address: "32 Rue Albert Thomas Paris",
			location_address_urlencoded: "32+Rue+Albert+Thomas+Paris",
			offer1: "50% sur les coktails",
			offer_id: "42"
			};
		return (tab);
		
	},
	
}