const kue = require('kue')
// create a Queue
const push_notification_code_2 = kue.createQueue();

// jobs array
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

for (let jobEntry of jobs) {
  // create a job and save it
  let job = push_notification_code_2.create('jobs-array', jobEntry).save((err) => {
    // if there is no error while creating a job,
    // console a notification message
    if (!err) {
      console.log(`Notification job created: ${job.id}`);
    }
  });

  // handle completion of job
  job.on('complete', (result) => {
    console.log(`Notification job ${job.id} completed`);
  });

  // handle failure of job
  job.on('failed', (err) => {
    console.log(`Notification job ${job.id} failed: `, err);
  });

  // show proress
  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
}
