var uiFieldsGroup = function uiFieldsGroup() { this.init(); };

uiFieldsGroup.prototype = {

	init: function() {
	
		// Store instance
		var instance_ = this;
		
		// Laun crawl
		this.crawlDom();
		
		// Bind on window resize
		$(window).resize(function() {
			instance_.crawlDom();
		});
		
	},

	crawlDom: function() {
		
		// Store instance
		var instance_ = this;

		// Vars
		var contentEl = $('#content');
		var labelMaxWidth = 0;		

		// Crawl DOM
		$('[data-role="fields-group"]', contentEl).each(function() {
		
				var fieldsGroupEl = this;
				var currentLabelWidth = 0;
				
				$('label', fieldsGroupEl).each(function() {
				
					currentLabelWidth = $(this).outerWidth(true);
					
					if (currentLabelWidth > labelMaxWidth) {
						labelMaxWidth = currentLabelWidth;
					}

				});
				
				instance_.applyDisplay(fieldsGroupEl, labelMaxWidth, ($(fieldsGroupEl).outerWidth() - labelMaxWidth));
		});

	},
	
	applyDisplay: function(fieldsGroupEl, labelMaxWidth, inputMaxWidth) {
		
		$('label', fieldsGroupEl).each(function() {
			$(this).css('width', labelMaxWidth);
		});
		
		$('input', fieldsGroupEl).each(function() {
			$(this).css('width', inputMaxWidth - 5);
		});
		
	}

};