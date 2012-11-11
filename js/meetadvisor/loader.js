var Loader = function Loader() {};

Loader.prototype = {
    count: 0,
	
	init: function() {
		
	},

	loading: function() {
		this.count++;
		this.show();
		console.log("loader.loading(): count=" + this.count);
	},

	completed: function() {
		if (this.count > 0)
			this.count--;
		if (this.count == 0)
			this.hide();
		console.log("loader.completed(): count=" + this.count);
	},

	show: function() {
		document.getElementById('overlay-loading').style.display = 'block';			
	},

	hide: function() {
		document.getElementById('overlay-loading').style.display = 'none';
	},

}