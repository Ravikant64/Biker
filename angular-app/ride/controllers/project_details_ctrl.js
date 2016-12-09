( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectDetailsCtrl',[
      '$scope',
      '$q',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectDetailsCtrl
    ]);

  function ProjectDetailsCtrl($scope, $q, $modal, $state, $stateParams, Utils, ProjectService) {

    function init() {
      if (_.isString($stateParams.id)) {
        ProjectService.getProject($stateParams.id).then(function(data) {
          $scope.project = data;
          if($state.current.name == 'show') $state.go('show.tasks');
        });
      };
    }

    init();
  };

})();
