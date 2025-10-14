// Redis connection setup with error handlingconst redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

client.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection failed:', err));

module.exports = client;
