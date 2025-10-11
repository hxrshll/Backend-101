const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const User = require('../models/User');

(async () => {
  await connectDB();
  const user = new User({ username: 'hushhh', email: 'hush@example.com' });
  await user.save();
  console.log('User created:', user);
  mongoose.connection.close();
})();