const router = require('express').Router();
const TinyUrlController = require('./TinyUrl.controller');
const controller = new TinyUrlController();

router.get('/new/:url([^$]*)', controller.create.bind(controller));
router.get('/:slug', controller.getBySlug.bind(controller));

module.exports = router;