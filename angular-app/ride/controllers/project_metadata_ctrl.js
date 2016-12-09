( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectMetadataCtrl',[
      '$scope',
      '$rootScope',
      '$q',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectMetadataCtrl
    ]);

  function ProjectMetadataCtrl($scope, $rootScope, $q, $state, $stateParams, Utils, ProjectService) {

    function init () {

      if (_.isObject($stateParams.myParam)) {
        $scope.isEdit = true;
      } else {
        $scope.isEdit = false;
      };

      $q.all([
        ProjectService.getMaterialIssues(),
        ProjectService.getOrgNodes(),
        ProjectService.getLocations(),
        ProjectService.getStackholderGroups(),
        ProjectService.getCategories()
      ]).then(
        function(results) {

          $scope.project = angular.copy($scope.$parent.project)|| {};

          $scope.materialIssueOptions = results[0];

          $scope.treeFamily = results[1].tree;
          $scope.treeProperties = {showCheckbox: true};
          $rootScope.$broadcast('buildTree');

          $scope.locations = results[2];
          $scope.stakeholderGroup = results[3];
          $scope.projectCategories = results[4].categories;

          $scope.header = 'Add New Project';
          $scope.project.type = 'internal';
          $scope.project.timeframe_changed = false;
          $scope.showDropDown = false;
          $scope.selectedLocations = $scope.project.org_node_ids || [];

          if ($scope.isEdit) {
            $scope.header = 'Edit Project';
            $scope.project.myLocations = _.pluck($scope.project.locations, 'name').join(", ");
          };
        });
      $scope.showProjects = true;
    };

    //Tree Events
    $scope.isTreeCheckboxSelected = function (nodeId) {
      return _.contains($scope.selectedLocations, nodeId);
    };

    $scope.handleTreeCheckboxClick = function (nodeId) {

      var index = $scope.selectedLocations.indexOf(nodeId);
      if(index != -1) {
        $scope.selectedLocations.splice(index,1)
       } else {
        $scope.selectedLocations.push(nodeId)
       }

    };

    $scope.saveProject = function () {
      $scope.isSaveCalled = true;

      if((new Date($scope.project.from_timeframe)) >=
                    (new Date($scope.project.to_timeframe))) return;

      $scope.project.org_node_ids = $scope.selectedLocations;

      if($scope.$parent.project.from_timeframe && $scope.$parent.project.to_timeframe) {

        var to = ($scope.$parent.project.to_timeframe === $scope.project.to_timeframe)
        var from = ($scope.$parent.project.from_timeframe === $scope.project.from_timeframe)

        if( !to || !from) {
          $scope.project.timeframe_changed = true;
        };
      };

      if($scope.isEdit) {
        var project = _.extend($scope.$parent.project, $scope.project);
        $scope.$parent.project = project;
        $state.go('edit.teams');
      } else {

        ProjectService.validateProject($scope.project).then(onSuccess, onFailure);

        function onSuccess(data) {

          if (data.success) {
            var project = _.extend($scope.$parent.project, $scope.project);
            $scope.$parent.project = project;
            $state.go('new.teams');
          } else {
            $scope.errors = data.errors;
          };
        };
      };

    };


    $scope.validateDate = function() {
      if(!$scope.project || !$scope.project.from_timeframe || !$scope.project.to_timeframe) return true;
      return ((new Date($scope.project.to_timeframe)) >=
              (new Date($scope.project.from_timeframe)));
    };

    $scope.toggleDropdown = function() {
      $scope.showDropDown = !$scope.showDropDown;
    };

    $scope.updateLocations = function() {
      var locNames = (_.map($scope.selectedLocations, function(id){
        return _.find($scope.locations, function(loc){ return loc.id == id; });
      }));
      $scope.project.myLocations = _.pluck(locNames, 'name').join(", ");
      $scope.project.locations = locNames;
    };


    function onRefresh() {
      $state.go('index');
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