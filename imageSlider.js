var sliderApp = angular.module('sliderApp', []);

sliderApp.directive('slider', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {},
    
    scope.currentIndex = 0; // Initially the index is at the first image

	scope.next = function() {
  		scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
	};

    scope.prev = function() {
  		scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
	};
    templateUrl: 'templates/templateurl.html'
  
    scope.$watch('currentIndex', function() {
	   scope.images.forEach(function(image) {
		    image.visible = false; // make every image invisible
  	});

  scope.images[scope.currentIndex].visible = true; // make the current image visible
});
  };
});

sliderApp.controller('SliderController', function($scope) {
  $scope.images = [{
    src: 'img1.png',
    title: 'Pic 1'
  }, {
    src: 'img2.jpg',
    title: 'Pic 2'
  }, {
    src: 'img3.jpg',
    title: 'Pic 3'
  }, {
    src: 'img4.png',
    title: 'Pic 4'
  }, {
    src: 'img5.png',
    title: 'Pic 5'
  }];
});