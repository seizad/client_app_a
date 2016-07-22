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
    // var ds = new DevExpress.data.CustomStore({
    //       load: function (loadOptions) {
    //         return jobsService.get(loadOptions);
    //       },
    //       totalCount: function(){
    //         return 5;
    //       }
    //   });

    var ds = jobs_local_data;

    $scope.jobsGrid = {
      columns: [
        { dataField: 'jobId' ,          caption: 'Job ID'},
        { dataField: 'jobNumber' ,      caption: 'Job Number', allowGrouping: false },
        { dataField: 'customerName' ,   caption: 'Customer Name', sortIndex: 0, sortOrder: 'asc'},
        { dataField: 'technicianCode' , caption: 'Technician Code', visible: false },
        { dataField: 'technicianName' , caption: 'Technician',      visible: false,format: { type: 'longDateLongTime' },  allowGrouping: false },
        { dataField: 'jobSubmittedDtm' ,caption: 'Submitted Date', format: { type: 'date' }, allowGrouping: false },
        { dataField: 'jobScheduledDtm' ,caption: 'Scheduled Date' }
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
      pager: { 
        visible: true,
        allowedPageSizes: [10, 15, 20],
        showPageSizeSelector: true
      },
      // filterRow: { visible: true },
      // searchPanel: { visible: true },
      selection: { mode: 'none' },
      dataSource: ds
    }
  });
