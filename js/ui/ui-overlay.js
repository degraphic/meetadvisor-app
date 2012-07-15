var UiOverlay = function UiOverlay() { this.init() };

UiOverlay.prototype = {

	ID_CONTENT: 'overlay-content',

	init: function() {
	},

	show: function(request_params, file) {
		console.log("UIOverlay: show");
		// Bind close popup button
		$(document.getElementById('overlay-close')).click(function() {
			 $("#overlay-content").empty();
			document.getElementById('overlay-modal').style.display = 'none';
			//reset hash
			var tab = location.hash.split('/');
			location.hash = tab[0];
		});
		
		// simule navigate et parse_uri
		var renderData = new MeetAdvisorRenderData();
		renderData.inner_rendering_id = this.ID_CONTENT;
	
		// sav
		var file = request_params.popup;
		
		// propage les request_params sauf popup
		delete request_params.popup;
		renderData.request_params = request_params;
		
		// call le controler
		// TODO : refactorer ca en un truc plus cool
		if (file == "place") {
			meetadvisor.controller.place(renderData);
		}
		if (file == "coupon") {
			meetadvisor.controller.coupon(renderData);
		}
		if (file == "profile") {
			meetadvisor.controller.profile(renderData);
		}
		if (file == "checkin") {
			meetadvisor.controller.checkin(renderData);
		}
	
		// prepare le DOM
		document.getElementById('overlay-modal').style.display = 'block';
	},
		
	hide: function() {
		$(document.getElementById('overlay-content')).empty();
		document.getElementById('overlay-modal').style.display = 'none';
	},

};