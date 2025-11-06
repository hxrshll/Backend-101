const fs = require('fs');

test('log file should be created', () => {
  expect(fs.existsSync('app.log')).toBe(true);
});
