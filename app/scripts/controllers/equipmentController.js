'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:EquipmentCtrl
 * @description
 * # EquipmentCtrl
 * Controller of the MSWebClient
 */
angular.module('MSWebClient')
  .controller('EquipmentCtrl', function ($scope, $http, jobsService, locale) {
    locale.ready('common').then(function () {
      
      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          return jobsService.getEquipment();
        }
      });

      // body...
      $scope.equipmentGrid = {
        onContentReady: function(e) {
          $scope.gridInst = e.component;
        },
        headerFilter: {
          visible: true
        },
        columns: [
          { dataField: 'CustomerName',         caption: locale.getString('common.CP_EquipGrid_CustomerName')},
          { dataField: 'CustomerId', caption: locale.getString('common.CP_EquipGrid_CustomerId') },
          { dataField: 'MachineSerialNumber', caption: locale.getString('common.CP_EquipGrid_MachineSerialNumber') },
          { dataField: 'MachineId',         caption: locale.getString('common.CP_EquipGrid_MachineId') },
          { dataField: 'CustomerCode',      caption: locale.getString('common.CP_EquipGrid_CustomerCode') },
          { dataField: 'ModelDescription',          caption: locale.getString('common.CP_EquipGrid_ModelDescription') },
          { dataField: 'MachineLocation',        caption: locale.getString('common.CP_EquipGrid_MachineLocation') },
          { dataField: 'ModelClassAndNumber',   caption: locale.getString('common.CP_EquipGrid_ModelClassAndNumber') },
        ],
        stateStoring: {
          enabled: true,
          type: "localStorage",
          storageKey: "equipGridState"
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
