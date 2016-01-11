var mongo = require("./mongo");
var mongoURL = "mongodb://127.0.0.1:27017/login";

function handle_request(msg, callback){
	
	var res={};
	console.log("In handle request of signin:" + msg.username);
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		console.log("is the object:" + msg.password);
		
		coll.findOne({username:msg.username, password: msg.password}, function(err, user){
			if (user) {
				res.code = "200";
				res.value = "Success Login";
				res.user = user;
				console.log(res.user);
				console.log("value of status code is 18888 :"+res.code);
			} else {
				res.code = "401";
				res.value = "Failed Login";
			}
			
			console.log("value of status code is :"+res.code);
			callback(null, res);
		});
	
		
	});
	
}

exports.handle_request = handle_request;

