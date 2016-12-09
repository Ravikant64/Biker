( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectLinkDataPointToTaskPopupCtrl',[
      '$scope',
      '$modalInstance',
      'UtilityFactory',
      'ProjectService',
      'project_task',
      ProjectLinkDataPointToTaskPopupCtrl
    ]);

  function ProjectLinkDataPointToTaskPopupCtrl($scope, $modalInstance, Utils, ProjectService, project_task) {

    function init() {
      $scope.project_task = angular.copy(project_task);

      ProjectService.getIndicatorList().then(
        function(data) {
          $scope.indicators = data;
        }, onFailure);
    };

    $scope.save = function() {
      ProjectService.updateProjectTask($scope.project_task).then(onSuccess, onFailure);

      function onSuccess (data) {
        $modalInstance.close(data);
      };
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    // Callbacks
    function onFailure (errorResponse) {
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      };
      $scope.errors = errorResponse.data.errors || []
    };

    init();
  };

})();
