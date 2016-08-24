'use strict';

/**
 * @ngdoc service
 * @name MSWebClient.util
 * @description
 * # util
 * Service in the MSWebClient.
 */
angular.module('MSWebClient')
  .service('util', function ($window, GLOBAL_CONF) {
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
      if(width > GLOBAL_CONF.screenSizes.minDesktopSize) { //Desktop
        // Use default setup
      } else if (width > GLOBAL_CONF.screenSizes.minTabletSize) { // tablet 
        showOnly(colOptoins.tablet);
      } else { // Mobile
        showOnly(colOptoins.mobile);
      }
    };

  });
