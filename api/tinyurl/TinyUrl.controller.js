const mongoose = require('mongoose');
const model = require('./TinyUrl.model');
const baseConversionMap = require('../../constants').baseConversionMap;

class TinyUrl {
  static create(req, res, next) {
    
  }

  static getBySlug(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then()
      .catch(next);
  }
  
  static shortenUrl(url) {
    let shortenedUrl = '';
    
    return shortenedUrl;
  }
  
  static convertIntToBase(int, length, map) {
    let converted = '';
    
    while(int > 0) {
      int / length  
    }
    
    return converted;
  }
}

module.exports = TinyUrl;