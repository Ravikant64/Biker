( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      'ProjectService',
      ProjectCtrl
    ]);

    function ProjectCtrl($scope, $state, $stateParams, ProjectService) {

      // Initialization
      function init () {
        $scope.project = {};

        if(_.isObject($stateParams.myParam) && !_.isUndefined($stateParams.myParam.id)) {
          ProjectService.editProject($stateParams.myParam.id).then(onSuccess, onFailure);

          function onSuccess(data){
            $scope.project = data;
            $state.go('edit.metadata');
          };
        }
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