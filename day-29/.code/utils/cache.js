const store = {};

function get(key) {
  return store[key];
}

function set(key, value) {
  store[key] = value;
}

module.exports = { get, set };