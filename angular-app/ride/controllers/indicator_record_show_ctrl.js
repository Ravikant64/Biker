( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('IndicatorRecordShowCtrl', [
      '$scope',
      '$q',
      '$stateParams',
      '$location',
      '$modal',
      'PathService',
      'Auth',
      'IndicatorDataService',
      'ConditionService',
      'ScoringService',
      'UtilityFactory',
      IndicatorRecordShowCtrl
    ]);

  function IndicatorRecordShowCtrl($scope, $q, $stateParams, $location, $modal, PathService, Auth, IndicatorDataService, ConditionService, ScoringService, Utils) {

    var $$ctrlScope = {};

    $scope.init = function () {
      $scope.Utils = Utils;
      $scope.left = 0;
      $scope.stateParams = $stateParams;

      $scope.new_scores = {};
      $q.all([
        IndicatorDataService.getIndicatorRecord($stateParams.indicator_record_id),
        IndicatorDataService.getIndicator($stateParams.indicator_id),
        IndicatorDataService.getUnits(),
        IndicatorDataService.getLegalEntities(),
        Auth.currentUser()
      ]).then(function (resp_array) {
        $scope.indicator_record = resp_array[0]['indicator_record'] || {};
        $scope.errors = $scope.indicator_record.error ? $scope.errors = [$scope.indicator_record.error.Error] : "";

        $scope.indicator_record['action'] = 'show';
        $scope.indicator = resp_array[1];
        $scope.indicator_record['indicator_id'] = resp_array[1]._id;
        $scope.form_data = $scope.indicator_record;
        $scope.attrs = $scope.indicator.indicator_attributes_attributes;
        sortSectionAttributes($scope.indicator.indicator_attributes_attributes);
        ConditionService.initConditions($scope);

        $scope.units = resp_array[2].units;
        $scope.legal_entities = resp_array[3];
        $scope.user = resp_array[4];
        prepareEmissionData();
      }, onFailure);

      $scope.consolidations = [{id: 'equity_share', name:'Equity'}, {id: 'financial_ownership', name: 'Financial Ownership'}, {id: 'operational_ownership', name: 'Operational Control'}];
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
        return section._id
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

    $scope.checkLocation = function(attr) {
      var currentlatlng = {
          lat: $scope.indicator_record[attr.name + '_lat'] || 18.50,
          lng: $scope.indicator_record[attr.name + '_lng'] || 73.81
      };
      var attrInstance = $modal.open({
        templateUrl: 'angular-app/shared/templates/_location.html',
        controller: 'PopUpLocationCtrl',
        resolve: {
          latlng: function() {
            return currentlatlng
          },
          header: function() {
            return 'show';
          }
        }
      });

      attrInstance.result.then(onSave, onCancel);
      function onSave(data) {}
      function onCancel(data) {}
    }

    $scope.redirectToEdit = function() {
      var url = PathService('projectTaskActvityEditPath', $stateParams.id, $scope.indicator._id,
        $stateParams.task_id, $scope.indicator_record._id);
      $location.path(url);
    };

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

    $scope.changeScore = function(attr) {
      ScoringService.changeScore($scope, attr);
      IndicatorDataService.updateIndicatorRecordScore($scope.indicator_record).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.indicator_record = data.indicator_record;
        $scope.form_data = $scope.indicator_record;
        $scope.form_data.action = 'show';
      }
    }

    $scope.uniqUsers = function (users) {
      var result_array = [];

      _.each(users, function(userObj) {
        var user = _.find(result_array, function(elm){
          return elm.email == userObj.email;
        });
        if (!user) {
          result_array.push(userObj);
        }
      });

      return result_array;
    };

    $scope.updateRecordState = function(move) {
      IndicatorDataService.updateIndicatorRecordState($scope.indicator_record._id, move.to_state_id, move._id)
        .then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.ssId = undefined;
        $scope.indicator_record = data.indicator_record;
        $scope.indicator_record['action'] = 'show';
        $scope.form_data = $scope.indicator_record;
        $scope.errors = $scope.indicator_record.error ? $scope.errors = [$scope.indicator_record.error.Error] : "";
      }
    };

    function prepareEmissionData() {

      $scope.emission_data = {};
      var record = angular.copy($scope.indicator_record);
      for (var key in record) {
        if(key.indexOf('_equity_share') != -1) {
          $scope.emission_data['equity_share'] = $scope.emission_data['equity_share'] || {};
          $scope.emission_data['equity_share'][key] = record[key];
        }
        if(key.indexOf('_operational_ownership') != -1) {
          $scope.emission_data['operational_ownership']
                    = $scope.emission_data['operational_ownership'] || {};
          $scope.emission_data['operational_ownership'][key] = record[key];
        }
        if(key.indexOf('_financial_ownership') != -1) {
          $scope.emission_data['financial_ownership']
                    = $scope.emission_data['financial_ownership'] || {};
          $scope.emission_data['financial_ownership'][key] = record[key];
        }
      }

      for (consolidation in $scope.emission_data) {
        for (emission in $scope.emission_data[consolidation]) {
          var legal = emission.substr(emission.indexOf('_(')+2,emission.indexOf(')_')-emission.indexOf('_(')-2);
          $scope.emission_data[consolidation][legal] = $scope.emission_data[consolidation][legal] || {}

          var emittant = null;

          if (emission.indexOf('_emitted') != -1) {
            emittant = emission.substr(0,emission.indexOf('_emitted'));
          } else if (emission.indexOf('Equivalent_') == 0) {
            emittant = emission.replace('Equivalent_', '');
            emittant = emittant.substr(0, emittant.indexOf('_('));
          }
          if(emittant) {
            $scope.emission_data[consolidation][legal][emittant] =
              $scope.emission_data[consolidation][legal][emittant] || {};

            $scope.emission_data[consolidation][legal][emittant][emission.substr(0,emission.indexOf('_('))] = $scope.emission_data[consolidation][emission];
          } else {
            $scope.emission_data[consolidation][legal][emission.substr(0,emission.indexOf('_('))] = $scope.emission_data[consolidation][emission];
          }

          delete $scope.emission_data[consolidation][emission];
        }
      }
    }

    $scope.moveSectionsToLeft = function() {
      if($scope.left != 0)
        $scope.left--;
    };

    $scope.moveSectionsToRight = function() {
      if(($scope.left*2) <= ($scope.sections.length+1))
        $scope.left++;
    };

    $scope.init();

    // Callbacks
    function onFailure (errorResponse) {
      $scope.saveButton = false;
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      }
      $scope.errors = errorResponse.data.errors || []
    };
  }
})();
