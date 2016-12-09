( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectTasksCtrl',[
      '$scope',
      '$q',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectTasksCtrl
    ]);

  function ProjectTasksCtrl($scope, $q, $modal, $state, $stateParams, Utils, ProjectService) {

    function init () {

      $scope.project = $scope.$parent.project;

      if (!$scope.project) {
        $state.go('index');
      } else {
        $scope.tasks = $scope.project.tasks || [];
        $scope.locations = _.uniq(_.pluck($scope.project.locations, 'name'))
        $scope.importanceList = $scope.project.importance_list
        $scope.statusList = $scope.project.status_list
        $scope.flag = true;
      };
    };

    $scope.openTaskPopup = function (header, index) {
      var oldAttr = {};

      var taskInstance = $modal.open({
        templateUrl: 'projects/task_popup.html',
        controller: 'ProjectTaskPopupCtrl',
        resolve: {
          header: function () {
            return header;
          },
          locations: function() {
            return $scope.project.locations;
          },
          attr: function() {
            oldAttr = angular.copy($scope.project.tasks[index]);
            return $scope.project.tasks[index];
          },
          to_timeframe: function () {
            return $scope.project.to_timeframe;
          },
          from_timeframe: function () {
            return $scope.project.from_timeframe;
          }
        }
      });

      taskInstance.result.then(
        function (task) {
          $scope.project.tasks[index] = task;
        },
        function (dismissed){
          if(!$scope.project.tasks[index]['created_at']){
            return $scope.project.tasks.splice(index, 1);
          };
          $scope.project.tasks[index] = oldAttr;
        }
      );
    };

    $scope.linkDataPoint = function (task) {

      var taskInstance = $modal.open({
        templateUrl: 'projects/link_data_point_popup.html',
        controller: 'ProjectLinkDataPointToTaskPopupCtrl',
        resolve: {
          project_task: function () {
            return task;
          }
        }
      });

      taskInstance.result.then(
        function (data) {
          var index = _.findIndex($scope.tasks, {_id: task._id});
          $scope.tasks[index].indicator_id = data.indicator_id;
        },
        function (dismissed) {});
    };

    $scope.addTask = function() {
      var index = $scope.project.tasks.length;

      $scope.project.tasks.push({
        project_id: $scope.project.id,
        status: 'todo'
      });

      $scope.openTaskPopup("Add New", index);
    };

    $scope.showTask = function (task) {
      $state.go('show.taskDetail', { myParam: { task: task }});
    };

    $scope.editTask = function (index) {
      $scope.openTaskPopup("Edit", index);
    };

    $scope.resetFilters = function(){
      $scope.searchLocation = '';
      $scope.searchImportance = "";
      $scope.searchStatus = "";
    };

    $scope.progressTab = function() {
      $state.go('show.progress');
    };

    $scope.expensesTab = function () {
      $state.go('show.expenses');
    };

    $scope.budgetsTab = function () {
      $state.go('show.budgets');
    };

    $scope.getOrgNodeName = function(org_node_id) {
      if(org_node_id == undefined)
        return;
      var orgNode =  _.find($scope.project.locations, function(location) {
        return location._id == org_node_id;
      })
      return orgNode.name;
    };

    $scope.removeTask = function (id) {
      ProjectService.removeTask(id).then(onSuccess,onFailure);

      function onSuccess(data) {
        var index = _.findIndex($scope.project.tasks, {_id: id});
        $scope.project.tasks.splice(index, 1);
      };
    };

    $scope.generateIdentifier = function () {
      if($scope.project.tasks.length) {
        var task = _.last($scope.project.tasks);
        var keys = task.identifier.split("-");
        var identifier = $scope.project.key + '-' +(parseInt(keys[1]) + 1);
        return identifier;
      } else {
        var key = $scope.project.key;
        return (key + '-' + '1');
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