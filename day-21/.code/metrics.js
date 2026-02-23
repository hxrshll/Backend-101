const client = require("prom-client");

client.collectDefaultMetrics();

const signupRequests = new client.Counter({
  name: "signup_requests_total",
  help: "Total signup requests"
});

module.exports = { client, signupRequests };