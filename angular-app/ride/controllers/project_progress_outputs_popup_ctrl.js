( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectProgressOutputsPopupCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$modalInstance',
      'header',
      'attr',
      'type',
      'UtilityFactory',
      'ProjectService',
      ProjectProgressOutputsPopupCtrl
    ]);

  function ProjectProgressOutputsPopupCtrl($scope, $state, $stateParams, $modalInstance, header, attr, type, Utils, ProjectService) {

    $scope.init = function () {

      $scope.header = header;
      $scope.output = attr;

      ProjectService.getAnalytics().then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.analyticsOptions = data || [];
      };
    };

    $scope.submit = function () {

      if($scope.output.created_at) {
        if(type == 'Output') {
          ProjectService.updateOutput($scope.output).then(onSuccess, onFailure);
        } else if (type == 'Outcome') {
          ProjectService.updateOutcome($scope.output).then(onSuccess, onFailure);
        } else {
          ProjectService.updateImpact($scope.output).then(onSuccess, onFailure);
        };
      } else {
        if(type == 'Output') {
          ProjectService.saveOutput($scope.output).then(onSuccess, onFailure);
        } else if (type == 'Outcome') {
          ProjectService.saveOutcome($scope.output).then(onSuccess, onFailure);
        } else {
          ProjectService.saveImpact($scope.output).then(onSuccess, onFailure);
        };
      };

      function onSuccess(data) {
       $modalInstance.close(data);
      };
    };

    $scope.cancel = function () {
      $modalInstance.dismiss(type);
    };

    // Callbacks
    function onFailure (errorResponse) {
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      };
      $scope.errors = errorResponse.data.errors || []
    };

    $scope.init();
  };

})();