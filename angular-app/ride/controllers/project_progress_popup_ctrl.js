( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectProgressPopupCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$modalInstance',
      'header',
      'attr',
      'type',
      'UtilityFactory',
      'ProjectService',
      ProjectProgressPopupCtrl
    ]);

  function ProjectProgressPopupCtrl($scope, $state, $stateParams, $modalInstance, header, attr, type, Utils, ProjectService) {

    $scope.init = function () {

      $scope.header = header;
      $scope.progress = attr;
    };

    $scope.submit = function () {

      if(type == 'Output') {
        ProjectService.saveOutputProgress($scope.progress).then(onSuccess, onFailure);

      } else if (type == 'Outcome') {
        ProjectService.saveOutcomeProgress($scope.progress).then(onSuccess, onFailure);

      } else {
        ProjectService.saveImpactProgress($scope.progress).then(onSuccess, onFailure);

      };

      function onSuccess(data) {
      var progress = _.extend($scope.progress, data);
        $modalInstance.close(progress);
      };
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
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