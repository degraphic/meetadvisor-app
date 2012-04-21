var UiOverlay = function UiOverlay() { this.init() };

UiOverlay.prototype = {

	ID_CONTENT: 'overlay-modal-content',

	init: function() {

		// Bind close popup button
		$(document.getElementById('overlay-close')).click(function() {
			// Reset hash
			location.hash = '#' + meetadvisor.current_page;
		});
	
	},

	show: function(file) {
	
		document.getElementById('overlay-modal').style.display = 'block';
	
		var renderData = new MeetAdvisorRenderData();
		renderData.page.file = file;
		renderData.inner_rendering_id = this.ID_CONTENT;
		meetadvisor.render(renderData);

	},
		
	hide: function() {
		$(document.getElementById('overlay-modal')).empty();
		document.getElementById('overlay-modal').style.display = 'none';
	},

};