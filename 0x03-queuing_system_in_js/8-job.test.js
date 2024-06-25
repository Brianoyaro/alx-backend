const expect = require('chai').expect;
import kue from 'kue';

import createPushNotificationsJobs from './8-job.js';
let queue = require('kue').createQueue();

// write a test suite for createPushNotificationsJobs function
// use queue.testMode to validate which jobs are inside the queue

describe("createPushNotificationsJobs testing", function() {
  before(function() {
    queue.testMode.enter();
  });
  afterEach(function() {
    queue.testMode.clear();
  });
  after(function() {
    queue.testMode.exit();
  });

  it('tests my createPushNotificationsJobs queue from Task 10', function() {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      }
    ];
    //createPushNotificationsJobs(list, queue);
    queue.createJob('task-10', list).save();

    expect(queue.testMode.jobs[0].type).to.equal('task-10');
    expect(queue.testMode.jobs[0].data).to.deep.equal([{
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    }]);
  });
})
