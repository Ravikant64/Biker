( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectOutputsPopupCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$modalInstance',
      'header',
      'attr',
      'attr_type',
      'UtilityFactory',
      'ProjectService',
      ProjectOutputsPopupCtrl
    ]);

  function ProjectOutputsPopupCtrl($scope, $state, $stateParams, $modalInstance, header, attr, attr_type, Utils, ProjectService) {

    $scope.init = function () {

      $scope.header = header;
      $scope.output = attr;
    };

    $scope.submit = function () {
      $modalInstance.close($scope.output);
    };

    $scope.cancel = function () {
      var isEdit = header.split(" ",1);

      if(isEdit == 'Edit') {
        $modalInstance.dismiss({ attr_type: attr_type, flag: true });
      } else {
        $modalInstance.dismiss({ attr_type: attr_type, flag: false });
      };
    };

    $scope.init();
  };

})();