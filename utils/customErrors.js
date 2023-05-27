const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');

function errorHandler(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof BadRequestError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof ServerError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof ConflictError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  ServerError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  errorHandler,
};
