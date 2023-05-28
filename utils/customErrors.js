const SERVER_ERROR = 'Ошибка сервера';
const WRONG_DATA = 'Переданы некорректные данные';
const MOVIE_ACCESS_ERROR = 'Нет прав для удаления этого фильма';
const MOVIE_NOT_FOUND = 'Фильм с данным id не найден';
const USER_NOT_FOUND = 'Пользователь не найден';
const USER_WRONG_ID = 'Введен невалидный id пользователя';
const EMAIL_ALREADY_EXISTS = 'Пользователь с указанным email уже зарегистрирован';
const AUTHORIZATION_REQUIRED = 'При авторизации произошла ошибка';
const URL_NOT_FOUND = 'Данная страница не существует';

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
    res.status(err.status).send({ message: SERVER_ERROR });
  } else if (err instanceof ConflictError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: SERVER_ERROR });
    next(err);
  }
}

module.exports = {
  WRONG_DATA,
  MOVIE_ACCESS_ERROR,
  MOVIE_NOT_FOUND,
  USER_NOT_FOUND,
  USER_WRONG_ID,
  EMAIL_ALREADY_EXISTS,
  AUTHORIZATION_REQUIRED,
  URL_NOT_FOUND,
  NotFoundError,
  BadRequestError,
  ServerError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  errorHandler,
};
