const fetch = require("node-fetch");

async function run() {
  console.log("Testing signup flow...");

  const res = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@test.com" })
  });

  const data = await res.json();
  console.log(data);
}

run();