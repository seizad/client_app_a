'use strict';

/**
 * @ngdoc service
 * @name sampleApp4App.jobs
 * @description
 * # jobs
 * Service in the sampleApp4App.
 */
angular.module('sampleApp4App')
  .service('jobsService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var API = 'http://localhost:4000';
    this.getJobs = function(loadOptions) {
      var params = {};
      if(loadOptions) {
        if(loadOptions.filter) {
          params = loadOptions.filter;
        }
      }
      var d = $.Deferred();
      $http.get(API + '/api/jobs', { 'params': params })
        .success(function (response) {
          d.resolve(response, { totalCount: response.length });
        });
      return d.promise();
    };

    this.getEquipment = function() {
        var d = $.Deferred();
        $http.get(API + '/api/equipment')
          .success(function (response) {
              d.resolve(response, { totalCount: response.length });
          });
        return d.promise();
    };

    this.getOrders = function() {
        var d = $.Deferred();
        $http.get(API + '/api/orders')
          .success(function (response) {
              d.resolve(response, { totalCount: response.length });
          });
        return d.promise();
    };
  });
