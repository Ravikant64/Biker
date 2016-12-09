'use strict';

var user=angular.module('user', ['ngRoute','ui.bootstrap']);

user.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'angular-app/user/new.html',
    controller: 'UserCtrl'
  });
  $routeProvider.when('/show', {
    templateUrl: 'angular-app/user/show.html',
    controller: 'AllUsersCtrl'
  });
  $routeProvider.when('/:id/edit', {
    templateUrl: 'angular-app/user/new.html',
    controller: 'EditUserCtrl'
  });
  
}]);

user.controller('AllUsersCtrl', ['$scope','$http',function($scope,$http) {
        
        $scope.user = {};
        $http.get('data/users.json').then(function(response){
       		$scope.user = response.data;
        	console.log('data:'+JSON.stringify($scope.user));
       	});
}]);

user.controller('UserCtrl', ['$scope','$http',function($scope,$http) {
        
        $scope.user = {};
        var data = $scope.user;
        $scope.save = function(){
        	console.log('data:'+JSON.stringify(data));
        	$http({
        		method: 'POST',
        		url: 'data/user/user_input.php',
        		data: data,
        		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        	})
        	.success(function(data){
        		if(data.errors){
        			alert('errors:'+data['errors']);
        		}
        		else
        			alert('success'+data.message);
        	});
        };

}]);

user.controller('EditUserCtrl', ['$scope','$http','$routParams',function($scope,$http) {
        var uid=$routParams.id;
        $scope.user = {};
        var data = uid;
        alert('edit controller is called');
        $http({
        		method: 'GET',
        		url: 'data/get.php',
        		data: data,
        		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        	})
        	.success(function(data){
        		if(data.errors){
        			$scope.name=data.name;
        			$scope.password=data.password;
        			$scope.email=data.errors.email;
        			$scope.birthDate=data.errors.birthDate;
        			$scope.contact=data.contact;
        		}
        		else
        			$scope.message=data.message;
        	});

        $scope.update = function(){
        	console.log('data:'+JSON.stringify(data));
        	$http({
        		method: 'PUT',
        		url: 'data/edit.php',
        		data: data,
        		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        	})
        	.success(function(data){
        		if(data.errors){
        			$scope.errorName=data.errors.name;
        			$scope.errorPassword=data.errors.password;
        			$scope.errorEmail=data.errors.email;
        			$scope.errorDoB=data.errors.birthDate;
        		}
        		else
        			$scope.message=data.message;
        	});
        };
}]);

