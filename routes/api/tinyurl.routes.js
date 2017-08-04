const router = require('express').Router();
const controller = require('../api/tinyurl/TinyUrl.controller');

router.get('/new/:url', controller.create);

module.exports = router;