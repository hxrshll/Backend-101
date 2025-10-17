const fetch = require('node-fetch');

async function fetchMultiple() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/comments'
  ];

  try {
    const results = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );

    console.log('Posts:', results[0].length);
    console.log('Users:', results[1].length);
    console.log('Comments:', results[2].length);
  } catch (err) {
    console.error('Error fetching one or more endpoints:', err);
  }
}

fetchMultiple();