'use strict';

describe('Directive: clearGrid', function () {

  // load the directive's module
  beforeEach(module('MSWebClient'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<clear-grid></clear-grid>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the clearGrid directive');
  }));
});
