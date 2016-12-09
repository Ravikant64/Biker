( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectTaskPopupCtrl',[
      '$scope',
      '$q',
      '$modalInstance',
      'header',
      'locations',
      'attr',
      'to_timeframe',
      'from_timeframe',
      'UtilityFactory',
      'ProjectService',
      ProjectTaskPopupCtrl
    ]);

  function ProjectTaskPopupCtrl($scope, $q, $modalInstance, header, locations,
                                attr, to_timeframe, from_timeframe, Utils, ProjectService) {

    function init() {
      $scope.selectedTaskLocations = [];
      $scope.validDate = false;

      $q.all([
        ProjectService.getCategories(),
        ProjectService.getLocationUsers(),
        ProjectService.getOutputs(attr.project_id)
      ]).then(
        function(results) {

          $scope.project_task = attr;
          $scope.taskLocations = locations;
          $scope.projectCategories = results[0].categories ;
          $scope.location_users = results[1];
          $scope.outputsOptions = results[2];

          $scope.header = header + ' Activity';
          $scope.showDropDown = false;
        });
    };

    $scope.toggleDropdown = function() {
      $scope.showDropDown = !$scope.showDropDown;
    };

    $scope.saveTask = function() {
      $scope.isSaveCalled = true;

      if(!$scope.newTask.$valid) return;

      if(!$scope.project_task.created_at){
        ProjectService.createProjectTask($scope.project_task).then(onSuccess, onFailure);
      } else {
        ProjectService.updateProjectTask($scope.project_task).then(onSuccess, onFailure);
      };

      function onSuccess (data) {
        var task = _.extend($scope.project_task, data);
        $modalInstance.close(task);
      };
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.updateTaskLocation = function() {
      $scope.project_task.myLocation = _.find($scope.taskLocations, function(loc){
        return loc._id == $scope.project_task.location_id;
      });
    };

    $scope.updateTaskOwner = function() {
      $scope.project_task.myOwner = _.find($scope.location_users, function(user){
        return user._id == $scope.project_task.owner_id;
      });
    };

    $scope.validateDate = function() {

      if(!$scope.project_task.end_date) return true;
      if(!to_timeframe || !from_timeframe) return true;

      if( validateFromDate() && validateToDate() ) {
        $scope.validDate = false;
      } else {
        $scope.validDate = true;
      };

      function validateFromDate() {
       return ((new Date($scope.project_task.end_date)) >= (new Date(from_timeframe)));
      };

      function validateToDate() {
       return ((new Date($scope.project_task.end_date)) <= (new Date(to_timeframe)));
      };
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
