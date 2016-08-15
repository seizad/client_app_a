'use strict';

/**
 * @ngdoc service
 * @name MSWebClient.util
 * @description
 * # util
 * Service in the MSWebClient.
 */
angular.module('MSWebClient')
  .service('util', function ($window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.makeResponsive = function(cols, colOptoins) {
      function showOnly(colToShow) {
        cols.forEach(function(col, i){
          if (colToShow.indexOf(i) < 0) {
            col.visible = false;
          }
        });
      }

      var width = $window.innerWidth;
      if(width > 800) { //Desktop
        // Use default setup
      } else if (width > 500) { // tablet 
        showOnly(colOptoins.tablet);
      } else { // Mobile
        showOnly(colOptoins.mobile);
      }
    };

  });
