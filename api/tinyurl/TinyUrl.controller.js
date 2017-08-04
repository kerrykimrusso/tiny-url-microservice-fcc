const mongoose = require('mongoose');
const model = require('./TinyUrl.model');
const baseConversionMap = require('../../constants').baseConversionMap;

class TinyUrlController {
  static create(req, res, next) {
    
  }

  static getBySlug(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then()
      .catch(next);
  }
  
  static shortenUrl(destination) {
    if(!destination) throw new Error('url cannot be null or empty');
    
    if(!isUrl(destination)) throw new Error('destination is not in url format');
    
    let slug = TinyUrlController.convertIntToBase();
    
    return { slug, destination };
  }
  
  static convertIntToBase(int, conversionLength, map) {
    if(int < 0) throw new Error('number to convert cannot be negative');
    
    if(int === 0) return '0'.repeat(conversionLength); //Array(conversionLength + 1).join('0');
    
    let conversion = '', placeValue = 0, quotient = 0, remainder = int;
    while(remainder > 0) {
      placeValue = Math.pow(map.length, conversionLength - 1);
      quotient = Math.floor(remainder / placeValue);
      conversion += map[quotient];
      remainder -= quotient * placeValue;
      conversionLength -= 1;
    }
    
    return conversion;
  }
}

module.exports = TinyUrlController;