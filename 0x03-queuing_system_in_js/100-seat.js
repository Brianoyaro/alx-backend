import redis from 'redis';
const util = require('util');
const client = redis.createClient();
const kue = require('kue')
const express = require('express');

//create expressonst kue = require('kue') app
const app = express()

//create a kue queue
const queue = kue.createQueue();

// promisify get operation
let get = util.promisify(client.get).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});
function reserveSeat(number) {
    client.set('available_seats', number);
}
async function getCurrentAvailableSeats() {
    let seats = await get('available_seats');
    seats = Number(seats);
    return seats;
}

let reservationEnabled = true;
// initialize reservationEnabled to true,
// it will be turned to false when no seats available
app.listen(1245, () => {
  // when launching application set number of available to 50
  reserveSeat(50);
})

app.get('/available_seats', (req, res) => {
    let seats = getCurrentAvailableSeats();
    res.json(`{numberOfAvailableSeats: ${seats}}`);
});

app.get('reserve_seat', (req, res) => {
    if (!reservationEnabled) {
        res.json({'status': 'Reservation are blocked'})
    }
    let job = queue.create('task-100', object).save((err) => {
        if (!err) {
            res.json({'status': 'Reservation in progress'});
        } else {
            res.json({'status': 'Reservation failed'});
        }
    });
    job.on('complete', (response) => {
        console.log(`Seat reservation job ${job.id} completed`);
    });
    job.on('failed', (err) => {
        console.log(`Seat reservation job ${job.id} failed: `, err);
    });
});

app.get('/process', (req, res) => {
    // *****************************************************************
    // **          this queue processing should be async        ********
    // **so as to display below message only once when url is accessed**
    // *****************************************************************

    // res.json({'status': 'Queue processing'});
    queue.process('task-100', function(job, done) {
        let seats = getCurrentAvailableSeats();
        seats -= 1;
        reserveSeat(seats);
        if (seats === 0) {
            reservationEnabled = false;
        }
        if (seats < 0) {
            // fail the job with an Error
            let err = new Error('Not enough seats available');
            job.failed().error(err);
            done(err);
        } else {
            // if new available number of seats is >= 0 the job is successful
            done();
        }
    })
});
