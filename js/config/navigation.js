MEET_ADVISOR_DEFAULT_TEMPLATE = 'default';
MEET_ADVISOR_DEFAULT_PAGE = 'login';
MEET_ADVISOR_404_PAGE = '_404';

MEET_ADVISOR_VALID_PAGES = {
    login: true,
    createAccount: true,	
    meetspots: true,
    checkin: true,
    profile: true,
    _404: true,
    testMustache: true,
};


MEET_ADVISOR_NAVIGATION_DEFAULT = "login";
MEET_ADVISOR_NAVIGATION_404 = "_404";

MEET_ADVISOR_NAVIGATION = {
    login: {
        template: "simple",
        page : "login"
    },
    createAccount: {
        template: "simple",	
        page : "create-account"
    },	
    meetspots: {
        template: "default",
        page: "meetspots"
    },
    checkin: {
        template: "default",
        page: "checkin"
    },
    profile: {
        template: "default",
        page: "profile"
    },
    _404: {
        template: "default",
        page: "404"
    },
};

