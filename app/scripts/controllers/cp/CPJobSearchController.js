'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:JobSearchCtrl
 * @description
 * # JobSearchCtrl
 * Controller of the MSWebClient
 */
angular.module('MSWebClient')
  .controller('CPJobSearchCtrl', function ($scope, $http, jobsService, locale) {
    locale.ready('common').then(function () {

      $scope.statusSelOpts = {
        items: [
          {
            disp: 'Status: Open',
            val: 'open'
          }, { 
            disp: 'Status: Closed',
            val: 'closed'
          }, {
            disp: 'Status: Any',
            val: 'all'
          }],
        bindingOptions: { 
          value: 'status' 
        },
        displayExpr: 'disp',
        valueExpr: 'val',
        onValueChanged: function(e) {
          if(!e.value) return;
          ds.load();
        }
      };
      $scope.status = 'open';

      $scope.intervalSelOpts = {
        items: [
          {
            disp: 'Interval: 30 Days',
            val: '30'
          }, { 
            disp: 'Interval: 60 Days',
            val: '60'
          }, {
            disp: 'Interval: 90 Days',
            val: '90'
          }, {
            disp: 'Interval: 1 Year',
            val: '365'
          }, {
            disp: 'Interval: 5 Years',
            val: '1825'
          }],
        bindingOptions: { 
          value: 'interval' 
        },
        displayExpr: 'disp',
        valueExpr: 'val',
        onValueChanged: function(e) {
          if(!e.value) return;
          ds.load();
        }
      };
      $scope.interval = '30';

      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          loadOptions.filter = {
            status: $scope.status,
            interval: $scope.interval
          };
          return jobsService.getJobs(loadOptions);
        }
      });

      var columns = [
        { dataField: 'TaskNumber',          caption: locale.getString('common.CP_JobsGrid_TaskNumber')},
        { dataField: 'CompanyName',         caption: locale.getString('common.CP_JobsGrid_CompanyName') },
        { dataField: 'CustomerID',        caption: locale.getString('common.CP_JobsGrid_CustomerID'), visible: false },
        { dataField: 'TaskCreatedDateTime', caption: locale.getString('common.CP_JobsGrid_TaskCreatedDateTime'), dataType: 'date', format: 'shortDateShortTime'},
        { dataField: 'TaskScheduledDateTime',   caption: locale.getString('common.CP_JobsGrid_TaskScheduledDateTime'), dataType: 'date', format: 'shortDateShortTime' },
        { dataField: 'TaskCompletedDateTime',   caption: locale.getString('common.CP_JobsGrid_TaskCompletedDateTime'), dataType: 'date', format: 'shortDateShortTime' },
        { dataField: 'TaskDescription',      caption: locale.getString('common.CP_JobsGrid_TaskDescription') },
        { dataField: 'TaskPriorityDescription', caption: locale.getString('common.CP_JobsGrid_TaskPriorityDescription') },
        { dataField: 'TaskStatusCode',      caption: locale.getString('common.CP_JobsGrid_TaskStatusCode') },
        { dataField: 'EquipmentId',         caption: locale.getString('common.CP_JobsGrid_EquipmentId') }
      ];

      $scope.jobsGrid = {
        onContentReady: function(e) {
          $scope.gridInst = e.component;
        },
        headerFilter: {
          visible: true
        },
        columns: columns,
        stateStoring: {
          enabled: true,
          type: 'localStorage',
          storageKey: 'CPJobsGridState'
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
