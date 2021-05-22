const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY, SENDGRID_DOMAIN } = require('../config/keys');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = email => {
  const msg = {
    to: email,
    from: SENDGRID_DOMAIN,
    subject: 'Successfully registered',
    html: `
      <div>
        <strong>Congratulations!</strong>
        <p>You have successfully registered</p>
      </div>
    `,
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (err) {
      console.error(err);
      if (err.response) {
        console.error(err.response.body);
      }
    }
  })();
};

module.exports = { sendEmail };
