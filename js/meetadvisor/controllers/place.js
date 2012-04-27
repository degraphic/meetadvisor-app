var Place = function Place() {};

Place.prototype = {
	
	init: function() {
		debugger;
	},
	
	getInfo: function(render_data) {
		//debugger;
		
		if (meetadvisor.current_venue == null) {
			location.hash = '#prout';
			return (null);
		}
		
		
		//render_data.request_params["id"]
		
	

	
		var tab = {
			id: meetadvisor.current_venue.id,
			name: meetadvisor.current_venue.name,
			type: meetadvisor.current_venue.ambiance,
			description: "Un petit bar sympa avec une ambiance chaleureuse",
			location_address: address,
			location_address_urlencoded: address.replace(" ", "+"),
			offer1: "50% sur les coktails",
			offer_id: "42"
			};
			
		return (meetadvisor.current_venue);
	},
	
	
}