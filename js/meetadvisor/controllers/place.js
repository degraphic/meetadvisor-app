var Place = function Place() {};

Place.prototype = {
	
	init: function() {
		$("#checkIn").click(function() {
			if ($("#checkIn").is(":enabled")) {
				var u = new User();
				meetadvisor.api.checkIn(meetadvisor.current_venue.id, u.getUid(), function(data) {
					$("#checkInCheck").show();
					$("#checkIn").attr('disabled', 'disabled');
					$("#checkInText").css("color","#cd9ab3");
				});
			}
		});
	},
};
