const fetch = require('node-fetch'); // Not needed in Node 18+

async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log('Fetched Post:', data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

fetchData();