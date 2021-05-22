require('dotenv/config');

module.exports = {
  conOpt: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
  },
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_DOMAIN: process.env.SENDGRID_DOMAIN,
};
