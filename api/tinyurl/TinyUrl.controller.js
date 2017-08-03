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
    if(int < 0) throw new Error('number to convert cannot be negative');
    
    if(int == 0) return '0';
    
    let conversion = '', placeValue = 0, quotient = 0, remainder = int;
    while(remainder > 0) {
      placeValue = Math.pow(map.length, conversionLength);
      if(placeValue > remainder) {
        conversionLength -= 1;
        conversion += conversion.lenth ? map[0] : '';
        continue;
      } else {
        quotient = Math.floor(remainder / placeValue);
        conversion += map[quotient];
        remainder -= quotient * placeValue;
        conversionLength -= 1;
      }
    }
    
    return conversion;
  }
}

module.exports = TinyUrl;