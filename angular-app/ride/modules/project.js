( function() {
  'use strict';

  angular.module('treeniApp.project', [
    'treeniApp',
    'ui.router',
    'ui.bootstrap',
    'ui-rangeSlider',
    'ngSanitize',
    'ngHandsontable',
    'angularFileUpload',
    'highcharts-ng',
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'highchartsNGProvider',
    config
  ]);

  function config($stateProvider, $urlRouterProvider, highchartsNGProvider) {

    // lazyload hightchart
    highchartsNGProvider.lazyLoad();

    $stateProvider.state('settings', {
      url: '/settings',
      templateUrl: 'angular-app/common/templates/settings.html'
    });

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'projects/index.html',
        controller: 'ProjectsCtrl'
      });

    $stateProvider
      .state('new', {
        url: '/new',
        abstract: true,
        templateUrl: 'projects/new.html',
        controller: 'ProjectCtrl'
      })

      .state('new.metadata', {
        url: '/metadata',
        templateUrl: 'projects/metadata.html',
        controller: 'ProjectMetadataCtrl'
      })

      .state('new.teams', {
        url: '/project_teams',
        templateUrl: 'projects/team.html',
        controller: 'ProjectTeamCtrl'
      })

      .state('new.budget', {
        url: '/project_budget',
        templateUrl: 'projects/budget.html',
        controller: 'ProjectBudgetCtrl'
      })

      .state('new.workflow', {
        url: '/workflow',
        templateUrl: 'projects/workflow.html',
        params: {myParam: null},
        controller: 'ProjectWorkflowCtrl'
      })

      .state('new.outputs', {
        url: '/outputs',
        templateUrl: 'projects/outputs.html',
        controller: 'ProjectOutputsCtrl'
      });

    $stateProvider
      .state('edit', {
        url: '/edit',
        templateUrl: 'projects/new.html',
        params: {myParam: null},
        controller: 'ProjectCtrl'
      })

      .state('edit.metadata', {
        url: '/metadata',
        templateUrl: 'projects/metadata.html',
        controller: 'ProjectMetadataCtrl'
      })

      .state('edit.teams', {
        url: '/project_team',
        templateUrl: 'projects/team.html',
        controller: 'ProjectTeamCtrl'
      })

      .state('edit.workflow', {
        url: '/workflow',
        templateUrl: 'projects/workflow.html',
        params: {myParam: null},
        controller: 'ProjectWorkflowCtrl'
      })

      .state('edit.outputs', {
        url: '/outputs',
        templateUrl: 'projects/outputs.html',
        controller: 'ProjectOutputsCtrl'
      });

    $stateProvider
      .state('show', {
        url: '/:id',
        templateUrl: 'projects/show.html',
        controller: 'ProjectDetailsCtrl'
      })

      .state('show.expenses', {
        url: '/expenses',
        templateUrl: 'projects/expenses.html',
        controller: 'ProjectExpensesCtrl'
      })

      .state('show.tasks', {
        url: '/tasks',
        templateUrl: 'projects/tasks.html',
        controller: 'ProjectTasksCtrl'
      })

      .state('show.taskActivities', {
        url: '/:indicator_id/:task_id/activity_records/?page_number&start_date&end_date&org_node_id&category_name',
        templateUrl: 'projects/activity_records.html',
        controller: 'ProjectTasksActivitiesCtrl'
      })

      .state('show.taskActivityNew', {
        url: '/:indicator_id/:task_id/new',
        templateUrl: 'projects/activity_new.html',
        controller: 'IndicatorRecordCtrl',
        resolve: {
          action: function () {
            return 'new';
          }
        }
      })

      .state('show.taskActivityEdit', {
        url: '/:indicator_id/:task_id/:indicator_record_id/edit',
        templateUrl: 'projects/activity_new.html',
        controller: 'IndicatorRecordCtrl',
        resolve: {
          action: function () {
            return 'edit';
          }
        }
      })

      .state('show.taskActivityShow', {
        url: '/:indicator_id/:task_id/:indicator_record_id',
        templateUrl: 'projects/activity_show.html',
        controller: 'IndicatorRecordShowCtrl',
        resolve: {
          action: function () {
            return 'show';
          }
        }
      })

      .state('show.progress', {
        url: '/progress',
        templateUrl: 'projects/progress.html',
        controller: 'ProjectProgressCtrl'
      })

      .state('show.taskDetail', {
        url: '/taskDetail',
        params: { myParam: null },
        templateUrl: 'projects/task_detail.html',
        controller: 'ProjectTaskDeatilsCtrl'
      })

      .state('new_expense', {
        url: '/:project_id/expenses/new',
        templateUrl: 'projects/new_expense.html',
        controller: 'ProjectExpenseCtrl',
        resolve: {
          action: function () {
            return 'new';
          }
        }
      })

      .state('edit_expense', {
        url: '/:project_id/expenses/:id/edit',
        templateUrl: 'projects/new_expense.html',
        controller: 'ProjectExpenseCtrl',
        resolve: {
          action: function () {
            return 'edit';
          }
        }
      })

      .state('show_expense', {
        url: '/:project_id/expenses/:id',
        templateUrl: 'projects/expense.html',
        controller: 'ProjectShowExpenseCtrl',
        resolve: {
          action: function () {
            return 'show';
          }
        }
      })

      .state('show.budgets', {
        url: '/budgets',
        templateUrl: 'projects/budgets.html',
        controller: 'ProjectBudgetsCtrl'
      })

      .state('new_budget', {
        url: '/:project_id/budgets/new',
        templateUrl: 'projects/new_budget.html',
        controller: 'ProjectBudgetCtrl',
        resolve: {
          action: function () {
            return 'new';
          }
        }
      })

      .state('edit_budget', {
        url: '/:project_id/budgets/:id/edit',
        templateUrl: 'projects/new_budget.html',
        controller: 'ProjectBudgetCtrl',
        resolve: {
          action: function () {
            return 'edit';
          }
        }
      })

      .state('show_budget', {
        url: '/:project_id/budgets/:id',
        templateUrl: 'projects/budget.html',
        controller: 'ProjectShowBudgetCtrl',
        resolve: {
          action: function () {
            return 'show';
          }
        }
      });
    // $urlRouterProvider.otherwise('/');
  };

})();
