( function() {
  'use strict';

  angular
    .module('treeniApp.project')
    .service('ExpenseService',[
      'PromiseFactory',
      ExpenseService
    ]);

    function ExpenseService(PromiseFactory) {
  };

})();