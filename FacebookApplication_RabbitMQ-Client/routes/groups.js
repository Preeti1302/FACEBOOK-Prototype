var ejs = require("ejs");
//var mysql = require('./mysql');


function takeGroups(req,res)
{
	var takeGroups = "select * from groups where emailid='"+ req.session.emailid + "'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].groupmembers);
				ejs.renderFile('./views/Group.ejs', { data: results} , function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/FailLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}
	},takeGroups);
}




function deleteGroups(req,res)
{
	var delGroups = "delete from groups where emailid='"+ req.session.emailid + "'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].groupmembers);
				ejs.renderFile('./views/Group.ejs', { data: results} , function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/FailLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}
	},delGroups);
}









function addGroups(req,res)
{
	var getAllGroups = "insert into groups values ('" +  req.session.emailid + "','" + req.params.groupname + "','" + req.session.username +"'";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login " + results.length);
				console.log(results[0].groupname);
				ejs.renderFile('./views/Groups.ejs', { data: results} , function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				
				console.log("Invalid Login");
				ejs.renderFile('./views/failLogin.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
		}
	},getAllGroups);
}


exports.takeGroups=takeGroups;
exports.deleteGroups=deleteGroups;