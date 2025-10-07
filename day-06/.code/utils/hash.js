const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }
};
