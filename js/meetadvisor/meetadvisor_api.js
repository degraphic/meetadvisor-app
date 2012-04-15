var MeetAdvisorApi = function MeetAdvisorApi () {};

MeetAdvisorApi.prototype = {
	// properties

	server_address : "http://api.meet-advisor.com/LoginService.svc",
	
	// methods
	
    login : function (login,password) {
        // TODO
		var wsUrl = this.server_address + "/login/" + login + "/" + password;
		
		alert('calling webservices...' + wsUrl);
		
				
		// $.getJSON(wsUrl, function(data) {
            // alert("data:" + data);
			// console.log(data);
			// //uncomment this for debug
            // //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
            // //$('#showdata').html("<p>item1="+data.item1+" item2="+data.item2+" item3="+data.item3+"</p>");
        // });
		
		$.ajax({
				url: wsUrl,
					dataType: 'json',
					success: function(data) {
						//$('.result').html(data);
						alert('success');
					},
					// error: function(data) {
						// //$('.result').html(data);
						// alert('error');
					// },
					error:function (xhr, ajaxOptions, thrownError){
                    alert(xhr.status);
                    alert(thrownError);
					},  
					
				}).done(function(data) { 
					
					alert('success');
					
			});
    },
	
	register : function (login, password, mail, uid, isfemale) {
	
			$.ajax({
				url: this.server_address + "/register/" + login + "/" + password + "/" + mail + "/" + uid + "/" + isfemale,
							dataType: 'json',
				}).done(function(data) { 
					console.log(data);
					alert('success');
					
			});
	
	}
	
};
