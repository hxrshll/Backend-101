const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT
)`);

module.exports = db;
