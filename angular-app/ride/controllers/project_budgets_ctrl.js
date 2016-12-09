( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectBudgetsCtrl',[
      '$scope',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      'IndicatorDataService',
      ProjectBudgetsCtrl
    ]);

  function ProjectBudgetsCtrl($scope, $modal, $state, $stateParams, Utils, ProjectService, IndicatorDataService) {


    function init() {
      ProjectService.showRecords($stateParams.id, 'Budget').then(showRecords, onFailure);

      function showRecords(data) {
        initData(data)
      }
    };

    function initData (budgets) {
      if($scope.project == undefined) $scope.project = {};
      $scope.project.budgets = budgets || [];
    };

    $scope.removeBudget = function (id) {
      IndicatorDataService.deleteRecord(id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.project.budgets = _.reject($scope.project.budgets, function(budget) {
          return budget._id == id;
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

    $scope.expenseTab = function () {
      $state.go('show.expenses');
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
