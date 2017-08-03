const mongoose = require('mongoose');
const model = require('./TinyUrl.model');

class TinyUrl {
  static create(req, res, next) {
    
  }

  static read(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then()
      .catch(next);
  }
}

module.exports = TinyUrl;