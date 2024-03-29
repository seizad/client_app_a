'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:TPCustomersCtrl
 * @description
 * # TPCustomersCtrl
 * Controller of the MSWebClient
 */

angular.module('MSWebClient')
  .controller('TPCustomersCtrl', function ($scope, $http, apiService, util, locale, GLOBAL_CONF) {
      locale.ready('common').then(function () {
          $scope.visiblePopup = false;

          $scope.popupOptions = {
              width: IsMobileScreen() ? 350 : 500,
              height: 600,
              contentTemplate: "info",
              showTitle: true,
              title: "Customer Detail",
              dragEnabled: false,
              closeOnOutsideClick: true,
              bindingOptions: {
                  visible: "visiblePopup",
              }
          };


          $scope.currentCustomer = {};
          $scope.CustomerContacts = {};

          $scope.click = function (customer) {
              console.log(customer.key);
              $scope.currentCustomer = customer.key;
              $scope.CustomerContacts = customer.key.CustomerContacts;
              $scope.visiblePopup = true;
          };

          var ds = new DevExpress.data.CustomStore({
              load: function (loadOptions) {
                  return apiService.getCustomers();
              }
          });

          var columns = [
              { dataField: 'CompanyName', cellTemplate: "cellTemplate", caption: locale.getString('common.CP_CustomersGrid_CompanyName') },
              { dataField: 'CustomerID', caption: locale.getString('common.CP_CustomersGrid_CustomerID') },
              { dataField: 'CustomerPhone', caption: locale.getString('common.CP_CustomersGrid_CustomerPhone') },
              { dataField: 'CustomerAddress1', caption: locale.getString('common.CP_CustomersGrid_CustomerAddress1') },
              { dataField: 'CustomerCity', caption: locale.getString('common.CP_CustomersGrid_CustomerCity') },
              { dataField: 'CustomerState', caption: locale.getString('common.CP_CustomersGrid_CustomerState') },
              { dataField: 'CustomerCountry', caption: locale.getString('common.CP_CustomersGrid_CustomerCountry'), visible: false }
          ];

          util.makeResponsive(columns, {
              tablet: [0, 2, 3, 4],
              mobile: [0, 2]
          });

          var stateStoring = {
              enabled: false,
              type: "localStorage",
              storageKey: "customerGridState"
          };
          if (GLOBAL_CONF.grids.storeState) {
              stateStoring.enabled = true;
          }

          $scope.dataGridOptions = {
              dataSource: $scope.CustomerContacts,
              columns: ["ContactEmail", "ContactExt", "ContactFirstName", "ContactLastName", "ContactPhone"]
          };

          // body...
          $scope.customersGrid = {
              onContentReady: function (e) {
                  $scope.gridInst = e.component;
              },
              headerFilter: {
                  visible: true
              },
              columns: columns,
              stateStoring: stateStoring,
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

