
/*
 * GET home page.
 */

var ejs = require("ejs");
//var mysql = require('./mysql');


function index(req,res) {

	ejs.renderFile('./views/FacebookLogin.ejs',function(err, result) {
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
};

exports.index = index;