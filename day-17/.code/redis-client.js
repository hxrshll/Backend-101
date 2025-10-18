const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

module.exports = redis;
