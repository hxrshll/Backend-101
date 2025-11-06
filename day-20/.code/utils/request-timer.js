const { requestDuration } = require('../metrics');

module.exports = function requestTimer(req, res, next) {
  const end = requestDuration.startTimer();
  res.on('finish', end);
  next();
};
