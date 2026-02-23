const fetch = require("node-fetch");

async function run() {
  console.log("Testing rate limiting...");

  for (let i = 0; i < 10; i++) {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "spam@test.com" })
    });

    console.log(res.status);
  }
}

run();