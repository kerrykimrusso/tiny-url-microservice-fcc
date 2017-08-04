const mongoose = require('mongoose');
const model = require('./TinyUrl.model');
const urlValidator = require('valid-url');
const baseConversionMap = require('../../constants').baseConversionMap;

class TinyUrlController {
  static create(req, res, next) {
    let tinyUrl = TinyUrlController.shortenUrl(req.params.url);
    if(tinyUrl) {
      model.create(tinyUrl)
        .then()
        .catch(next);
    }
  }

  static getBySlug(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then()
      .catch(next);
  }
  
  static shortenUrl(url) {
    if(!url) return null;
    if(!TinyUrlController.isValidUrl(url)) return null;
    
    let slug = TinyUrlController.convertIntToBase();
    
    return { slug: slug, destination: url };
  }
  
  static isValidUrl(url) {
    // TODO best would be to actually see if a 200 response is returned from the url
    // but easiest is just going to verify that the url is properly formatted
    
    return urlValidator.isUri(url);
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