'use strict';

describe('Service: jobs', function () {

  // load the service's module
  beforeEach(module('sampleApp4App'));

  // instantiate service
  var jobs;
  beforeEach(inject(function (_jobs_) {
    jobs = _jobs_;
  }));

  it('should do something', function () {
    expect(!!jobs).toBe(true);
  });

});
