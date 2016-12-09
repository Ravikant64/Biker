( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectTaskDeatilsCtrl',[
      '$scope',
      '$state',
      '$modal',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectTaskDeatilsCtrl
    ]);

  function ProjectTaskDeatilsCtrl($scope, $state, $modal, $stateParams, Utils, ProjectService) {

    function init () {

      $scope.task = {};

      if(_.isObject($stateParams.myParam)) {
        $scope.task = $stateParams.myParam.task;
      };
    };


    $scope.openTaskPopup = function (header) {

      var taskInstance = $modal.open({
        templateUrl: 'projects/task_popup.html',
        controller: 'ProjectTaskPopupCtrl',
        resolve: {
          header: function () {
            return header;
          },
          locations: function () {
            return $scope.$parent.project.locations;
          },
          attr: function() {
            return $scope.task;
          },
          to_timeframe: function () {
            return $scope.$parent.project.to_timeframe;
          },
          from_timeframe: function () {
            return $scope.$parent.project.from_timeframe;
          }
        }
      });

      taskInstance.result.then(
        function (task) {
          $scope.task = task;
        },
        function (dismissed){
        }
      );
    };

    $scope.editTask = function () {
      $scope.openTaskPopup("Edit");
    };

    init();
  };

})();