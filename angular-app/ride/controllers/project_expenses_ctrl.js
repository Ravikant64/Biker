( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectExpensesCtrl',[
      '$scope',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      'ExpenseService',
      'IndicatorDataService',
      ProjectExpensesCtrl
    ]);

  function ProjectExpensesCtrl($scope, $modal, $state, $stateParams, Utils, ProjectService, ExpenseService, IndicatorDataService) {


    function init() {
      if(!$scope.project){
        ProjectService.getProject($stateParams.id).then(function(data) {
          $scope.project = data;
          ProjectService.showRecords($stateParams.id, 'Expense').then(showRecords, onFailure);
        });
      } else {
        ProjectService.showRecords($stateParams.id, 'Expense').then(showRecords, onFailure);
      }

      function showRecords(data) {
        initData(data)
      }
    };

    function initData (expenses) {
      if($scope.project == undefined) $scope.project = {};
      $scope.project.expenses = expenses || [];
    };

    $scope.removeExpense = function (id) {
      IndicatorDataService.deleteRecord(id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.project.expenses = _.reject($scope.project.expenses, function(expense) {
          return expense._id == id;
        });
      }
    }

    $scope.getOrgNodeName = function(org_node_id) {
      if(org_node_id == undefined)
        return;
      var orgNode =  _.find($scope.project.locations, function(location) {
        return location._id == org_node_id;
      });
      return orgNode == undefined ? '' : orgNode.name;
    };

    $scope.progressTab = function() {
      $state.go('show.progress');
    };

    $scope.tasksTab = function () {
      $state.go('show.tasks');
    };

    $scope.budgetsTab = function () {
      $state.go('show.budgets');
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
