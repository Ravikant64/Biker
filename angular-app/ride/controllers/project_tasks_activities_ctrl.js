( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectTasksActivitiesCtrl',[
      '$scope',
      '$modal',
      '$state',
      '$stateParams',
      '$location',
      '$timeout',
      'UtilityFactory',
      'IndicatorDataService',
      'ProjectService',
      ProjectTasksActivitiesCtrl
    ]);

  function ProjectTasksActivitiesCtrl($scope, $modal, $state, $stateParams, $location, $timeout, Utils, IndicatorDataService, ProjectService, PathService) {

    var cv = {};

    function init() {

      $scope.sortType = 'start_date';
      $scope.sortReverse  = false;

      $scope.stateParams = $stateParams;

      cv.indicator_id = $stateParams.indicator_id;
      // init pagination variables
      $scope.pageLimit = 50;
      // $scope.searchObject = $stateParams;
      $scope.searchObject = Utils.getUrlHashParams();

      IndicatorDataService.getIndicatorDataEntryOrgNodes($stateParams.indicator_id)
                          .then(function(data) {
                            $scope.orgNodes = data;
                          })

      getIndicatorRecords($stateParams.page_number, $scope.pageLimit)
        .then(setPageDetails)

      function setPageDetails(data) {
        $scope.indicatorRecordsCount = data.indicator_records_count;
        $scope.indicator = data.indicator;
        $timeout(function() {
          angular.forEach($('[ng-click="selectPage(page.number)"]'), function(anch, indx) {
            if(anch.innerHTML == parseInt($stateParams.page_number)) {
              anch.click();
            }
          })
          $timeout(function() { hidePaginationPages() });
        })
      }
    };

    function hidePaginationPages() {
      var upPageLis = $('.upPage [ng-repeat="page in pages track by $index"]')
      var downPageLis = $('.downPage [ng-repeat="page in pages track by $index"]')
      $scope.totalPages = upPageLis.length
      var lowlimit = $scope.currentPage - 11;
      var uplimit = $scope.currentPage + 11;

      if (lowlimit < 1) uplimit = uplimit - lowlimit + 1;
      if (uplimit > upPageLis.length) lowlimit = lowlimit - (uplimit - upPageLis.length) - 1;

      angular.forEach(upPageLis, function(pageLi, indx) {
        var liIndex = pageLi.children[0].innerHTML;
        if (liIndex < lowlimit || liIndex > uplimit) {
          pageLi.style.display = 'none';
          downPageLis[indx].style.display = 'none';
        } else {
          pageLi.style.display = 'block';
          downPageLis[indx].style.display = 'block';
        }
      })
    };

    function getIndicatorRecords(page, limit){
      return IndicatorDataService
        .getIndicatorRecords(cv.indicator_id, page, limit, filterRecords())
        .then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.indicatorRecords = data.indicator_records;
        return data;
      }
    };

    function filterRecords() {
      var filter = {}
      filter.page_number = $scope.currentPage;
      if($scope.searchObject.start_date && $scope.searchObject.end_date && $scope.validateToDate()) {
        filter.start_date = $scope.searchObject.start_date;
        filter.end_date = $scope.searchObject.end_date;
      }
      if($scope.searchObject.org_node_id) {
        filter.org_node_id = $scope.searchObject.org_node_id;
      }
      if($stateParams.id) {
        filter.project_id = $stateParams.id;
        filter.task_id = $stateParams.task_id;
      }
      return filter
    };

    function filterIndicatorRecords() {
      var params = []
      angular.forEach(filterRecords(), function(value, key) {
        params.push(key + '=' + value);
      })
      if($scope.searchObject.start_date && !$scope.validateToDate()) return;
      Utils.redirectTo('/projects#' + $location.path() + '?' + params.join('&'));
    };

    $scope.filterIndicatorRecords = function() {
      $scope.currentPage = 1;
      filterIndicatorRecords();
    };

    $scope.pageChanged = function(dirScope){
      $timeout(function() {
        filterIndicatorRecords();
      });
    };

    $scope.uniqUsers = function (users) {
      return _.uniq(users, function(userObj) {
        return userObj.name
      });
    };

    $scope.openEvidencePopup = function (fileAttachments) {

      var evidencePopupInstance = $modal.open({
        templateUrl: 'angular-app/indicator-data/templates/evidence_popup.html',
        controller: 'EvidencePopupCtrl',
        resolve: {
          fileAttachments: function () {
            return fileAttachments;
          }
        }
      });

      evidencePopupInstance.result.then();
    };

    $scope.deleteRecord = function(recordID) {
      IndicatorDataService.deleteRecord(recordID).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.indicatorRecords = _.reject($scope.indicatorRecords, function(record) {
          return record._id == recordID;
        });
      };
    };

    $scope.validateToDate = function() {
      if(!$scope.searchObject.start_date) return false;
      if(!$scope.searchObject.end_date) return false;
      return new Date($scope.searchObject.end_date) > new Date($scope.searchObject.start_date);
    };

    $scope.clearFilters = function() {
      if($scope.searchObject) $scope.searchObject.org_node_id = "";
      $scope.searchObject.start_date = null;
      $scope.searchObject.end_date = null;
      $scope.searchObject = null;
      Utils.redirectTo('/projects#' + $location.path());
    };

    init();

    // Callbacks
    function onFailure (errorResponse) {
      $scope.saveButton = false;
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      };
      $scope.errors = errorResponse.data.errors || []
    };
  };

})();
