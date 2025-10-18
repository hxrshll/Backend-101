const mailer = require('../utils/mailer');

module.exports = async function sendWelcomeEmail({ email }) {
  console.log(`Processing email job for ${email}`);

  await mailer.sendMail({
    from: 'noreply@example.com',
    to: email,
    subject: 'Welcome to the platform',
    text: 'Thanks for signing up.'
  });

  console.log(`Welcome email sent to ${email}`);
};
