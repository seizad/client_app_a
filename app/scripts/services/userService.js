'use strict';

/**
 * @ngdoc service
 * @name MSWebClient.userService
 * @description
 * # userService
 * Service in the MSWebClient.
 */
angular.module('MSWebClient')
  .service('userService', function ($http, GLOBAL_CONF) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCurrentUser = function () {
      var API = GLOBAL_CONF.apiUrl;
    	var d = $.Deferred();
        $http.get(API + '/api/current_user')
          .success(function (response) {
            d.resolve(response);
          });
        return d.promise();
    }
  });
