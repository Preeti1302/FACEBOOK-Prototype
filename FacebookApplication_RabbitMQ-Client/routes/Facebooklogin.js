var ejs = require("ejs");
var mongo = require('./mongo');
var mq_client = require('../rpc/client');
var cryptoPassword = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';


//AFTER SIGN IN

function afterSignIn(req, res) {
	var username = req.param("email");
	var password = req.param("inputPassword");

	var cipherCode = cryptoPassword.createCipher(algorithm,password);
	var cryptedPass = cipherCode.update(password,'utf8','hex')
	cryptedPass += cipherCode.final('hex');
	
	var msg_payload = { "username": username, "password": cryptedPass };

	mq_client.make_request('fblogin_queue',msg_payload, function(err,results){

		console.log("Hi"+results.user.username);
		if(err){
			throw err;
		}
		else 
		{
			console.log("value of status code at client is : "+results.code);
			if(results.code == 200){
				console.log("valid Login");
				req.session.username=results.user;
				console.log("This is the session: "+req.session.username);
				res.send({"login":"Success"});
			}
			else if(results.code == 401) {    

				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});

};

//REDIRECTS TO HOMEPAGE

exports.redirectToHomepage = function(req, res) {
	//Checks before redirecting whether the session is valid
	if(req.session.username){
		console.log("Valid Login");
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		ejs.renderFile("./views/SuccessLogin.ejs",{data:req.session.username}, function(err, result){
			if(!err){
				res.end(result);
			}
			else{
				res.end('An error occured');
			}

		});     
	}
	else{
		res.render("FacebookLogin.ejs");           
	}
};

//Redirects to home page
exports.redirectToHomepage1 = function(req, res) {
	//Checks before redirecting whether the session is valid
	res.render("FacebookLogin.ejs");                       
};


//SIGNUP PAGE

function signUp(req, res) {
	var firstName = req.param("firstName");
	var lastName = req.param("lastName");
	var username = req.param("email");
	var password = req.param("password");

	var cipherCode = cryptoPassword.createCipher(algorithm,password);
	var cryptedPass = cipherCode.update(password,'utf8','hex')
	cryptedPass += cipherCode.final('hex');

	var msg_payload = { "firstName":firstName,"lastName":lastName,"username": username, "password": cryptedPass };
	mq_client.make_request('signup_queue',msg_payload, function(err,results){

		console.log(results.code);
		if(err){
			throw err;
		}
		else 
		{
			console.log("value of status code at client is : "+results.code);
			if(results.code == 200){
				console.log("valid Login");

				res.send({"login":"Success"});
			}
			else if(results.code == 401) {    

				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
}

exports.profilehere= function (req,res)
{
	// check user already exists
	console.log("Outside"+ req.session.username +" ");
	if(req.session.username){

		res.send({"login":"Success"});
	}
	else{
		res.send({"login":"Fail"});
	}
}

exports.redirectToHomepage2 = function(req, res) {
	//Checks before redirecting whether the session is valid
	
	ejs.renderFile("./views/profile.ejs",{data:req.session.username}, function(err, result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('An error occured');
		}

	});                       
};

exports.redirectToHomepage3 = function(req, res) {
	//Checks before redirecting whether the session is valid
	
	ejs.renderFile("./views/interests.ejs",{data:req.session.username}, function(err, result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('An error occured');
		}

	});                                 
};

exports.redirectToHomepage4 = function(req, res) {
	//Checks before redirecting whether the session is valid
	
	ejs.renderFile("./views/FriendList.ejs",{data:req.session.username}, function(err, result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('An error occured');
		}

	});                                 
};

exports.redirectToHomepage5 = function(req, res) {
	//Checks before redirecting whether the session is valid
	
	ejs.renderFile("./views/Group.ejs",{data:req.session.username}, function(err, result){
		if(!err){
			res.end(result);
		}
		else{
			res.end('An error occured');
		}

	});                                 
};

//NEWSFEED

function getPosts(req,res){
	var getUser="select * from newsfeed where emailid='"+req.session.emailid+"'";
	var friendsPostsData = [];
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("Post call success My Posts " + results[0].firstName);

				var friendsPosts = "SELECT newsfeed.emailid, newsfeed.post, newsfeed.firstName, newsfeed.lastName FROM newsfeed INNER JOIN friends ON friends.friendEmailid=newsfeed.emailid where friends.primaryEmailid='" + req.session.username + "'";

				mysql.fetchData(function(err,results1){
					if(err){
						throw err;
					}
					else 
					{
						if(results1.length > 0){
							console.log("Post call success Friends " + results1[0].post);
							friendsPostsData = results1;
							var json_response = {"myPosts":results, "friendsPosts":results1};
							res.send(json_response);
						}
						else {    
							console.log("Post call error friends ");

							//res.send(json_responses);			
						}
					}
				},friendsPosts);


				//var json_responses = {"myPosts" : results, "friendsPosts":friendsPostsData};
				//res.send(json_responses);
			}
			else {
				console.log("Invalid Login");
				var json_responses = {"posts" : []};
				res.send(json_responses);
			}
		}
	},getUser);

}

function postData(req,res){
	var getUser="insert into newsfeed values ('"+req.session.emailid+"','" + req.param("post") + "','" + req.param("firstname") + "','" + req.param("lastname") + "')";
	var friendsPostsData = [];
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results !== undefined){
				console.log("Post call success for new post " );

				var json_responses = {"data" : results};
				res.send(json_responses);
			}
			else {
				console.log("Invalid Login");
				var json_responses1 = {"posts" : []};
				res.send(json_responses1);
			}
		}
	},getUser);

}

//LOGOUT

exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
	res.render('FacebookLogin.ejs');

};



exports.afterSignIn = afterSignIn;
exports.signUp = signUp;
exports.postData = postData;
exports.getPosts = getPosts;