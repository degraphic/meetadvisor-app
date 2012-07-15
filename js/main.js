$(document).ready(function () {
    meetadvisor = new MeetAdvisor();
    meetadvisor.init();

    var u = new User();
    u.logout(false);
    var token = u.token();
    if (token != null) {
        meetadvisor.api.loginWithToken(token, function () {
            start(u, meetadvisor);
        });
    }
    else {
        start(u, meetadvisor);
    }
});

function start(u, meetadvisor) {

    $(window).hashchange(function () { 
		meetadvisor.navigate(location.hash) 
		});
    meetadvisor.navigate(location.hash);
}

function error_forward(msg) {
	
	msg = msg.replace("&", "%26");
	
	var tab = {
		"msg":msg,
		"appCodeName": navigator.appCodeName,
		"appName" : navigator.appName,
		"appVersion" : navigator.appVersion,
		"cookieEnabled" : navigator.cookieEnabled,
		"platform" : navigator.platform,
		"userAgent" : navigator.userAgent
	};		
		
	$.ajax({
		url: "http://test2.meet-advisor.com/report.php?msg=" + JSON.stringify(tab),
		context: document.body
	});
	
}
