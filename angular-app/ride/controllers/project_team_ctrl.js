( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectTeamCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$controller',
      'UtilityFactory',
      'ProjectService',
      ProjectTeamCtrl
    ]);

  function ProjectTeamCtrl($scope, $state, $stateParams, $controller, Utils, ProjectService) {

    function init () {

      if (!_.isString($scope.$parent.project.name)) {
        $state.go('index');
      };

      $scope.project = $scope.$parent.project || {};
      $scope.project.teams_attributes = $scope.project.teams_attributes || [];
      $scope.locations = $scope.project.locations;

      if (_.isObject($stateParams.myParam)) {
        $scope.isEdit = true;
        $scope.header = 'Edit Your Team';
      } else {
        $scope.header = 'Select Your Team';
      }

      ProjectService.getLocationUsers().then(onSuccess, onFailure);

      function onSuccess (data) {
        $scope.location_users = data;
      };
    };

    $scope.getProjectTeam = function(id) {
      return _.isString(id) ? ProjectService.getProjectTeam(id) : {}
    };

    $scope.initManagerModel = function(locationId, index) {

      $scope.project.teams_attributes[index] = $scope.project.teams_attributes[index] || initTeam();

      function initTeam() {
        return {
                 org_node_id: locationId,
                 manager_id: [],
                 member_ids: []
              };
      };
    };

    $scope.saveProjectTeam = function () {
      $scope.isSaveCalled = true;

      var project = _.extend($scope.$parent.project, $scope.project);

      $scope.$parent.project = project;

      if($scope.isEdit) {
        var project = _.extend($scope.$parent.project, $scope.project);
        ProjectService.updateProject(project).then(onProjectUpdate, onFailure);
      } else {

        ProjectService.validateProject($scope.project).then(onSuccess, onFailure);

        function onSuccess(data) {

          if (data.success) {
            var project = _.extend($scope.$parent.project, $scope.project);
            ProjectService.saveProject(project).then(onProjectSave, onFailure);
          } else {
            $scope.errors = data.errors;
          };
        };
      };

    };

    function onProjectSave(data) {
      $scope.$parent.project = data;
      $state.go('new.workflow', { myParam: { projectId: data.id }});
    }

    function onProjectUpdate(data) {
      $scope.$parent.project = data;
      $state.go('edit.workflow', { myParam: { projectId: data.id }});
    }

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