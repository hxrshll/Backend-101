function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited ${ms}ms`);
    }, ms);
  });
}

wait(1000)
  .then((msg) => console.log(msg))
  .catch((err) => console.error('Error:', err));