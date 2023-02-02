require('dotenv').config();

module.exports = {
  development: {
    "username": process.env.CONS_DEV_DB_USERNAME,
    "password": process.env.CONS_DEV_DB_PASSWORD,
    "database": process.env.CONS_DEV_DB_NAME,
    "host": process.env.CONS_DEV_DB_HOST,
    "dialect": "postgres"
  },
  production: {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOST,
    "dialect": "postgres",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": false,
        "rejectUnauthorized": false,
      },
    },
  }
};