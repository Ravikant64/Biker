( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectOutputsCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$modal',
      'UtilityFactory',
      'ProjectService',
      ProjectOutputsCtrl
    ]);

  function ProjectOutputsCtrl($scope, $state, $stateParams, $modal, Utils, ProjectService) {

    function init () {

      if (!_.isString($scope.$parent.project.name)) {
        $state.go('index');
      };

      $scope.project = $scope.$parent.project || {};

      $scope.project.outputs_attributes  = $scope.project.outputs_attributes || [];
      $scope.project.outcomes_attributes = $scope.project.outcomes_attributes || [];
      $scope.project.impacts_attributes  = $scope.project.impacts_attributes || [];

      if (_.isObject($stateParams.myParam)) {
        $scope.isEdit = true;
        $scope.header = 'Edit Project: Outputs'
      } else {
        $scope.header = 'Create Project: Outputs'
      };
    };

    $scope.openOutputsPopup = function (header, index, attr_type) {

      var oldAttr = {};

      var outputsPopupInstance = $modal.open({
        templateUrl: 'angular-app/project/templates/outputs_popup.html',
        controller: 'ProjectOutputsPopupCtrl',
        resolve: {
          header: function () {
            return header;
          },
          attr: function () {

            var attr = attr_type.toLowerCase() + 's_attributes';
            var attributes = $scope.project[attr];
            oldAttr = angular.copy(attributes[index]);

            return attributes[index];
          },
          attr_type: function () {
            return attr_type;
          }
        }
      });

      outputsPopupInstance.result.then(function (output) {

        var attr = attr_type.toLowerCase() + 's_attributes';
        var attributes = $scope.project[attr];
        attributes[index] = output;

      }, onDissmissed);

      function onDissmissed(response) {

        var attr = response.attr_type.toLowerCase() + 's_attributes';
        var attributes = $scope.project[attr];

        if(response.flag){
          attributes[index] = oldAttr;
        } else {
          attributes.splice(index, 1);
        };
      };
    };

    $scope.add = function (type) {

      var attr = type.toLowerCase() + 's_attributes';
      var attributes = $scope.project[attr];
      var index = attributes.length;

      attributes.push({
        summary: '',
        description: '',
        type: 'manual'
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
        onSuccess();
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

    $scope.saveProject = function () {

      var project = _.extend($scope.$parent.project, $scope.project);

      if($scope.isEdit) {
        ProjectService.updateProject(project).then(onSuccess, onFailure);
      } else {
        ProjectService.saveProject(project).then(onSuccess, onFailure);
      };

      function onSuccess(data) {
        $state.go('index');
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