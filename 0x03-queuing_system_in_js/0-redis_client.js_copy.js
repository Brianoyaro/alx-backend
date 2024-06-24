import { createClient } from 'redis';

async function connect() {
  const client = createClient();
  client.on('error', err => console.log('Redis client not connected to the server: ', err));
  await client.connect();
  console.log('Redis client connected to the server');
}
connect();
