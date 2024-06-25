const kue = require('kue')
const queue = kue.createQueue();

// custom function that shows how creating and processing interlink
function sendNotification(phoneNumber, message, done) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  // explicitly call done() to mark end of a job
  done();
}

// back-bone code; listens for new or pending jobs named alx-project-job
// it then calls our custom function which for now consoles the message
queue.process('alx-project-job', function(job, done){
  sendNotification(job.data.phoneNumber, job.data.message, done);
});
