( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('IndicatorRecordCtrl', [
      '$scope',
      '$location',
      '$http',
      '$q',
      '$stateParams',
      '$timeout',
      '$log',
      '$modal',
      '$controller',
      'PathService',
      'Auth',
      'FileUploader',
      'IndicatorDataService',
      'ConditionService',
      'ScoringService',
      'UtilityFactory',
      'action',
      IndicatorRecordCtrl
    ]);

  function IndicatorRecordCtrl($scope, $location, $http, $q, $stateParams, $timeout,
    $log, $modal, $controller, PathService, Auth, FileUploader, IndicatorDataService,
    ConditionService, ScoringService, Utils, action) {

    var data_frequency = {
      30: 1,
      90: 3,
      180: 6,
      365: 12
    };

    var $$ctrlScope = {};

    angular.extend(this, $controller('HeaderCtrl', {
      $scope: $scope
    }));

    $scope.init = function() {
      $scope.action = action;
      $scope.left = 0;
      $scope.indicator_record = {};
      $scope.ad_hoc_frq = true;

      if($stateParams.id) {
        $scope.indicator_record['project_id'] = $stateParams.id;
        $scope.indicator_record['task_id'] = $stateParams.task_id;
      }
      $scope.saveButton = false;
      $scope.otherValuesInSelect = {};
      $scope.addOtherInSelect = {};
      var indicatorDataServices = [
        IndicatorDataService.getIndicator($stateParams.indicator_id),
        IndicatorDataService.getUnits(),
        IndicatorDataService.getIndicatorDataEntryOrgNodes($stateParams.indicator_id),
        Auth.currentUser()
      ]

      if(!_.isEmpty($stateParams.indicator_record_id)){
        indicatorDataServices.push(IndicatorDataService.getIndicatorRecord($stateParams.indicator_record_id));
      }

      $q.all(indicatorDataServices).then(function (resp_array) {
        $scope.indicator = resp_array[0];
        $scope.indicator_record['indicator_id'] = resp_array[0]._id;

        sortSectionAttributes($scope.indicator.indicator_attributes_attributes);

        _.each($scope.attrs,function(attribute) {
          if(attribute.nested_entity_id){
            IndicatorDataService.getIndicator(attribute.nested_entity_id).then(onSuccess, onFailure);
          }
        });

        // if gauge/pie chart is required, then this will give the maximume score
        // by adding all attributes maximum score
        // maxScore();

        function onSuccess(result) {
          _.each(result.indicator_attributes_attributes, function(nestedAttribute) {
            $scope.attrs.push(nestedAttribute);
          });
        }

        $scope.units = resp_array[1].units;
        $scope.indicator_record_org_nodes = resp_array[2];
        $scope.user = resp_array[3];
        if(!_.isEmpty(resp_array[4])) {
          $scope.indicator_record = resp_array[4]['indicator_record'];
          // this will recalculate old scores on edit
          ScoringService.evaluateOldScores($scope);
          initOtherValuesAndCheckboxes();
        }
        // keep it here because sections are extracted from attributes in above function
        ConditionService.initConditions($scope);

        $scope.form_data = $scope.indicator_record;
        $scope.changeFrequency();
      });

      $scope.initUploader();
    };

    $scope.selectLocation = function(attr) {
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
            return 'new';
          }
        }
      });

      attrInstance.result.then(onSave, onCancel);

      function onSave(data) {
        $scope.indicator_record[attr.name + '_lat'] = data.latlng.lat;
        $scope.indicator_record[attr.name + '_lng'] = data.latlng.lng;
      }

      function onCancel(data) {}
    }

    function sortSectionAttributes(attrs) {
      var rejectAttrType = ['formula' ,'emission'];

      $$ctrlScope.attrs = _.reject(attrs, function(attr) {
        return rejectAttrType.indexOf(attr.attribute_type) > -1
      });

      var sections = _.map($$ctrlScope.attrs, function(attr) {
        return attr.indicator_section;
      })
      // Org Node and From-To date will be in Basic Info Section
      $scope.sections = [{
        _id: '123',
        indicator_id: $scope.indicator._id,
        indicator_dependencies: [],
        name: 'Basic Info',
        sequence: -1
      }];

      $scope.sections = $scope.sections.concat(_.uniq(sections, function(section) {
        return section._id;
      }));
      // sections are not sort by server
      $scope.sections = _.sortBy($scope.sections, 'sequence');

    }

    function filterAttr(section, index) {
      if(section == undefined) return;
      $scope.hideDefault = (index != 0);
      $scope.ssId = section._id;
      $scope.attrs = _.where($$ctrlScope.attrs, { indicator_section_id: section._id });
    }

    // when user enters/changes value, this functions call service to evaluate score for that attribute
    $scope.evaluateScore = function(attr) {
      ScoringService.evaluateScore($scope, attr);
    };

    // this will calculate max score by adding all attributes max score
    // will be useful if gauge/pie chart needed to show
    function maxScore() {
      $scope.maxScore = ScoringService.maxScore($scope.attrs);
    };

    // on sections tab click, attributes in that sections will be filtered
    $scope.onSectionClick = function(section, index) {
      if (validateForm()) return;
      $scope.isSaveCalled = false;
      filterAttr(section, index);
    }

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

    $scope.setEndDate = function() {

      var endDate = new Date($scope.indicator_record.start_date);

      $scope.indicator_record.start_date = $.datepicker.formatDate(Config.DATE_FORMAT, endDate);

      if($scope.indicator.data_frequency.value < 30) {
        endDate.setDate(endDate.getDate() + parseInt($scope.indicator.data_frequency.value));
      } else {
        var addMonth = data_frequency[$scope.indicator.data_frequency.value];
        endDate.setMonth(endDate.getMonth() + addMonth);
      };

      endDate.setDate(endDate.getDate() - 1);

      $scope.indicator_record.end_date = $.datepicker.formatDate(Config.DATE_FORMAT, endDate);
    };

    $scope.changeFrequency = function() {
      if (!$scope.indicator_record.org_node_id) return;

      var result = _.find($scope.indicator.indicator_org_node_mappings,
        function(item) {
          return item.org_node_id == $scope.indicator_record.org_node_id;
        });

      $scope.ad_hoc_frq = false;

      if(typeof result !== "undefined"){
        $scope.indicator.data_frequency = result.data_frequency;

        if(result.data_frequency.name == 'Ad hoc') {
          $scope.ad_hoc_frq = true;
        } else {
          if (!$scope.indicator_record.start_date) return;
          $scope.setEndDate();
        };
      }
    };


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

    $scope.saveAsDraft = function() {
      $scope.indicator_record['draft'] = true;
      saveIndicatorRecord();
    };

    $scope.save = function() {

      if (validateForm()) return;

      if(validateFile()) return;

      $scope.saveButton = true;
      $scope.indicator_record['draft'] = false;
      saveIndicatorRecord();
    };

    function validateConditions() {
      validateSectionConditions();
      validateAttributeConditions();
    }

    function removeComments() {
      _.each($scope.attrs, function(attr) {
        if(attr.allow_comment == false) {
          $scope.indicator_record[attr.name + '_comment'] = '';
        }
      });
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

    function validateForm() {

      $scope.isSaveCalled = true;
      var checkBoxAttrs = _.filter($scope.attrs, function(attr) {
        return attr.control_type == 'checkbox';
      })
      angular.forEach(checkBoxAttrs, function (attr) {
        $scope.isInValidCheckbox(attr);
      })

      return !$scope.objForm.$valid;
    }

    function validateFile() {
      var fileTypeAttrs = _.filter($scope.indicator.indicator_attributes_attributes, function(attr) {
        return attr.attribute_type == 'file';
      })
      var response = false;
      _.each(fileTypeAttrs, function(attr) {

        var queueFile = _.find($scope.uploader.queue, function(queue) {
          return queue.formData[0].attributeId == attr._id;
        });
        queueFile = queueFile || _.find($scope.indicator_record.file_attachments, function(attachment) {
          return attachment.indicator_attribute_id == attr._id;
        });
        if(queueFile == undefined) {
          response = true;
          $scope.objForm[attr.name] = {
            $error: { required: true }
          };
        } else {
          $scope.objForm[attr.name] = {
            $error: { required: false }
          };
        }
      });
      return response;
    }

    function saveIndicatorRecord() {
      validateConditions();
      removeComments();
      addOtherValuesCheckBox();
      $scope.indicator_record.user_id = $scope.user._id;

      delete $scope.indicator_record['entity_user_access_ids'];
      delete $scope.indicator_record['assign_to_user'];
      delete $scope.indicator_record['data_entry_access_users'];

      if (!$scope.indicator_record.created_at) {
        IndicatorDataService.saveIndicatorRecord($scope.indicator_record).then(onSuccess, onFailure);
      } else {
        IndicatorDataService.updateIndicatorRecord($scope.indicator_record).then(onSuccess, onFailure);
      }

      function onSuccess(data) {
        $scope.indicator_record = data;
        $scope.uploadFiles(data._id);
        if (!$scope.uploader.queue.length) redirectToShow();
      };
    }

    function redirectToShow() {
      var url = PathService('projectTaskActvitiesPath', $stateParams.id, $stateParams.indicator_id, $stateParams.task_id);
      Utils.redirectTo(url);
    };

    $scope.addAttributeNameToFile = function(element) {
      $scope.attributeId = element.outerHTML.replace(/<input type="file" id=".*" attributeid="/i, '').replace(/" onchange.*>/, '');
    };

    $scope.uploadFiles = function(ind_rec_id) {
      _.each($scope.uploader.queue, function(file) {
        file.url = PathService('indiRecordFileUpload', $scope.indicator_record._id);
      });
      $scope.uploader.uploadAll();
    };

    $scope.removeFileAttachment = function(id, index) {
      IndicatorDataService.deleteFile($scope.indicator_record._id, id).then(onSuccess, onFailure);
        function onSuccess(data) {
          $scope.indicator_record = data.indicator_record;
        }
    };

    $scope.updateRecordState = function(move) {
      IndicatorDataService.updateIndicatorRecordState($scope.indicator_record._id, move.to_state_id, move._id)
        .then(onSuccess, onFailure);

      function onSuccess(data) {
        var url = PathService('supplierAssesmentPath');
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

    // File Uploader Call Backs

    // TODO : Disable submit if file upload fail and
    //        again enable enable if new file attached
    $scope.uploader.onCompleteAll = function () {
      if(isAllFilesUploaded()) {
        redirectToShow();
      }
    };

    $scope.uploader.onWhenAddingFileFailed = function (item, response, status, headers) {
      showFileUploadErrorMessage(response.errors[0]);
    }

    $scope.uploader.onErrorItem = function (item, response, status, headers) {
      showFileUploadErrorMessage(response.errors[0]);
    };

    $scope.uploader.onSuccessItem = function (item, response, status, headers) {
      $log.info(item, response, status, headers);
    };

    $scope.moveSectionsToLeft = function() {
      if($scope.left != 0) $scope.left--;
    };

    $scope.moveSectionsToRight = function() {
      if(($scope.left*2) <= ($scope.sections.length+1)) $scope.left++;
    };

    function isAllFilesUploaded() {
      var fileQueue = $scope.uploader.queue;
      return _.where(fileQueue, { isError: true }).length === 0
    }

    function showFileUploadErrorMessage(msg) {
      Utils.alertBox({
        header: "Error",
        contents: msg
      });
    }

  }
})();