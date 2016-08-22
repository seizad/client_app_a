'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the MSWebClient
 */
angular.module('MSWebClient')
  .controller('OrdersCtrl', function ($scope, $http, apiService, util, locale) {
    locale.ready('common').then(function () {
      
      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          return apiService.getOrders();
        }
      });

      var columns = [
          { dataField: 'salesOrderNumber', caption: locale.getString('common.CP_OrdersGrid_salesOrderNumber') },
          { dataField: 'salesOrderDate',      caption: locale.getString('common.CP_OrdersGrid_salesOrderDate') },
          { dataField: 'salesOrderStatusText',         caption: locale.getString('common.CP_OrdersGrid_salesOrderStatusText') },
          { dataField: 'paymentTerms',          caption: locale.getString('common.CP_OrdersGrid_paymentTerms') },
          { dataField: 'subTotalAmount',        caption: locale.getString('common.CP_OrdersGrid_subTotalAmount'),   format: 'currency', dataType: 'number' },
          { dataField: 'taxAmount',         caption: locale.getString('common.CP_OrdersGrid_taxAmount'),            format: 'currency', dataType: 'number' },
          { dataField: 'otherChargesAmount', caption: locale.getString('common.CP_OrdersGrid_otherChargesAmount'),  format: 'currency', dataType: 'number' },
          { dataField: 'discountAmount', caption: locale.getString('common.CP_OrdersGrid_discountAmount'),          format: 'currency', dataType: 'number' },
          { dataField: 'totalAmount',   caption: locale.getString('common.CP_OrdersGrid_totalAmount'),              format: 'currency', dataType: 'number' },
        ];

      util.makeResponsive(columns, {
        tablet: [0, 2, 3, 4],
        mobile: [0, 2]
      });

      // body...
      $scope.ordersGrid = {
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
          storageKey: "ordersGridState"
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
