const router = require('express').Router();
const TinyUrlController = require('../api/tinyurl/TinyUrl.controller');
const controller = new TinyUrlController();

router.get('/new/:url', controller.create);

module.exports = router;