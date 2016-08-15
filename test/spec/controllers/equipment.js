'use strict';

describe('Controller: EquipmentCtrl', function () {

  // load the controller's module
  beforeEach(module('MSWebClient'));

  var EquipmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EquipmentCtrl = $controller('EquipmentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EquipmentCtrl.awesomeThings.length).toBe(3);
  });
});
