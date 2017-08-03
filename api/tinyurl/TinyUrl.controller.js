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
  
  static convertIntToBase(int, conversionLength, map) {
    let conversion = '';
    
    console.log('running function...');
    
    let placeValue = Math.pow(map.length, conversionLength);
    let quotient = 0, remainder = int;
    while(remainder > 0) {
      quotient = Math.floor(remainder / placeValue);
      conversion += remainder >= placeValue ? quotient : map[0];
      remainder = remainder - quotient * placeValue;
      placeValue -= 1;
    }
    
    return conversion;
  }
}

module.exports = TinyUrl;