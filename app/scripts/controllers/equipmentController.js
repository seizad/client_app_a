'use strict';

/**
 * @ngdoc function
 * @name sampleApp4App.controller:EquipmentCtrl
 * @description
 * # EquipmentCtrl
 * Controller of the sampleApp4App
 */
angular.module('sampleApp4App')
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
          { dataField: 'CustomerId', caption: locale.getString('common.CP_EquipGrid_CustomerId') },
          { dataField: 'CustomerCode',      caption: locale.getString('common.CP_EquipGrid_CustomerCode'), visible: false },
          { dataField: 'CustomerName',         caption: locale.getString('common.CP_EquipGrid_CustomerName'), visible: false },
          { dataField: 'ModelDescription',          caption: locale.getString('common.CP_EquipGrid_ModelDescription') },
          { dataField: 'MachineLocation',        caption: locale.getString('common.CP_EquipGrid_MachineLocation') },
          { dataField: 'MachineId',         caption: locale.getString('common.CP_EquipGrid_MachineId') },
          { dataField: 'MachineSerialNumber', caption: locale.getString('common.CP_EquipGrid_MachineSerialNumber') },
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
