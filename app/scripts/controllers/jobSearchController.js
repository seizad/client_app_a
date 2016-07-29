'use strict';

/**
 * @ngdoc function
 * @name sampleApp4App.controller:JobSearchCtrl
 * @description
 * # JobSearchCtrl
 * Controller of the sampleApp4App
 */
angular.module('sampleApp4App')
  .controller('JobSearchCtrl', function ($scope, $http, jobsService) {
    var ds = new DevExpress.data.CustomStore({
      load: function (loadOptions) {
        return jobsService.get();
      }
    });

    // body...
    $scope.jobsGrid = {
      headerFilter: {
        visible: true
      },
      columns: [
        { dataField: 'TaskNumber',          caption: 'Job Number'},
        { dataField: 'CustomerCode',        caption: 'Customer Name'},
        { dataField: 'CompanyName',         caption: 'Customer Name'},
        { dataField: 'TaskCreatedDateTime', caption: 'Submitted Date', dataType: 'date', format: 'shortDateShortTime'},
        { dataField: 'TaskScheduledDateTime',   caption: 'Scheduled Date', dataType: 'date', format: 'shortDateShortTime' },
        { dataField: 'TaskPriorityDescription', caption: 'Priority' },
        { dataField: 'TaskStatusCode',      caption: 'Status' },
        { dataField: 'EquipmentId',         caption: 'Unit ID' },
        { dataField: 'TechnicianCode',      caption: 'Technician Code'},
        { dataField: 'TechnicianName',      caption: 'Technician'}
      ],
      stateStoring: {
        enabled: true,
        type: "localStorage",
        storageKey: "gridState"
      },
      columnChooser: { enabled: true },
      allowColumnReordering: true,
      allowColumnResizing: true,
      showRowLines: true,
      rowAlternationEnabled: true,
      sorting: { mode: 'multiple' },
      groupPanel: { 
        visible: true, 
        emptyPanelText: 'Drag a column header here to group grid records' 
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
