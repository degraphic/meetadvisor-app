var Coupon = function Coupon() {};

Coupon.prototype = {
	
	init: function() {
		
	},
	
	getInfo: function(render_data) {
		var that = this;
		
		var tab = {
			id: render_data.request_params["id"],
			};
		
		var u = new User();
		
		meetadvisor.api.validateCoupon(render_data.request_params["id"], u.getUid());
		
		return (tab);
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
		var id = 1000000000 * Math.random();
		meetadvisor.current_venue.coupon_id = id.toPrecision(9);
		render_data.data = meetadvisor.current_venue;
		meetadvisor.render(render_data);
	},
	
	// j'ai pas de data
	complicated: function (render_data) {
		meetadvisor.current_venue = render_data;
		meetadvisor.api.getPlaceInfo(render_data.request_params["id"], this.wsDataReponse, render_data);
	},
	
	wsDataReponse: function (data) {
		var id = 1000000000 * Math.random();
		data.coupon_id = id.toPrecision(9);
		meetadvisor.current_venue.data = data;
		meetadvisor.render(meetadvisor.current_venue);
	},
}
