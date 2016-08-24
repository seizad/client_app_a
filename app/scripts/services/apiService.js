'use strict';

/**
 * @ngdoc service
 * @name MSWebClient.jobs
 * @description
 * # jobs
 * Service in the MSWebClient.
 */
angular.module('MSWebClient')
  .service('apiService', function ($http, GLOBAL_CONF) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    this.getJobs = function(loadOptions) {
      var API = GLOBAL_CONF.apiUrl;
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

    this.getJobBriefs = function(loadOptions) {
      var API = GLOBAL_CONF.apiUrl;
      // var API = 'http://localhost:9000/WebAPIMS';
      var params = {};
      if(loadOptions) {
        if(loadOptions.filter) {
          params = loadOptions.filter;
        }
      }
      var d = $.Deferred();
      $http.get(API + '/api/taskBriefs', { 'params': params })
        .success(function (response) {
          d.resolve(response.tasks, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getEquipment = function() {
      var API = GLOBAL_CONF.apiUrl;
      var d = $.Deferred();
      $http.get(API + '/api/equipment')
        .success(function (response) {
          d.resolve(response, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getOrders = function() {
      var API = GLOBAL_CONF.apiUrl;
      var d = $.Deferred();
      $http.get(API + '/api/orders')
        .success(function (response) {
            d.resolve(response, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getCustomers = function() {
      var API = GLOBAL_CONF.apiUrl;
      var d = $.Deferred();
      $http.get(API + '/api/customers')
        .success(function (response) {
          d.resolve(response.customers, { totalCount: response.length });
        });
      return d.promise();
    };
  });
