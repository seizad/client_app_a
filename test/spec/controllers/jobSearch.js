'use strict';

describe('Controller: JobSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('sampleApp4App'));

  var JobSearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobSearchCtrl = $controller('JobSearchCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobSearchCtrl.awesomeThings.length).toBe(3);
  });
});
