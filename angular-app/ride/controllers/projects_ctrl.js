( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectsCtrl',[
      '$scope',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectsCtrl
    ]);

  function ProjectsCtrl($scope, $modal, $state, $stateParams, Utils, ProjectService) {

    function init () {

      $scope.projects = [];

      ProjectService.getProjects().then(onSuccess, onFailure);

      function onSuccess(data){
        $scope.projects = data;
        initFilters($scope.projects);
        calculateProgress($scope.projects);
      };
    };

    function initFilters (projects) {
      var locations = [];
      var materialIssues = [];
      var categories = [];

      _.each(projects, function(project) {
        locations = locations.concat(project.locations);
        materialIssues = materialIssues.concat(project.material_issues);
        categories = categories.concat(project.project_category);
      });

      $scope.locations = _.uniq(_.pluck(locations, 'name'))
      $scope.materialIssues = _.uniq(materialIssues, 'name');
      $scope.categories = _.uniq(categories, 'name');
    };

    function calculateProgress(projects) {
      _.each(projects, function(project) {
        var progress = 0;

        if (project.outputs_count > 0 && project.outputs_progress > 0) {
          progress = project.outputs_progress / project.outputs_count;
        };

        project.progress = progress;
      });
    };

    $scope.goToDataEntry =function(projectId) {
      $state.go('edit.workflow', { myParam: { projectId: projectId }});
    }

    $scope.editProject = function(id){
      $state.go('edit', { myParam: { id: id }});
    };

    $scope.removeProject = function (index) {
      var project = $scope.projects[index];
      ProjectService.removeProject(project._id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.projects.splice(index, 1);
      };
    };

    $scope.resetFilters = function() {
      $scope.searchText = '';
      $scope.searchLocation = '';
      $scope.searchMaterialIssue = '';
      $scope.searchCategory = '';
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