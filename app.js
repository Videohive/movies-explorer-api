require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./utils/customErrors');
const { DB_CONNECT, DB_ERROR, LINK_SERVER } = require('./utils/constants');

const { PORT, BASE_PATH, DB_CONN } = require('./config');

const app = express();

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
})
  .then(() => console.log(DB_CONNECT))
  .catch((err) => console.error(DB_ERROR, err));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(requestLogger);
app.use(rateLimiter);

app.use(helmet());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(LINK_SERVER, `${BASE_PATH}:${PORT}`);
});
