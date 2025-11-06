const express = require('express');
const logger = require('./logger');
const requestTimer = require('./utils/request-timer');
const { client } = require('./metrics');

const app = express();

app.use(requestTimer);

app.get('/', (req, res) => {
  logger.info('home hit');
  res.send('hello');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => logger.info('server on 3000'));
