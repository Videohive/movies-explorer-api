require('dotenv').config();

const {
  PORT = 3000,
  BASE_PATH = 'localhost',
  DB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  BASE_PATH,
  DB_CONN,
};
