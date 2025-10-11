const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const User = require('../models/User');

(async () => {
  await connectDB();
  const user = await User.findOne();
  if (user) {
    await User.findByIdAndDelete(user._id);
    console.log('User deleted:', user);
  } else {
    console.log('No user found to delete.');
  }
  mongoose.connection.close();
})();