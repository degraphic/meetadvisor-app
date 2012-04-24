var Coupon = function Coupon() {};

Coupon.prototype = {
	
	init: function() {
		
	},
	
	getInfo: function(render_data) {
		var that = this;
		
		var tab = {
			id: render_data.request_params["id"],
			};
		
		meetadvisor.api.validateCoupon(render_data.request_params["id"], 2, function (data) {
		});
		
		return (tab);
	},
	
}
