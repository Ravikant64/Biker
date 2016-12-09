( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectShowExpenseCtrl', [
      '$scope',
      '$location',
      '$http',
      '$q',
      '$stateParams',
      '$timeout',
      '$log',
      'PathService',
      'Auth',
      'FileUploader',
      'IndicatorDataService',
      'ConditionService',
      'ProjectService',
      'UtilityFactory',
      'action',
      ProjectShowExpenseCtrl
    ]);

  function ProjectShowExpenseCtrl($scope, $location, $http, $q, $stateParams, $timeout, $log, PathService, Auth, FileUploader, IndicatorDataService, ConditionService, ProjectService, Utils, action) {

    var $$ctrlScope = {};

    $scope.init = function() {
      $scope.left = 0;
      ProjectService.getProject($stateParams.project_id).then(getProject, onFailure);
      function getProject(data) {
        $scope.project = data;
      }

      $scope.action = action;
      $scope.indicator_record = {};
      $scope.saveButton = false;
      $scope.otherValuesInSelect = {};
      $scope.addOtherInSelect = {};
      var indicatorDataServices = [
        ProjectService.getProjectIndicator('Expense'), ////
        ProjectService.getProjectOrgNodes($stateParams.project_id), ////
        Auth.currentUser()
      ]


      if(!_.isEmpty($stateParams.id)){
        indicatorDataServices.push(IndicatorDataService.getIndicatorRecord($stateParams.id));
      }

      $q.all(indicatorDataServices).then(function (resp_array) {
        $scope.indicator = resp_array[0];
        $scope.indicator_record['indicator_id'] = resp_array[0]._id;

        sortSectionAttributes($scope.indicator.indicator_attributes_attributes);
        // keep it here because sections are extracted from attributes in above function
        ConditionService.initConditions($scope);

        $scope.indicator_record_org_nodes = resp_array[1];
        $scope.user = resp_array[2];
        if(!_.isEmpty(resp_array[3])) {
          $scope.indicator_record = resp_array[3]['indicator_record'];
        }
        $scope.form_data = $scope.indicator_record;
        $scope.form_data.action = 'show';
        filterAttr($scope.sections[0], 0);

      });

    };

    function sortSectionAttributes(attrs) {
      var rejectAttrType = ['emission'];

      $$ctrlScope.attrs = _.reject(attrs, function(attr) {
        return rejectAttrType.indexOf(attr.attribute_type) > -1
      });

      var sections = _.map($$ctrlScope.attrs, function(attr) {
        return attr.indicator_section
      })

      $scope.sections = _.uniq(sections, function(section) {
        return section._id;
      })

    }

    function filterAttr(section, index) {
      if(section == undefined) return;
      $scope.hideDefault = (index != 0);
      $scope.ssId = section._id;
      $scope.attrs = _.where($$ctrlScope.attrs, { indicator_section_id: section._id });
    }

    $scope.onSectionClick = function(section, index) {
      filterAttr(section, index);
    }

    // this functions gets called on every attributes to evaluate
    // that condition on that attribute is satisfied or not
    $scope.evaluateAttributeCondition = function(attributeId) {
      return ConditionService.evaluateCondition($scope, attributeId);
    }

    // this functions gets called on every section to evaluate
    // that condition on that section is satisfied or not
    $scope.evaluateSectionCondition = function(sectionId, index) {
      var verdict = ConditionService.evaluateCondition($scope, sectionId);
      if($scope.ssId == undefined && verdict == true){
        filterAttr($scope.sections[index], index);
      }
      return verdict;
    }

    function redirectToShow() {
      var url = PathService('expenseList', $stateParams.project_id); ////
      $location.path(url).replace();
    }

    $scope.updateRecordState = function(move) {
      IndicatorDataService.updateIndicatorRecordState($scope.indicator_record._id, move.to_state_id, move._id)
        .then(onSuccess, onFailure);

      function onSuccess(data) {
        var url = PathService('indiRecordShow', $scope.indicator._id, $scope.indicator_record._id);
        Utils.redirectTo(url);
      }
    };

    // Callbacks
    function onFailure (errorResponse) {
      $scope.saveButton = false;
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      }
      $scope.errors = errorResponse.data.errors || []
    };

    $scope.init();

  }

})();
