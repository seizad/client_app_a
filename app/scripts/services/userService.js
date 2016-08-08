'use strict';

/**
 * @ngdoc service
 * @name sampleApp4App.userService
 * @description
 * # userService
 * Service in the sampleApp4App.
 */
angular.module('sampleApp4App')
  .service('userService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCurrentUser = function () {
      var API = 'http://localhost:4000';
    	var d = $.Deferred();
        $http.get(API + '/api/current_user')
          .success(function (response) {
            d.resolve(response);
          });
        return d.promise();
    }
  });
