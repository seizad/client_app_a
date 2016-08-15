'use strict';

/**
 * @ngdoc directive
 * @name MSWebClient.directive:clearGrid
 * @description
 * # clearGrid
 */
angular.module('MSWebClient')
  .directive('clearGrid', function () {
    return {
      template: '<div class="clearGridMenuBtn" dx-menu="menuOpts"></div>',
      restrict: 'E',
      scope: {
      	gridInstance: '='
      },
      link: function(scope) {
      	function clearFiltering() {
      	  scope.gridInstance.clearFilter();
      	}

      	function clearSorting() {
      	  scope.gridInstance.clearSorting();
      	}

      	function clearGrouping() {
      	  scope.gridInstance.clearGrouping();
      	}

      	var menuData = [{
      	    id: 'clear',
      	    name: 'Clear...',
      	    items: [{
      	        id: 'filters',
      	        name: 'Filters'
      	      }, {
      	        id: 'sorting',
      	        name: 'Sorting'
      	      }, {
      	        id: 'grouping',
      	        name: 'Grouping'
      	      }, {
      	        id: 'all',
      	        name: 'All'
      	    }]
      	}];
      	
      	scope.menuOpts = {
      	  dataSource: menuData,
      	  displayExpr: 'name',
      	  onItemClick: function (data) {
      	    switch(data.itemData.id) {
      	      case 'filters':
      	        clearFiltering();
      	        break;
      	      case 'sorting':
      	        clearSorting();
      	        break;
      	      case 'grouping':
      	        clearGrouping();
      	        break;
      	      case 'all':
      	        clearFiltering();
      	        clearSorting();
      	        clearGrouping();
      	        break;
      	    }
      	  }
      	};
      }
    };
  });
