import { createClient } from 'redis';

async function connectRedis() {
  const client = createClient();

  client.on('error', (err) => console.log('Redis client not connected to the server:', err));
  
  try {
    await client.connect();
    console.log('Redis client connected to the server');
  } catch (err) {
    console.log('Redis client not connected to the server:', err);
  }
}

connectRedis();

