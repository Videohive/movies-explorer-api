const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');

const { login, createUser } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validate/userValidate');
const auth = require('../middlewares/auth');

const { URL_NOT_FOUND, NotFoundError } = require('../utils/customErrors');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use((req, res, next) => {
  const newError = new NotFoundError(URL_NOT_FOUND);
  next(newError);
});

module.exports = router;
