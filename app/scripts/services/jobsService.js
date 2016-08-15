'use strict';

/**
 * @ngdoc service
 * @name MSWebClient.jobs
 * @description
 * # jobs
 * Service in the MSWebClient.
 */
angular.module('MSWebClient')
  .service('jobsService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    this.getJobs = function(loadOptions) {
      var API = 'http://localhost:4000';
      // var API = 'http://localhost:9000/WebAPIMS';
      var params = {};
      if(loadOptions) {
        if(loadOptions.filter) {
          params = loadOptions.filter;
        }
      }
      var d = $.Deferred();
      $http.get(API + '/api/tasks', { 'params': params })
        .success(function (response) {
          d.resolve(response.tasks, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getEquipment = function() {
      var API = 'http://localhost:4000';
      var d = $.Deferred();
      $http.get(API + '/api/equipment')
        .success(function (response) {
          d.resolve(response, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getOrders = function() {
      var API = 'http://localhost:4000';
      var d = $.Deferred();
      $http.get(API + '/api/orders')
        .success(function (response) {
            d.resolve(response, { totalCount: response.length });
        });
      return d.promise();
    };
  });
