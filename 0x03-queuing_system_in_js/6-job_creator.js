const kue = require('kue')
// create a Queue
const push_notification_code = kue.createQueue();

let object = {
  phoneNumber: '123-random-phone-number-10',
  message: 'just-a random-message/bunch-of-words',
};

// create a job and save it
let job = push_notification_code.create('alx-project-job', object).save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  }
});

// handle completion of job
job.on('complete', (result) => {
  console.log('Notification job completed');
});

// handle failure of job
job.on('failed', (err) => {
  console.log('Notification job failed');
});
