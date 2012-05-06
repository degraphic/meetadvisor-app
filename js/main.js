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

    $(window).hashchange(function () { meetadvisor.navigate(location.hash) });
    meetadvisor.navigate(location.hash);
}