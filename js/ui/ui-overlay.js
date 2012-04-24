var UiOverlay = function UiOverlay() { this.init() };

UiOverlay.prototype = {

	ID_CONTENT: 'overlay-content',

	init: function() {
	},

	show: function(file) {
		// Bind close popup button
		$(document.getElementById('overlay-close')).click(function() {
			// Reset hash
			//location.hash = '#' + meetadvisor.current_page;
			
			 $("#overlay-content").empty();
			document.getElementById('overlay-modal').style.display = 'none';
			//reset hash
			var tab = location.hash.split('/');
			location.hash = tab[0];
			
		});
		
		// simule navigate et parse_uri
		var renderData = new MeetAdvisorRenderData();
		
		
		// simule le controler 
		renderData.inner_rendering_id = this.ID_CONTENT;
		//renderData.page.file = file;
		//meetadvisor.render(renderData);

		// call le controler (better than simule)
		// TODO : refactorer ca en un truc plus cool
		if (file == "place") {
			meetadvisor.controller.place(renderData);
		}
		if (file == "coupon") {
			meetadvisor.controller.coupon(renderData);
		}
		
		
		// prepare le DOM
		document.getElementById('overlay-modal').style.display = 'block';
	},
		
	hide: function() {
		$(document.getElementById('overlay-content')).empty();
		document.getElementById('overlay-modal').style.display = 'none';
	},

};