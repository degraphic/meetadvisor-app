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
		
		var renderData = new MeetAdvisorRenderData();

		renderData.page.file = file;
		renderData.inner_rendering_id = this.ID_CONTENT;
		meetadvisor.render(renderData);
		document.getElementById('overlay-modal').style.display = 'block';
	},
		
	hide: function() {
		$(document.getElementById('overlay-content')).empty();
		document.getElementById('overlay-modal').style.display = 'none';
	},

};