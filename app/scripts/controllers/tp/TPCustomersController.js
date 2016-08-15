'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:TPCustomersCtrl
 * @description
 * # TPCustomersCtrl
 * Controller of the MSWebClient
 */
angular.module('MSWebClient')
  .controller('TPCustomersCtrl', function ($scope, $http, $window, jobsService, locale) {
    locale.ready('common').then(function () {
      
      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          return jobsService.getCustomers();
        }
      });

      var columns = [
          { dataField: 'CompanyName',       caption: locale.getString('common.CP_CustomersGrid_CompanyName')},
          { dataField: 'CustomerID',        caption: locale.getString('common.CP_CustomersGrid_CustomerID') },
          { dataField: 'CustomerPhone',     caption: locale.getString('common.CP_CustomersGrid_CustomerPhone') },
          { dataField: 'CustomerAddress1',  caption: locale.getString('common.CP_CustomersGrid_CustomerAddress1') },
          { dataField: 'CustomerCity',      caption: locale.getString('common.CP_CustomersGrid_CustomerCity') },
          { dataField: 'CustomerState',     caption: locale.getString('common.CP_CustomersGrid_CustomerState') },
          { dataField: 'CustomerCountry',   caption: locale.getString('common.CP_CustomersGrid_CustomerCountry'), visible: false }
        ];

      function makeResponsive (cols, colOptoins) {
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
      }

      makeResponsive(columns, {
        tablet: [0, 2, 3, 4],
        mobile: [0, 2]
      });

      // body...
      $scope.customersGrid = {
        onContentReady: function(e) {
          $scope.gridInst = e.component;
        },
        headerFilter: {
          visible: true
        },
        columns: columns,
        stateStoring: {
          enabled: true,
          type: "localStorage",
          storageKey: "customerGridState"
        },
        columnChooser: { enabled: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        sorting: { mode: 'multiple' },
        groupPanel: { 
          visible: true, 
          emptyPanelText: 'Drag a column header here to group records' 
        },
        remoteOperations: {
          sorting: false
        },
        pager: { 
          visible: true,
          allowedPageSizes: [10, 15, 20],
          showPageSizeSelector: true
        },
        filterRow: { visible: true },
        searchPanel: { visible: true },
        selection: { mode: 'none' },
        dataSource: {
          store: ds
        }
      };
    });
  });

