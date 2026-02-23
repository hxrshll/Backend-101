const rateLimit = require("express-rate-limit");

const signupLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many signup attempts. Try again later." }
});

module.exports = signupLimiter;