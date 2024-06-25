import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err);
});

function setNewSchool(schoolname, value) {
  client.set(schoolname, value, redis.print);
}

function displaySchoolValue(schoolname) {
  client.get(schoolname, (err, response) => {
    console.log(response);
  });
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco')
