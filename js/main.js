$(document).ready(function () {
    meetadvisor = new MeetAdvisor();
    meetadvisor.init();

    $(window).hashchange(function () { meetadvisor.navigate(location.hash) });
    meetadvisor.navigate(location.hash);
		
});

