'use strict';

/**
 * @ngdoc overview
 * @name MSWebClient
 * @description
 * # MSWebClient
 *
 * Main module of the application.
 */
var app = angular.module(
    'MSWebClient', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'dx',
    'ngLocalize',
    'ngLocalize.Config',
    'permission',
    'permission.ng'
  ]);

  app.value('localeConf', {
    basePath: 'api/languages',
    defaultLocale: 'en-US',
    sharedDictionary: 'common',
    fileExtension: '.lang.json',
    persistSelection: true,
    cookieName: 'COOKIE_LOCALE_LANG',
    observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
    delimiter: '::',
    validTokens: new RegExp('^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$')
  });

  app.run(function (PermissionStore, userService) {
    PermissionStore
      .defineManyPermissions(['role.customerPortal', 'role.technicianPortal'], function (permissionName) {
        var promise = new Promise(function(resolve, reject) {
          userService.getCurrentUser().then(function(user) {
            if(user.roles.indexOf(permissionName) >= 0) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
        return promise;
      });
  });
  
  app.config(function ($routeProvider) {
    function cp_url (url) {
      return '/cp' + url;
    }
    function tp_url (url) {
      return '/tp' + url;
    }
    
    // Customer Portal
    var cpPermissions = {
      only: ['role.customerPortal'],
      redirectTo: {
        'role.technicianPortal': tp_url('/'),
        default: '/login'
      }
    };
    $routeProvider
      .when(cp_url('/'), {
        templateUrl: 'views/jobSearch.html',
        controller: 'CPJobSearchCtrl',
        controllerAs: 'cpJobSearchController',
        data: {
          permissions: cpPermissions
        }
      })
      .when(cp_url('/equipment'), {
        templateUrl: 'views/equipment.html',
        controller: 'EquipmentCtrl',
        controllerAs: 'equipment',
        data: {
          permissions: cpPermissions
        }
      })
      .when(cp_url('/orders'), {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'orders',
        data: {
          permissions: cpPermissions
        }
      })
      .when(cp_url('/about'), {
        templateUrl: 'views/cp/about.html',
        data: {
          permissions: cpPermissions
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
      })
      .otherwise({
        redirectTo: cp_url('/')
      });

    // Technician Portal
    var tpPermissions = {
      only: ['role.technicianPortal'],
      redirectTo: '/login'
    };
    $routeProvider
      .when(tp_url('/'), {
        templateUrl: 'views/jobSearch.html',
        controller: 'TPJobSearchCtrl',
        controllerAs: 'tpJobSearchController',
        data: {
          permissions: tpPermissions
        }
      })
      .when(tp_url('/calendar'), {
        templateUrl: 'views/tp/calendar.html',
        controller: 'TPCalendarCtrl',
        controllerAs: 'tpCalendarController',
        data: {
          permissions: tpPermissions
        }
      })
      .when(tp_url('/customers'), {
        templateUrl: 'views/tp/customers.html',
        controller: 'TPCustomersCtrl',
        controllerAs: 'tpCustomerController',
        data: {
          permissions: tpPermissions
        }
      })
      .when(tp_url('/equipment'), {
        templateUrl: 'views/equipment.html',
        controller: 'EquipmentCtrl',
        controllerAs: 'equipment',
        data: {
          permissions: tpPermissions
        }
      })
      .when(tp_url('/about'), {
        templateUrl: 'views/tp/about.html',
      });
  });

