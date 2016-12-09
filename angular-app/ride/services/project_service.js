( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .service('ProjectService',[
      'PromiseFactory',
      ProjectService
    ]);

    function ProjectService(PromiseFactory) {

    this.getProjects = function () {
      var requestDetails = {
        url: '/projects.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getProjectIndicator = function (specimen) {
      var requestDetails = {
        url: '/projects/indicator.json?specimen=' + specimen,
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.deleteAllExpenses = function (projectID) {
      var requestDetails = {
        url: '/expenses/'+ projectID +'/destroy_all.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getMaterialIssues = function() {

      var requestDetails = {
        url: '/material_issues.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getOrgNodes = function() {

      var requestDetails = {
        url: '/org_nodes/org_tree.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getLocations = function() {

      var requestDetails = {
        url: '/org_nodes.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getCategories = function() {

      var requestDetails = {
        url: '/project_categories.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getStackholderGroups = function() {

      var requestDetails = {
        url: '/stackholder_groups/all_groups.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.validateProject = function (project) {

      var requestDetails = {
        url: '/projects/validate_project.json',
        method: 'POST',
        data: { project: project }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveProject = function (project) {

      var requestDetails = {
        url: '/projects.json',
        method: 'POST',
        data: { project: project }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };


    this.editProject = function (id) {

      var requestDetails = {
        url: '/projects/' + id + '/edit.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateProject = function(project) {

      var requestDetails = {
        url: '/projects/' + project.id + '.json',
        method: "PUT",
        data: { project: project }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getProject = function (id) {

      var requestDetails = {
        url: '/projects/' + id + '.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeProject = function (id) {
      var requestDetails = {
        url: '/projects/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getProjectTeam = function(id) {

      var requestDetails = {
        url: '/project_team/' + id + '.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getLocationUsers = function() {

      var requestDetails = {
        url: '/users.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getOutputs = function(id) {

      var requestDetails = {
        url: '/projects/' + id +'/outputs.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getProjectTasks = function () {

      var requestDetails = {
        url: '/tasks.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.createProjectTask = function (task) {

      var requestDetails = {
        url: '/tasks.json',
        method: 'POST',
        data: { task: task }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateProjectTask = function(task) {

      var requestDetails = {
        url: '/tasks/' + task._id +'.json',
        method: 'PUT',
        data: { task: task }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeTask = function (id) {
      var requestDetails = {
        url: '/tasks/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.addBudgetCategories = function(categories) {

      var requestDetails = {
        url: '/budget_categories.json',
        method: 'POST',
        data: { categories: categories }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.addBudgetTimeframes = function(timeframes) {

      var requestDetails = {
        url: '/budget_timeframes.json',
        method: 'POST',
        data: { timeframes: timeframes }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.addBudgetAmounts = function(amounts) {

      var requestDetails = {
        url: '/budget_amounts.json',
        method: 'POST',
        data: { amounts: amounts }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.showProgress = function(id) {

      var requestDetails = {
        url: '/projects/'+ id +'/show_progress.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.showRecords = function(id, specimen) {

      var requestDetails = {
        url: '/projects/' + id +'/records.json?specimen=' + specimen,
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveOutput = function (output) {

      var requestDetails = {
        url: '/outputs.json',
        method: 'POST',
        data: { output: output }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateOutput = function (output) {

      var requestDetails = {
        url: '/outputs/' + output._id +'.json',
        method: 'PUT',
        data: { output: output }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeOutput = function (id) {
      var requestDetails = {
        url: '/outputs/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveOutcome = function (outcome) {

      var requestDetails = {
        url: '/outcomes.json',
        method: 'POST',
        data: { outcome: outcome }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateOutcome = function (outcome) {

      var requestDetails = {
        url: '/outcomes/' + outcome._id +'.json',
        method: 'PUT',
        data: { outcome: outcome }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeOutcome = function (id) {
      var requestDetails = {
        url: '/outcomes/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveImpact = function (impact) {

      var requestDetails = {
        url: '/impacts.json',
        method: 'POST',
        data: { impact: impact }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateImpact = function (impact) {

      var requestDetails = {
        url: '/impacts/' + impact._id +'.json',
        method: 'PUT',
        data: { impact: impact }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeImpact = function (id) {
      var requestDetails = {
        url: '/impacts/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveOutputProgress = function (output) {
      var requestDetails = {
        url: '/progress_logs/add_output_progress.json',
        method: 'POST',
        data: output
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveOutcomeProgress = function (outcome) {

      var requestDetails = {
        url: '/progress_logs/add_outcome_progress.json',
        method: 'POST',
        data: outcome
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.saveImpactProgress = function (impact) {

      var requestDetails = {
        url: '/progress_logs/add_impact_progress.json',
        method: 'POST',
        data: impact
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.createProjectExpense = function (expense) {

      var requestDetails = {
        url: '/expenses.json',
        method: 'POST',
        data: { expense: expense }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateProjectExpense = function(expense) {

      var requestDetails = {
        url: '/expenses/' + expense._id +'.json',
        method: 'PUT',
        data: { expense: expense }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeProjectExpense = function (id) {
      var requestDetails = {
        url: '/expenses/' + id + '.json',
        method: 'DELETE'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.removeFileAttachment = function (id) {

      var requestDetails = {
          url: '/expenses/file_delete.json',
          method: "DELETE",
          params: { id: id }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getDashboards = function () {
      var requestDetails = {
          url: '/dashboards.json',
          method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.pinToDashboard = function (project) {
      var requestDetails = {
          url: '/projects/'+ project.id +'/pin_to_dashboard.json',
          method: "POST",
          data: project
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.unpinFromDashboard = function (id) {

      var requestDetails = {
          url: '/projects/'+ id +'/unpin_from_dashboard.json',
          method: "DELETE"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getAnalytics = function () {
      var requestDetails = {
        url: '/analytics.json',
        method: 'GET'
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getIndicatorList = function () {
      var requestDetails = {
          url: '/indicators/list.json',
          method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getProjectOrgNodes = function(id) {

      var requestDetails = {
        url: '/projects/'+ id +'/org_nodes.json',
        method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.getDiff = function (from, to) {
      var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

      var result = [];
      var datFrom = new Date(from);
      var datTo = new Date(to);
      var fromYear =  datFrom.getFullYear();
      var toYear =  datTo.getFullYear();
      var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

      for (var i = datFrom.getMonth(); i <= diffYear; i++) {
          result.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
      };

      return result;
    };

    this.getUnits = function () {
      var requestDetails = {
          url: '/units.json',
          method: "GET"
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateState = function (projectId, to_state_id, move_id, indicator_record, indicator_id) {
      var requestDetails = {
        url: '/projects/'+ projectId +'/update_state.json',
        method: "PUT",
        data: {
          to_state_id: to_state_id,
          move_id: move_id,
          indicator_record: indicator_record,
          indicator_id: indicator_id
        }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.updateRecord = function (projectId, indicator_record, indicator_id) {
      var requestDetails = {
        url: '/projects/'+ projectId +'/update_record.json',
        method: "PUT",
        data: {
          indicator_record: indicator_record,
          indicator_id: indicator_id
        }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };

    this.deleteFile = function (id) {

      var requestDetails = {
          url: '/indicator_data/file_delete.json',
          method: "DELETE",
          params: { id: id }
      };
      return PromiseFactory.generateHttpPromise(requestDetails);
    };
  };

})();