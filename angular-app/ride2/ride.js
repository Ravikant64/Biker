'use strict';

var ride=angular.module('ride',['ngRoute','ngAnimate','ui.bootstrap','angularModalService']);
ride.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'angular-app/ride2/show.html',
        controller:'AllRideCntrl'
    });
}]);

ride.controller('AllRideCntrl', ['$scope','$http','$modal','ModalService',function($scope,$http,$modal,ModalService) {
        
        $scope.rides = {};
        var id=1;
        //var data = $scope.user;
        
        $http({
             method: 'GET',
             url: 'data/ride/ride_get.php',
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
         })
         .success(function(data){
             if(data.errors){
                 alert("errors");
                 console.log('data:'+JSON.stringify(data));
             }
             else
             {   $scope.rides=data.ride;
                 console.log('data:'+JSON.stringify(data));
              }
         });
      
   $scope.createRide = function() {

    ModalService.showModal({
      templateUrl: "angular-app/ride2/complex.html",
      controller: "ComplexController",
      inputs: {
        title: "A More Complex Example"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });
  };
}]);

ride.controller('ComplexController', [
  '$scope', '$element', 'title', 'close', 
  function($scope, $element, title, close) {

  $scope.name = null;
  $scope.age = null;
  $scope.title = title;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
    //  Manually hide the modal.
    $element.modal('hide');
    //  Now call close, returning control to the caller.
    
      close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);

ride.controller('SampleModalController', function($scope, close) {

 $scope.dismissModal = function(result) {
    close(result, 200); // close, but give 200ms for bootstrap to animate
};

});
      // $scope.createRide = function () {
      //     alert('createRide');
      //     var attrInstance = $modal.open({
      //       templateUrl: 'angular-app/ride2/create_ride.html',
      //       controller: 'CreateRideCtrl',
      //       resolve: {
                              
      //       }
      //     });
      //     attrInstance.result.then();
      // }

//}]);


// ride.controller('ComplexController', [
//   '$scope', '$element', 'title', 'close', 
//   function($scope, $element, title, close) {

//   $scope.name = null;
//   $scope.age = null;
//   $scope.title = title;
  
//   //  This close function doesn't need to use jQuery or bootstrap, because
//   //  the button has the 'data-dismiss' attribute.
//   $scope.close = function() {
//       close({
//       name: $scope.name,
//       age: $scope.age
//     }, 500); // close, but give 500ms for bootstrap to animate
//   };

//   //  This cancel function must use the bootstrap, 'modal' function because
//   //  the doesn't have the 'data-dismiss' attribute.
//   $scope.cancel = function() {

//     //  Manually hide the modal.
//     $element.modal('hide');
    
//     //  Now call close, returning control to the caller.
//     close({
//       name: $scope.name,
//       age: $scope.age
//     }, 500); // close, but give 500ms for bootstrap to animate
//   };

// }]);

ride.controller('CreateRideCtrl', ['$scope','$http','$modalInstance',function($scope,$http,$modalInstance) {
        
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
      
      $scope.submit=function(){
        alert("its done");
        $modalInstance.close();
      }
      $scope.cancel=function(){
        $modalInstance.dismiss('cancel');
      }
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

