// See handlebarsjs.com for details. Here, we register
// a re-usable fragment of HTML called a "partial" which
// may be inserted somewhere in the DOM using a function
// call instead of manual insertion of an HTML String.
Handlebars.registerPartial('tweet', Handlebars.templates['tweet']);

// Global variable set when a user is logged in. Note
// that this is unsafe on its own to determine this: we 
// must still verify every server request. This is just 
// for convenience across all client-side code.
currentUser = undefined;

// A few global convenience methods for rendering HTML
// on the client. Note that the loadPage methods below
// fills the main container div with some specified 
// template based on the relevant action.

var loadPage = function (template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

var loadHomePage = function () {
	if (currentUser) {
		loadFeedPage();
	} else {
		loadPage('index');
	}
};

var loadFeedPage = function () {
	$.get('/tweets', function(response) {
		loadPage('tweets', { tweets: response.content.tweets, currentUser: currentUser });
		$('#show-follow').show();
		$('#show-all').hide();
	});
};

var loadFollowingPage = function () {
	$.get('/follow', function (response) {
		loadPage('tweets', { tweets: response.content.tweets, currentUser: currentUser });
		$('#show-follow').hide();
		$('#show-all').show();
	});
};

$(document).ready(function () {
	$.get('/users/current', function (response) {
		if (response.content.loggedIn) {
			currentUser = response.content.user;
		}
		loadHomePage();
	});
});

$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('click', '#show-all', function(evt) {
	evt.preventDefault();
	loadHomePage();
});


$(document).on('click', '#show-follow', function(evt) {
	evt.preventDefault();
	loadFollowingPage();
});

$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});

