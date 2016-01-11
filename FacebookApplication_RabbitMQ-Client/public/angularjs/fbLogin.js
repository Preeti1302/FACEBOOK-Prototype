//loading the 'login' angularJS module
var app = angular.module('myApp', []);
//defining the login controller
app.controller('validateCtrl', function($scope, $http, $location) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	
	$scope.submitfb = function() {
		$http({
			method : "POST",
			url : '/afterSignIn',
			data : {
				"email" : $scope.email,
				"inputPassword" : $scope.inputPassword,
			}
		}).success(function(response) {
			//checking the response data for statusCode
			alert(JSON.stringify(response));
            
            if(response.login == "Success")
           		window.location = '/SuccessLogin';
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });

	};
	
	$scope.signUpfb = function() {
		$http({
			method : "POST",
			url : '/signUp',
			data : {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"email" : $scope.emailid,
				"password" : $scope.password
			}
		}).success(function(response) {
			//checking the response data for statusCode
			alert(JSON.stringify(response));
            
            if(response.login == "Success")
           		window.location = '/FacebookLogin';
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });
	};
	
	$scope.profileFb = function() {
		
		$http({
			
			method : "GET",
			url : '/profilehere',
		data : {
//				"username" : $scope.req.session.username,
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			alert(JSON.stringify(response));
			$scope.data=response;
            if(response.login == "Success")
            {
            	
           		window.location.assign("/profile");
            }
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });
	};
	
	
$scope.interestsFb = function() {
		
		$http({
			
			method : "GET",
			url : '/profilehere',
		data : {
//				"username" : $scope.req.session.username,
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			alert(JSON.stringify(response));
            
            if(response.login == "Success")
            	
           		window.location.assign("/interests");
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });
	};
	
$scope.fbFriend = function() {
		
		$http({
			
			method : "GET",
			url : '/profilehere',
		data : {
//				"username" : $scope.req.session.username,
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			alert(JSON.stringify(response));
            
            if(response.login == "Success")
            	
           		window.location.assign("/FriendList");
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });
	};
	
$scope.groupsFb = function() {
		
		$http({
			
			method : "GET",
			url : '/profilehere',
		data : {
//				"username" : $scope.req.session.username,
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			alert(JSON.stringify(response));
            
            if(response.login == "Success")
            	
           		window.location.assign("/Group");
            else
            	window.location = '/fail_login';
        }).error(function(error){
            alert("error");
        });
	};
	
})





