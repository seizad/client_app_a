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
    this.get = function() {
        var d = $.Deferred();
        $http.get(API + '/api/jobs')
          .success(function (response) {
              d.resolve(response, { totalCount: response.length });
          });
        return d.promise();
    };
  });
