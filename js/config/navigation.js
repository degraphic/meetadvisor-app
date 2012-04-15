MEET_ADVISOR_DEFAULT_TEMPLATE = 'default';
MEET_ADVISOR_DEFAULT_PAGE = 'meetspotsMap';
MEET_ADVISOR_404_PAGE = 'error404';

MEET_ADVISOR_VALID_PAGES = {
    login: true,
    createAccount: true,	
    meetspotsList: true,
	meetspotsMap: true,
    checkin: true,
    profile: true,
    error404: true,
    testMustache: true,
};


MEET_ADVISOR_NAVIGATION_404 = "error404";

MEET_ADVISOR_NAVIGATION = {
    login: {
        template: "simple",
        page : "login"
    },
    createAccount: {
        template: "simple",	
        page : "create-account"
    },	
    meetspotsList: {
        template: "default",
        page: "meetspots-list"
    },
	meetspotsMap: {
        template: "default",
        page: "meetspots-map"
    },
    checkin: {
        template: "default",
        page: "checkin"
    },
    profile: {
        template: "default",
        page: "profile"
    },
    error404: {
        template: "default",
        page: "error404"
    },
};

