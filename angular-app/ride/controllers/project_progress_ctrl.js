( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectProgressCtrl',[
      '$scope',
      '$q',
      '$modal',
      '$state',
      '$stateParams',
      'UtilityFactory',
      'ProjectService',
      ProjectProgressCtrl
    ]);

  function ProjectProgressCtrl($scope, $q, $modal, $state, $stateParams, Utils, ProjectService) {

    function init () {

      if (!_.isObject($scope.$parent.project)) {
        $state.go('index');
      } else {
        ProjectService.showProgress($scope.$parent.project.id).then(onSuccess, onFailure);

        function onSuccess(data) {
          $scope.project = data;
        };
      };
    };

    $scope.openProgressPopup = function (header, index, progressIndex, type) {

      if(type == 'Output') {
        var progressLogs = $scope.project.outputs_attributes[index].progressLogs;

      } else if (type == 'Outcome') {
        var progressLogs = $scope.project.outcomes_attributes[index].progressLogs;

      } else {
        var progressLogs = $scope.project.impacts_attributes[index].progressLogs;

      };

      var progressInstance = $modal.open({
        templateUrl: 'projects/progress_popup.html',
        controller: 'ProjectProgressPopupCtrl',
        resolve: {
          header: function () {
            return header;
          },
          type: function () {
            return type;
          },
          attr: function() {
            return progressLogs[progressIndex];
          }
        }
      });

      progressInstance.result.then(
        function (progress) {
          progressLogs[progressIndex] = progress;

          if(type == 'Output') {
            $scope.project.outputs_attributes[index].currentProgress = progress.value;

          } else if (type == 'Outcome') {
            $scope.project.outcomes_attributes[index].currentProgress = progress.value;

          } else {
            $scope.project.impacts_attributes[index].currentProgress = progress.value;
          };
        },
        function (dismissed){
          progressLogs.pop();
        }
      );
    };


    $scope.setProgress = function(index, type) {

      var attr = type.toLowerCase() + 's_attributes';
      var attr_id = type.toLowerCase() + '_id';

      var attributes = $scope.project[attr];
      attributes[index].progressLogs = attributes[index].progressLogs || [];

      var progress = attributes[index].progressLogs;
      var progressIndex = progress.length;

      var obj = {};
      obj['value'] = 0;
      obj[attr_id] = attributes[index]._id;

      progress.push(obj);

      if(progressIndex != 0) {
        progress[progressIndex].value = progress[progressIndex - 1].value
      };

      $scope.openProgressPopup("Set Progress", index, progressIndex, type);
    };

    $scope.openOutputsPopup = function (header, index, attr_type) {
      var oldAttr = {};

      var outputsPopupInstance = $modal.open({
        templateUrl: 'angular-app/project/templates/outputs_popup.html',
        controller: 'ProjectProgressOutputsPopupCtrl',
        resolve: {
          header: function () {
            return header;
          },
          type: function () {
            return attr_type;
          },
          attr: function () {

            var attr = attr_type.toLowerCase() + 's_attributes';
            var attributes = $scope.project[attr];
            oldAttr = angular.copy(attributes[index]);
            return attributes[index];
          }
        }
      });

      outputsPopupInstance.result.then(function (output) {

        var attr = attr_type.toLowerCase() + 's_attributes';
        var attributes = $scope.project[attr];
        attributes[index] = output;

      }, onDissmissed);

      function onDissmissed (attr_type) {

        var attr = attr_type.toLowerCase() + 's_attributes';
        var attributes = $scope.project[attr];

        if(!attributes[index]['created_at']){
          return attributes.splice(index, 1);
        };
        attributes[index] = oldAttr;
      };
    };

    $scope.add = function (type) {

      var attr = type.toLowerCase() + 's_attributes';
      var attributes = $scope.project[attr];
      var index = attributes.length;

      attributes.push({
        summary: '',
        description: '',
        type: 'manual',
        project_id: $scope.project.id
      });

      $scope.openOutputsPopup(type, index, type);
    };

    $scope.edit = function (index, type) {
      $scope.openOutputsPopup('Edit' + ' ' + type, index, type);
    };

    $scope.remove = function (index, type) {

      var attr = type.toLowerCase() + 's_attributes';
      var attributes = $scope.project[attr];
      var output = attributes[index];

      if (output.created_at) {

        if(type == 'Output') {
          ProjectService.removeOutput(output._id).then(onSuccess, onFailure);
        } else if (type == 'Outcome') {
          ProjectService.removeOutcome(output._id).then(onSuccess, onFailure);
        } else {
          ProjectService.removeImpact(output._id).then(onSuccess, onFailure);
        };

      } else {
        onSuccess(true);
      };

      function onSuccess(data) {
        if(type == 'Output') {
          $scope.project.outputs_attributes.splice(index, 1);
        } else if (type == 'Outcome') {
          $scope.project.outcomes_attributes.splice(index, 1);
        } else {
          $scope.project.impacts_attributes.splice(index, 1);
        };
      };
    };

    $scope.tasksTab = function () {
      $state.go('show.tasks');
    };

    $scope.expensesTab = function () {
      $state.go('show.expenses');
    };

    $scope.budgetsTab = function () {
      $state.go('show.budgets');
    }

    $scope.taskListing = function (task) {
      $state.go('show.taskDetail', { myParam: { task: task }});
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