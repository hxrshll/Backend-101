async function sendWelcomeEmail(email) {
  console.log(`Sending welcome email to ${email}`);

  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log(`Email sent to ${email}`);
}

module.exports = sendWelcomeEmail;