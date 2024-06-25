//export default function createPushNotificationsJobs(jobs, queue) {
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  } else {
    for (let jobEntry of jobs) {
      let job = queue.create('task-10', job).save((err) => {
        if (!err) {
	  console.log(`Notification job created: ${job.id}`);
	}
      });
      job.on('complete', (result) => {
        console.log(`Notification job ${job.id} completed`);
      });
      job.on('failed', (err) => {
        console.log(`Notification job ${job.id} failed: `, err);
      });
      job.on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress} complete`);
      });
    }
  }
}
module.exports = createPushNotificationsJobs;
