'use strict';

/**
 * @ngdoc function
 * @name sampleApp4App.controller:JobSearchCtrl
 * @description
 * # JobSearchCtrl
 * Controller of the sampleApp4App
 */
angular.module('sampleApp4App')
  .controller('JobSearchCtrl', function ($scope, $http, jobsService, locale) {
    locale.ready('common').then(function () {
      
      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          return jobsService.get();
        }
      });

      $scope.buttonClicked = function() {
        console.log("test");
      };

      // body...
      $scope.jobsGrid = {
        headerFilter: {
          visible: true
        },
        columns: [
          { dataField: 'TaskNumber',          caption: locale.getString('common.CP_JobsGrid_TaskNumber'), visible: false},
          { dataField: 'CustomerCode',        caption: locale.getString('common.CP_JobsGrid_CustomerCode') },
          { dataField: 'CompanyName',         caption: locale.getString('common.CP_JobsGrid_CompanyName') },
          { dataField: 'TaskCreatedDateTime', caption: locale.getString('common.CP_JobsGrid_TaskCreatedDateTime'), dataType: 'date', format: 'shortDateShortTime'},
          { dataField: 'TaskScheduledDateTime',   caption: locale.getString('common.CP_JobsGrid_TaskScheduledDateTime'), dataType: 'date', format: 'shortDateShortTime' },
          { dataField: 'TaskPriorityDescription', caption: locale.getString('common.CP_JobsGrid_TaskPriorityDescription') },
          { dataField: 'TaskStatusCode',      caption: locale.getString('common.CP_JobsGrid_TaskStatusCode') },
          { dataField: 'EquipmentId',         caption: locale.getString('common.CP_JobsGrid_EquipmentId') },
          { dataField: 'TechnicianCode',      caption: locale.getString('common.CP_JobsGrid_TechnicianCode') },
          { dataField: 'TechnicianName',      caption: locale.getString('common.CP_JobsGrid_TechnicianName') }
        ],
        // stateStoring: {
        //   enabled: true,
        //   type: "localStorage",
        //   storageKey: "gridState"
        // },
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
          allowedPageSizes: [10, 50, 100],
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
