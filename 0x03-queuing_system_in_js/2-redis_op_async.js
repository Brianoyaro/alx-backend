import redis from 'redis';
const util = require('util');

const client = redis.createClient();

// promisify get operation
let get = util.promisify(client.get).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

function setNewSchool(schoolname, value) {
  client.set(schoolname, value, redis.print);
}

async function displaySchoolValue(schoolname) {
  let value = await get(schoolname);
  console.log(value);
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco')
