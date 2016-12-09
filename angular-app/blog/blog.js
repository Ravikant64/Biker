'use strict';

var blog=angular.module('blog',['ngRoute','ngAnimate','ui.bootstrap']);
blog.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'angular-app/blog/show.html',
        controller:'AllBlogCntrl'
    });
    $routeProvider.when('/:id',{
        templateUrl:'angular-app/blog/article.html',
        controller:'AerticleCntrl'
    });
}]);

blog.controller('AerticleCntrl', ['$scope','$http','$routeParams',function($scope,$http,$routeParams) {
        
        $scope.blogs = {};
        var blog_id = $routeParams.id;
        alert(blog_id);
        $http({
             method : 'GET',
             url    : 'data/blog/blog_get.php?id='+blog_id,
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        })
         .success(function(data){
             if(data.errors){
                  console.log('data:'+JSON.stringify(data));         
             }
             else
             {  
                $scope.blogs=data.blog;
              }
         });
      
}]);

blog.controller('AllBlogCntrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
        
        $scope.blogs = {};
        
        $http({
             method : 'GET',
             url    : 'data/blog/blog_get.php',
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
        })
         .success(function(data){
             if(data.errors){
                  console.log('data:'+JSON.stringify(data));         
             }
             else
             {  
                $scope.blogs=data.blog;
              }
         });
      
}]);


blog.controller('CommentCtrl', ['$scope','$http','$modalInstance',function($scope,$http,$modalInstance) {
        
      $scope.user = {};
      var data = $scope.user;
      
      $scope.save = function(){
        	console.log('data:'+JSON.stringify(data));
        	$http({
        		method: 'POST',
        		url: 'data/input.php',
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

// user.controller('EditUserCtrl', ['$scope','$http','$routParams',function($scope,$http) {
//         var uid=$routParams.id;
//         $scope.user = {};
//         var data = uid;
//         alert('edit controller is called');
//         $http({
//         		method: 'GET',
//         		url: 'data/get.php',
//         		data: data,
//         		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
//         	})
//         	.success(function(data){
//         		if(data.errors){
//         			$scope.name=data.name;
//         			$scope.password=data.password;
//         			$scope.email=data.errors.email;
//         			$scope.birthDate=data.errors.birthDate;
//         			$scope.contact=data.contact;
//         		}
//         		else
//         			$scope.message=data.message;
//         	});

//         $scope.update = function(){
//         	console.log('data:'+JSON.stringify(data));
//         	$http({
//         		method: 'PUT',
//         		url: 'data/edit.php',
//         		data: data,
//         		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
//         	})
//         	.success(function(data){
//         		if(data.errors){
//         			$scope.errorName=data.errors.name;
//         			$scope.errorPassword=data.errors.password;
//         			$scope.errorEmail=data.errors.email;
//         			$scope.errorDoB=data.errors.birthDate;
//         		}
//         		else
//         			$scope.message=data.message;
//         	});
//         };
// }]);

