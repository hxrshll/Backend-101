module.exports = (req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
};