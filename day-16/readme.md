# Day 16: Asynchronous Programming

Welcome to Day 16 of the Backend 101 30-day challenge. Today is all about asynchronous programming, which is essential for building fast, non-blocking backends in Node.js.

By the end of this lesson, you’ll understand async behavior, how the event loop works, and how to use callbacks, promises, and async/await in practice.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Why Async Matters](#why-async-matters)
3. [How the Event Loop Works](#how-the-event-loop-works)
4. [Async Patterns: Callbacks, Promises, Async/Await](#async-patterns-in-nodejs)
5. [Hands-on: Fetching Data Asynchronously](#hands-on-fetching-data-asynchronously)
6. [Practice Tasks](#practice-tasks)
7. [Common Gotchas](#common-gotchas)
8. [Bonus Challenges](#bonus-challenges)
9. [What You Learned](#what-you-learned)
10. [Further Reading](#further-reading)

---

## Introduction

In synchronous code, each task waits for the previous one to finish. In backend development, this causes delays, especially during slow operations like file reads, database queries, or API calls.

Asynchronous code allows your app to start a task, then move on to others while waiting for that task to complete. This makes your app more responsive and efficient.

## Why Async Matters

Without async, your server could hang while waiting for a single I/O operation. With async, you can handle thousands of concurrent users without needing a separate thread for each one.

Async is essential when dealing with:

- API requests
- Database access
- File operations
- Timers and background tasks

## How the Event Loop Works

Node.js runs on a single thread. It uses the event loop to manage asynchronous tasks while continuing to process others.

Think of the event loop like a restaurant waiter:

> The waiter (Node.js) takes your order (task), hands it to the kitchen (worker), and continues taking other orders instead of waiting for your food to be ready.

**Simple Flow:**
```
Client Request --> Event Loop --> Offloads I/O task (DB, API, File)
                --> Picks up next task --> Handles responses as they complete
```

## Async Patterns in Node.js

### 1. Callbacks

Callbacks are functions passed to other functions to be executed later.

```js
const fs = require('fs');

// Reads file asynchronously using a callback
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});
```

### 2. Promises

Promises represent a value that may be available in the future.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));
```

### 3. Async/Await

Modern syntax that makes async code look like regular synchronous code.

```js
async function fetchPost() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}

fetchPost();
```

## Hands-on: Fetching Data Asynchronously

Let’s try it yourself.

### Folder Setup

Create a file:

```sh
touch async-fetch.js
```

Run it with:

```sh
node async-fetch.js
```

**Note:**

If you're using Node.js version below 18, fetch is not built in. Run this:

```sh
npm install node-fetch
```

Then in your script:

```js
const fetch = require('node-fetch');
```

## Practice Tasks

Try one or more of these:

- Write a function that fetches data from https://jsonplaceholder.typicode.com/posts
- Add error handling for failed requests
- Time the request using `console.time()` and `console.timeEnd()`
- Fire 5 requests in parallel and wait for all to complete

## Common Gotchas

These are common issues new developers encounter:

- `await` only works inside an async function
- Traditional `for` loops don’t work well with async logic. Use `for...of` or `Promise.all`
- If you don’t handle errors, unhandled promise rejections can crash your app

## Bonus Challenges

### Fetch Multiple Endpoints in Parallel

Create a function that fetches:

- `/posts`
- `/users`
- `/comments`

Use `Promise.all` or `Promise.allSettled` to run them concurrently.

```js
async function fetchAll() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts',
        'https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/comments'
    ];

    try {
        const results = await Promise.all(
            urls.map(url => fetch(url).then(res => res.json()))
        );
        console.log('Posts:', results[0].length);
        console.log('Users:', results[1].length);
        console.log('Comments:', results[2].length);
    } catch (err) {
        console.error('One or more fetches failed:', err);
    }
}

fetchAll();
```

#### When to Use Promise.allSettled

Use `Promise.allSettled` when you want to wait for all promises, even if some fail:

```js
const results = await Promise.allSettled(urls.map(fetchSomething));
```

## What You Learned

By now, you should be able to:

- Explain what asynchronous programming is and why it matters
- Describe how the Node.js event loop works
- Use callbacks, promises, and async/await to write non-blocking code
- Fetch data from APIs asynchronously
- Avoid common async mistakes

## Further Reading

- [JavaScript Promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [Node.js Async/Await](https://nodejs.dev/en/learn/modern-asynchronous-javascript-with-async-and-await/)
- [What the heck is the event loop anyway? (Philip Roberts, JSConf EU)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Node.js Event Loop & Timers](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Promise.all vs Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)