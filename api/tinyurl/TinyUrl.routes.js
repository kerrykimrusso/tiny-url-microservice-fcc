const router = require('express').Router();
const TinyUrlController = require('./TinyUrl.controller');
const controller = new TinyUrlController();

router.get('/new/:url([^$]*)', controller.create);
// router.get('/:slug', controller.getBySlug);

module.exports = router;