const kue = require('kue')
const queue = kue.createQueue();


// let blacklistedPhoneNumbers = ['4153518780', '4153518781'];
let blacklistedPhoneNumbers = [{number: '4153518780'}, {number: '4153518781'}];
function sendNotification(phoneNumber, message, job, done) {
  let tracker = 0;
  for (let blacklistNo of blacklistedPhoneNumbers) {
    if (phoneNumber === blacklistNo.number) {
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
      let err = new Error(`Phone number ${phoneNumber} is balcklisted`);
      job.failed().error(err);
      // job.failed(`Phone number ${phoneNumber} is blacklisted`);
      done(err);
      tracker = phoneNumber;
      break
    };
  }
  // job.progress(completed, total [, data]):
  if (tracker !== phoneNumber) {
    job.progress(0, 2);
    job.progress(1, 2);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

// create a queue that processes two jobs at a time
queue.process('jobs-array', 2, function(job, done){
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
