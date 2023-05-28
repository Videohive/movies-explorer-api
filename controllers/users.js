const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  USER_NOT_FOUND,
  USER_WRONG_ID,
  WRONG_DATA,
  EMAIL_ALREADY_EXISTS,
  NotFoundError,
  BadRequestError,
  ConflictError,
} = require('../utils/customErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

const findUser = (query) => User.findById(query)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    return user;
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError(USER_WRONG_ID);
    }
    throw err;
  });

module.exports.getCurrentUser = (req, res, next) => {
  findUser({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.send({
        data: {
          name, email,
        },
      });
      return null;
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next, updateData) => {
  User.findByIdAndUpdate(
    req.user._id,
    updateData,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(USER_NOT_FOUND);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(USER_WRONG_ID));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(WRONG_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
        return;
      }
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  updateUser(req, res, next, { name, email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-dev-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};
