( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .controller('ProjectExpensePopupCtrl',[
      '$scope',
      '$modalInstance',
      'header',
      'attr',
      'project',
      'FileUploader',
      'UtilityFactory',
      'ProjectService',
      ProjectExpensePopupCtrl
    ]);

  function ProjectExpensePopupCtrl($scope, $modalInstance, header, attr, project,
                                   FileUploader, Utils, ProjectService) {

    function init() {
      $scope.initUploader();

      $scope.header = header;
      $scope.project_expense = attr;
      if($scope.project_expense.date_of_expense !== undefined){
        $scope.project_expense.date_of_expense = new Date($scope.project_expense.date_of_expense).toISOString().slice(0,10);
      }
      $scope.projectLocations = project.locations;
      $scope.projectCategories = project.budget_categories ;
      $scope.showDropDown = false;
      $scope.validDate = false;
    };

    $scope.toggleDropdown = function() {
      $scope.showDropDown = !$scope.showDropDown;
    };

    $scope.initUploader = function() {
      $scope.uploader = new FileUploader({
        url: '/expenses/file_upload',
        filters: [{
          name: 'sizeFileter',
          fn: function(item) {
            return item.size < 500000;
          }
        }]
      });

      $scope.uploader.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
    };

    $scope.saveExpense = function() {
      $scope.isSaveCalled = true;

      if(!$scope.newExpense.$valid) return;

      if($scope.validDate) return;

      if ($scope.project_expense.created_at) {
        ProjectService.updateProjectExpense($scope.project_expense).then(onUpdate, onFailure);
      }else {
        ProjectService.createProjectExpense($scope.project_expense).then(onCreate, onFailure);
      };

      function onCreate (data) {

        $scope.project = data;
        var expense = _.last(data.expenses);

        if($scope.uploader.queue.length > 0){
          $scope.uploadFiles(expense._id);
        } else {
          $modalInstance.close(data);
        };
      };

      function onUpdate (data) {

        $scope.project = data;

        if($scope.uploader.queue.length > 0){
          $scope.uploadFiles($scope.project_expense._id);
        } else {
          $modalInstance.close(data);
        };
      };

    };

    $scope.uploadFiles = function(expense_id) {
      _.each($scope.uploader.queue, function(file) {
        file.url = file.url + '?id=' + expense_id;
      });
      $scope.uploader.uploadAll();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.updateExpenseLocation = function() {
      $scope.project_expense.myLocation = _.find($scope.projectLocations, function(loc){
        return loc._id == $scope.project_expense.location_id;
      });
    };

    $scope.updateExpenseCategory = function() {
      $scope.project_expense.myCategory = _.find($scope.projectCategories, function(cat){
        return cat._id == $scope.project_expense.budget_category_id;
      });
    };

    $scope.removeFileAttachment = function(id, index) {
      ProjectService.removeFileAttachment(id).then(onSuccess, onFailure);

      function onSuccess(data) {
        $scope.project_expense.myAttachments.splice(index, 1);
      };
    };

    $scope.validateDate = function() {

      if(!$scope.project_expense.date) return true;
      if(!project.to_timeframe || !project.from_timeframe) return true;

      if( validateFromDate() && validateToDate() ) {
        $scope.validDate = false;
      } else {
        $scope.validDate = true;
      };

      function validateFromDate() {
       return ((new Date($scope.project_expense.date)) >= (new Date(project.from_timeframe)));
      };

      function validateToDate() {
       return ((new Date($scope.project_expense.date)) <= (new Date(project.to_timeframe)));
      };
    };

    init();

    // Callbacks
    function onFailure (errorResponse) {
      if(errorResponse.status === 403) {
        return Utils.notAuthorised(errorResponse.data.errors[0]);
      };
      $scope.errors = errorResponse.data.errors || []
    };

    // File Uploader Call Backs
    $scope.uploader.onWhenAddingFileFailed = function(item, response, status, headers) {
      alert('File Size Should Be Less Then 500 kB');
    };

    $scope.uploader.onCompleteAll = function() {

      ProjectService.showExpenses($scope.project.id).then(onSuccess, onFailure);

      function onSuccess(data) {
       $modalInstance.close(data);
      };
    };
  };

})();
