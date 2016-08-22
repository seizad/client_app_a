'use strict';

/**
 * @ngdoc function
 * @name MSWebClient.controller:TPCalendarCtrl
 * @description
 * # TPCalendarCtrl
 * Controller of the MSWebClient
 */
angular.module('MSWebClient')
  .controller('TPCalendarCtrl', function ($scope, locale, apiService) {
    locale.ready('common').then(function () {
      // var data = [
      //   {
      //     CompanyName: "Airforce Base Inc.",
      //     TaskNumber: "0158757-1",
      //     TaskDescription: "need page counts for all non reported printers in Tampa. Put on board 6/13/2016",
      //     TaskStatusCode: "Open",
      //     startDate: new Date(2016, 7, 19, 9, 30),
      //     endDate: new Date(2016, 7, 19, 11, 30)
      //   }, {
      //     CompanyName: "Airforce Base Inc.",
      //     TaskNumber: "0158757-1",
      //     TaskDescription: "need page counts for all non reported printers in Tampa. Put on board 6/13/2016",
      //     TaskStatusCode: "Completed",
      //     startDate: new Date(2016, 7, 19, 12, 0),
      //     endDate: new Date(2016, 7, 19, 13, 0)
      //   }, {
      //     CompanyName: "Airforce Base Inc.",
      //     TaskNumber: "0158757-1",
      //     TaskDescription: "need page counts for all non reported printers in Tampa. Put on board 6/13/2016",
      //     TaskStatusCode: "Open",
      //     startDate: new Date(2016, 7, 19, 14, 30),
      //     endDate: new Date(2016, 7, 19, 15, 30)
      //   }, {
      //     CompanyName: "Airforce Base Inc.",
      //     TaskNumber: "0158757-1",
      //     TaskDescription: "need page counts for all non reported printers in Tampa. Put on board 6/13/2016",
      //     TaskStatusCode: "Completed",
      //     startDate: new Date(2016, 7, 19, 10, 0),
      //     endDate: new Date(2016, 7, 19, 11, 0)
      //   }
      // ];

      // Date
      // Time
      // Customer Name
      // Task Number
      // Task Description
      // Priority

      var resourcesData = [
        {
          text: "Priority",
          state: 1,
          color: "#d62a2a"
        }, {
          text: "Completed",
          state: 2,
          color: "#909090"
        }, {
          text: "Other",
          state: 3,
          color: "#00ace2"
        }
      ];

      var resources = [{
        fieldExpr: "state",
        valueExpr: "state",
        label: "State",
        dataSource: resourcesData
      }]

      var ds = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
          return apiService.getJobBriefs();
        }
      });

      var schedulerData = new DevExpress.data.DataSource({
        store: ds,
        map: function(item) {
          var start = new moment(item.TaskScheduledDateTime);
          var end = moment(start).add(2, 'hours');
          item.title = item.CompanyName + ' ' + '(Task#: ' + item.TaskNumber + ')';
          item.startDate = start.toDate();
          item.endDate = end.toDate();
          item.time = start.format("HH:mm a") + ' - ' + end.format("HH:mm a");
          item.state = 3;
          if(item.TaskStatusCode === 'Completed') {
            item.state = 2;
          } else if (item.TaskPriorityDescription === 'High'
            || item.TaskPriorityDescription === 'Emergency'
            || item.TaskPriorityDescription === 'Urgent') {
            item.state = 1;
          }
          return item;
        }
      });

      $scope.schedulerOptions = {
        views: ["month", "week", "day"],
        currentView: "day",
        useDropDownViewSwitcher: false,
        firstDayOfWeek: 0,
        cellDuration: 60,
        dataSource: schedulerData,
        resources: resources,
        textExpr: 'title',
        descriptionExpr: 'TaskDescription',
        editing: false,
        crossScrollingEnabled: true,
        width: "100%",
        height: 600,
        appointmentTemplate: 'jobTmplt',
        onContentReady: function(e) {
          e.component.scrollToTime(8, 0, 0);
        }
      };

    });
  });

