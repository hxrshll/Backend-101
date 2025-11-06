const client = require('prom-client');

client.collectDefaultMetrics();

const requestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'duration of http requests',
  buckets: [50, 100, 300, 500, 1000]
});

module.exports = { client, requestDuration };
