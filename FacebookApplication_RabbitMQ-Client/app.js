
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var FB = require('./routes/Facebooklogin.js');
var group = require('./routes/groups');
//Importing the 'client-sessions' module
var session = require('client-sessions');

var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");


var app = express();


app.set('port', process.env.PORT || 4114);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.post('/afterSignIn', FB.afterSignIn);
app.get('/SuccessLogin',FB.redirectToHomepage);
app.get('/FacebookLogin',FB.redirectToHomepage1);
app.get('/profile',FB.redirectToHomepage2);
app.get('/interests',FB.redirectToHomepage3);
app.get('/FriendList',FB.redirectToHomepage4);
app.get('/Group',FB.redirectToHomepage5);
app.post('/signUp', FB.signUp);
app.get('/profilehere',FB.profilehere);
app.get('/takeGroups', group.takeGroups);
app.get('/deleteGroups', group.deleteGroups);
app.get('/postData' , FB.postData);
app.get('/getPosts' , FB.getPosts);
app.post('/logout',FB.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
