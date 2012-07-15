var Place = function Place() {};

Place.prototype = {
	
	init: function() {
		debugger;
	},
	
	render: function(render_data) {
		if (meetadvisor.current_venue == null) {
			this.complicated(render_data);
		} else { 
			this.simple(render_data);
		}
	},
	
	// j'ai de la data
	simple: function (render_data) {
		render_data.data = meetadvisor.current_venue;
		meetadvisor.render(render_data);
	},
	
	// j'ai pas de data
	complicated: function (render_data) {
		meetadvisor.current_venue = render_data;
		meetadvisor.api.getPlaceInfo(render_data.request_params["id"], this.wsDataReponse, render_data);
	},
	
	wsDataReponse: function (data) {
		meetadvisor.current_venue.data = data;
		meetadvisor.render(meetadvisor.current_venue);
	},
		
}
