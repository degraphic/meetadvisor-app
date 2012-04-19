MEET_ADVISOR_DEFAULT_TEMPLATE = 'default';
MEET_ADVISOR_DEFAULT_PAGE = 'map';
MEET_ADVISOR_404_PAGE = 'error404';

MEET_ADVISOR_VALID_PAGES = {
	//0
	profile: true,
	//2
    gender: true,
	//3
	womanmapguest: true,
	login: true,
    createAccount: true,	
    meetspotsList: true,
	map: true,
    checkin: true,
    error404: true,
    testMustache: true,
};


MEET_ADVISOR_NAVIGATION_404 = "error404";

MEET_ADVISOR_NAVIGATION = {
	//0
    profile: {
        template: "default",
        page: "profile"
    },
	//2
	gender: {
        template: "simple",
        page : "gender"
    },
	//3
	womanmapguest: {
        template: "default",
        page: "womanmapguest"
    },	
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
	map: {
        template: "default",
        page: "map"
    },
    checkin: {
        template: "default",
        page: "checkin"
    },
    error404: {
        template: "default",
        page: "error404"
    },
};

