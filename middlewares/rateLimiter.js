const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // ограничить каждый IP до 100 запросов
  message: 'Слишком много запросов с этого IP, повторите попытку через час.',
});

module.exports = limiter;
