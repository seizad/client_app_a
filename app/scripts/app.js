'use strict';

/**
 * @ngdoc overview
 * @name sampleApp4App
 * @description
 * # sampleApp4App
 *
 * Main module of the application.
 */
var app = angular.module(
    'sampleApp4App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'dx',
    'ngLocalize',
    'ngLocalize.Config'
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
  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/jobSearch.html',
        controller: 'JobSearchCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
