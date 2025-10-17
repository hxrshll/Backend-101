function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Start');
  await delay(1000);
  console.log('After 1 second');
}

run();