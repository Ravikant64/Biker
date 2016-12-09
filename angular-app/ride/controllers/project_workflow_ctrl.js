( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectWorkflowCtrl',[
      '$scope',
      '$state',
      '$stateParams',
      '$q',
      '$log',
      'UtilityFactory',
      'ProjectService',
      'ConditionService',
      'FileUploader',
      'PathService',
      ProjectWorkflowCtrl
    ]);

  function ProjectWorkflowCtrl($scope, $state, $stateParams, $q, $log, Utils, ProjectService, ConditionService, FileUploader, PathService) {

    var initialization = true;

    function init() {

      $scope.Utils = Utils;

      $scope.addOtherInSelect = {};
      $scope.otherValuesInSelect = {};
      $scope.left = 0;

      var initServices = [
        ProjectService.getProjectIndicator('Project'),
        ProjectService.getProject($stateParams.myParam.projectId),
        ProjectService.getUnits()
      ]

      $q.all(initServices).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.indicator = data[0];
        $scope.project = data[1];
        $scope.units = data[2].units;

        $scope.attrs = $scope.indicator.indicator_attributes_attributes;
        sortSectionAttributes($scope.attrs);

        $scope.form_data = $scope.indicator_record = $scope.project.indicator_record;
        $scope.form_data['action'] = 'edit'

        ConditionService.initConditions($scope);
        initOtherValuesAndCheckboxes();
        if($scope.project.indicator_record.possible_moves.length == 0){
          $scope.form_data['action'] = 'show';
        }
      }
    };

    $scope.initUploader = function() {
      $scope.uploader = new FileUploader({
        url: '/indicator_data/file_upload',
        filters: [{
          name: 'sizeFileter',
          fn: function(item) {
            return item.size < 10485760;
          }
        }]
      });

      $scope.uploader.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');

      $scope.uploader.onAfterAddingFile = function(fileItem) {
        fileItem.formData = [{'attributeId': $scope.attributeId}];
        $scope.attributeId = '';
      };

    };
    $scope.initUploader();

    $scope.addAttributeNameToFile = function(element) {
      $scope.attributeId = element.outerHTML.replace(/<input type="file" id=".*" attributeid="/i, '').replace(/" onchange.*>/, '');
    };

    function initOtherValuesAndCheckboxes() {
      var attrs = _.filter($scope.attrs, function(attr) {
        return attr.allow_other_values == true;
      });
      _.each(attrs, function(attr) {
        switch(attr.control_type){
          case 'radio_button':
                  if(!_.contains(attr.options, $scope.indicator_record[attr.name]) && $scope.indicator_record[attr.name] !== ""  && $scope.indicator_record[attr.name] != undefined){
                    $scope.addOtherInSelect[attr.name] = true;
                    $scope.otherValuesInSelect[attr.name] = $scope.indicator_record[attr.name];
                  }
                  break;
          case 'checkbox':
                  if(_.intersection(attr.options, $scope.indicator_record[attr.name]).length != 0 && $scope.indicator_record[attr.name] !== "" && $scope.indicator_record[attr.name] != undefined) {
                    $scope.addOtherInSelect[attr.name] = true;
                    $scope.otherValuesInSelect[attr.name] = _.difference($scope.indicator_record[attr.name], attr.options);
                  }
                  break;
          default:
                  $log.info("Case is not handled for '"+ attr.attribute_type +"'' in initOtherValuesAndCheckboxes()");
        }
      });
    }

    $scope.addOtherValues = function(key, attr) {
      if (attr.allow_other_values == false) return;
      switch(attr.control_type) {
        case 'radio_button':
          addOtherValuesInSingleSelect(key);
          break;
        case 'checkbox':
          addOtherValuesInMultiSelect(key);
          break;
        default:
          $log.info("Case is not handled for '"+ attr.attribute_type +"'' in addOtherValues()");
      }
    }

    $scope.resetCheckbox = function(key, attr) {
      if (attr.allow_other_values == false) return;
      switch(attr.control_type){
        case 'radio_button':
                $scope.otherValuesInSelect[key] = '';
                $scope.indicator_record[key] = '';
                break;
        case 'checkbox':
                $scope.otherValuesInSelect[key] = [];
                break;
        default:
                $log.info("Case is not handled for '"+ attr.attribute_type +"'' in resetCheckbox()");
      }
    }

    $scope.isInValidCheckbox = function(field) {
      $scope.objForm[field.name] = $scope.objForm[field.name] || {
        $error: { required: false }
      };

      var required = field.required && $scope.form_data[field.name].length == 0;
      $scope.objForm[field.name].$error.required = required;
      return required;
    };

    function validateForm() {
      $scope.isSaveCalled = true;
      angular.forEach($scope.attrs, function (attr) {
        if(attr.control_type == 'checkbox'){
          $scope.isInValidCheckbox(attr);
        }
      })
      return !$scope.objForm.$valid;
    }

    function addOtherValuesInMultiSelect(key) {
      $scope.otherValuesInSelect[key] = $scope.otherValuesInSelect[key].split(',');
    };

    function addOtherValuesCheckBox() {
      var checkBoxAttrs = _.filter($scope.attrs, function(attr) {
        return attr.control_type == 'checkbox';
      });

      _.each(checkBoxAttrs, function(checkBoxAttr) {
        $scope.indicator_record[checkBoxAttr.name] = $scope.indicator_record[checkBoxAttr.name] || [];
        $scope.indicator_record[checkBoxAttr.name] = _.uniq($scope.indicator_record[checkBoxAttr.name].concat($scope.otherValuesInSelect[checkBoxAttr.name]));
      });
    }

    function addOtherValuesInSingleSelect(key) {
      $scope.indicator_record[key] = $scope.otherValuesInSelect[key];
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

    $scope.updateState = function(move) {
      $scope.move = move;
      updatePState();
    };

    $scope.save = function () {
      if (validateForm()) return;
      if($scope.uploader.queue.length == 0){
        updateRecord();
      } else {
        $scope.uploadFiles($scope.project.indicator_record._id);
      }
    };

    $scope.uploadFiles = function(ind_rec_id) {
      _.each($scope.uploader.queue, function(file) {
        file.url = PathService('indiRecordFileUpload', $scope.indicator_record._id);
      });
      $scope.uploader.uploadAll();
    };

    function sortSectionAttributes(attrs) {
      var sections = _.map($scope.attrs, function(attr) {
        return attr.indicator_section;
      })

      $scope.sections = _.uniq(sections, function(section) {
        return section._id;
      });
      
      // sections are not sort by server
      $scope.sections = _.sortBy($scope.sections, 'sequence');

    }

    function filterAttr(section, index) {
      if(section == undefined) return;
      $scope.hideDefault = (index != 0);
      $scope.ssId = section._id;
      $scope.attrs = _.where($scope.indicator.indicator_attributes_attributes, { indicator_section_id: section._id });
    }

    $scope.onSectionClick = function(section, index) {
      if(validateForm()) return;
      filterAttr(section, index);
    }

    function validateForm() {
      $scope.isSaveCalled = true;
      angular.forEach($scope.attrs, function (attr) {
        if(attr.control_type == 'checkbox'){
          $scope.isInValidCheckbox(attr);
        }
      })
      return !$scope.objForm.$valid;
    }

    $scope.getUnits = function() {
      IndicatorDataService.getUnits().then(function(data) {
        field.units = data['units'];
      }, onFailure);
    };

    $scope.toggleSelection = function toggleSelection(fieldName, fieldValue) {

      var idx = $scope.indicator_record[fieldName].indexOf(fieldValue);
      if (idx > -1) { // is currently selected
        $scope.indicator_record[fieldName].splice(idx, 1);
      } else { // is newly selected
        $scope.indicator_record[fieldName].push(fieldValue);
      }
    };

    $scope.setUnit = function (field, unit_id) {
      if ($scope.form_data[field + '__unit_id'] == undefined)
        $scope.form_data[field + '__unit_id'] = unit_id;

      $scope.form_data[field + '___unit_id'] =
            $scope.form_data[field + '__unit_id'];
    };

    $scope.convertValue = function (field) {

      if($scope.form_data[field + '___unit_id'] == undefined)
        $scope.form_data[field + '___unit_id'] =
            $scope.form_data[field + '__unit_id'];


      var unit = _.find($scope.units,function(rw){ return rw._id
                        == $scope.form_data[field + '___unit_id'] });
      var conversion_factor1 = unit.conversion;

      unit = _.find($scope.units,function(rw){ return rw._id
                        == $scope.form_data[field + '__unit_id'] });
      var conversion_factor2 = unit.conversion;

      var value = $scope.form_data[field];

      $scope.form_data[field] =
          value * (conversion_factor2/conversion_factor1);

      $scope.form_data[field + '___unit_id'] =
          $scope.form_data[field + '__unit_id'];
    };

    // ###############################################
    // Below Function is for Dynamice Form
    // ###############################################

    $scope.setWatchForMasterValue = function (field, eleScope) {
      var mAttr = _.find($scope.attrs, { _id: field.master_attribute_id });
      var mValue = $scope.form_data[mAttr.name]
      $scope.$watch('form_data.' + mAttr.name, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if(typeof oldVal !== 'undefined') $scope.form_data[field.name] = null;
          field.masterOpt = newVal;
          $timeout(function () {
            eleScope.$apply();
          });
        };
      });
    }

    $scope.getMasterOption = function(field) {
      var mAttr = _.find($scope.attrs, { _id: field.master_attribute_id });
      var mValue = $scope.form_data[mAttr.name]
      field.masterOpt =  mValue;
    };

    $scope.isInValidCheckbox = function(field) {
      $scope.objForm[field.name] = $scope.objForm[field.name] || {
        $error: { required: false }
      };

      var required = field.required && $scope.form_data[field.name].length == 0;
      $scope.objForm[field.name].$error.required = required;
      return required;
    };

    function initialBudget () {

      initialization = false;

      var budget =  [
                       ["Category", "Category 1", "Category 2", "Category 3"]
                    ];

      var row = ProjectService.getDiff($scope.project.from_timeframe, $scope.project.to_timeframe);

      for (var i = 1; i < row.length + 1; i++) {
        for (var j = 0; j < 3; j++) {
          if(j == 0){
            budget[i] = [];
            budget[i][j] = row[i-1];
          } else {
            budget[i][j] = null;
          }
        }
      };

      budget.frequency = 'monthly';
      initialization = true;
      return budget;
    };

   function removeComments() {
      _.each($scope.attrs, function(attr) {
        if(attr.allow_comment == false) {
          $scope.indicator_record[attr.name + '_comment'] = '';
        }
      });
    }

    function validateConditions() {
      validateAttributeConditions();
      validateSectionConditions();
    }

    function validateAttributeConditions() {
      _.each($scope.indicator_attributes_attributes, function(attr) {
        if(!ConditionService.evaluateCondition($scope, attr._id)){
          $scope.indicator_record[attr.name] = '';
        }
      });
    }

    function validateSectionConditions() {
      _.each($scope.sections, function(section) {
        if(!ConditionService.evaluateCondition($scope, section._id)){
          var attributes = _.filter($scope.indicator.indicator_attributes_attributes, function(attribute) {
            return attribute.indicator_section._id == section._id;
          });
          _.each(attributes, function(attribute) {
            $scope.indicator_record[attribute.name] = '';
          })
        }
      });
    }

    $scope.removeFileAttachment = function(id, index) {
      ProjectService.deleteFile(id).then(onSuccess, onFailure);
        function onSuccess(data) {
          $scope.project.indicator_record.file_attachments.splice(index, 1);
        }
    };

    // TODO: Change browser native alert to directive alert-box
    $scope.uploader.onCompleteAll = function () {
      if(isAllFilesUploaded()) {
        updateRecord();
      }
    };

    function updateRecord() {
      ProjectService.updateRecord($scope.project.id, $scope.project.indicator_record, $scope.indicator._id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.project = data;
        $scope.form_data = $scope.indicator_record = $scope.project.indicator_record;
        // if($scope.project.indicator_record.possible_moves.length == 0){
          $scope.form_data['action'] = 'show';
        // }
      }
    }

    function updatePState() {
      ProjectService.updateState($scope.project.id, $scope.move.to_state_id, $scope.move._id, $scope.project.indicator_record, $scope.indicator._id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.ssId = undefined;
        $scope.project = data;
        $scope.form_data = $scope.indicator_record = $scope.project.indicator_record;
      }
    }

    // TODO: Change browser native alert to directive alert-box
    $scope.uploader.onWhenAddingFileFailed = function (item, response, status, headers) {
      console.log(item, response, status, headers);
      // Utils.alertBox({
      //   header: "Error",
      //   contents: msg
      // });
    }

    $scope.uploader.onErrorItem = function (item, response, status, headers) {
      console.log(item, response, status, headers);
      Utils.alertBox({
        header: "Error",
        contents: response.errors[0]
      });
    };

    $scope.uploader.onSuccessItem = function (item, response, status, headers) {
      $log.info(item, response, status, headers);
    };

    function isAllFilesUploaded() {
      var fileQueue = $scope.uploader.queue;
      return _.where(fileQueue, { isError: true }).length === 0
    }

    $scope.skipBudget = function () {
      delete $scope.project.budget;

      if ($scope.isEdit) {
        $scope.project.budget = $scope.$parent.project.budget;
      };
      proceedToOutputs();
    };

    $scope.moveSectionsToLeft = function() {
      if($scope.left != 0)
        $scope.left--;
    };

    $scope.moveSectionsToRight = function() {
      if(($scope.left*2) <= ($scope.sections.length+1))
        $scope.left++;
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