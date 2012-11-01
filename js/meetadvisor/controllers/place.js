var Place = function Place() {};

Place.prototype = {
	
	init: function() {
		//debugger;
		$("#checkIn").click(function() {
			//alert("checkIn Click !");
			//that.checkIn();
			var u = new User();
			meetadvisor.api.checkIn(meetadvisor.current_venue.id, u.getUid(), function(data) {
				console.log(data);
				//alert("checkIn OK");		
			});
		});
	},
	

	checkInCallBack: function() {
		// button check
		alert("checkIn OK");
	},
}
