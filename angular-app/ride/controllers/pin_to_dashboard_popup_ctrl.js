( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('PinToDashboardPopupCtrl',[
      '$scope',
      '$modalInstance',
      'projectId',
      'ProjectService',
      PinToDashboardPopupCtrl
    ]);

  function PinToDashboardPopupCtrl($scope, $modalInstance, projectId, ProjectService) {

    function init () {
      $scope.project = {};
      $scope.project.id = projectId;

      ProjectService.getDashboards().then(onSuccess, onFailure);

      function onSuccess (data) {
        $scope.dashboards = data;
      };
    };

    $scope.submit = function () {

      ProjectService.pinToDashboard($scope.project).then(onSuccess,onFailure);

      function onSuccess (data) {
        $modalInstance.close('success');
      };
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    // On Ready
    init();

    // Callbacks
    function onFailure (errorResponse) {
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      };
      $scope.errors = errorResponse.data.errors || []
    };
  };

})();
