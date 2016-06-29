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
    
    this.get = function(loadOptions) {
    	var deferred = new $.Deferred();

    	$http.get('/api/jobs.json')
    	.success(function (result) {
    	    deferred.resolve(result);
    	}).error(function (result) {
    	    deferred.reject(result);
    	});
    	return deferred.promise();
    };
  });
