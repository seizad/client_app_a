'use strict';

/**
 * @ngdoc function
 * @name sampleApp4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleApp4App
 */
angular.module('sampleApp4App')
  .controller('MainCtrl', function ($scope) {
    $scope.jobsGrid = {
      columns: [
        { dataField: 'author', width: 125 },
        { dataField: 'title', allowGrouping: false },
        { dataField: 'year', width: 60, sortIndex: 0, sortOrder: 'asc', allowGrouping: false },
        { dataField: 'genre', visible: false },
        { dataField: 'price', width: 60, format: { type: 'currency', precision: 2 }, visible: false, allowGrouping: false },
        { dataField: 'length', width: 65, allowGrouping: false },
        { dataField: 'format', width: 90 }
      ],
      columnChooser: { enabled: true },
      allowColumnReordering: true,
      sorting: { mode: 'multiple' },
      groupPanel: { visible: true, emptyPanelText: 'Drag a column header here to group grid records' },
      pager: { visible: true },
      paging: { pageSize: 7 },
      editing: {
          allowUpdating: true,
          mode: 'row',
          allowAdding: true,
          allowDeleting: true
      },
      filterRow: { visible: true },
      searchPanel: { visible: true },
      selection: { mode: 'none' }
    }
  });
