const mongoose = require('mongoose');
const model = require('./TinyUrl.model');
const urlValidator = require('valid-url');
const baseConversionMap = require('../../constants').baseConversionMap;

class TinyUrlController {
  constructor(curId = 0) {
    this.curId = curId;
  }
  
  create(req, res, next) {
    try {
      let tinyUrl = this._shortenUrl(req.params.url, this.curId);
      model.create(tinyUrl)
        .then(this._respondWithDocumentAsJson.bind(null, res))
        .catch(next);
    } catch(err) {
      res.json({ success: false, error: err.message }).end();
    }
  }

  getBySlug(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then(this._redirect.bind(null, res))
      .catch(next);
  }
  
  _getLatestSlug() {
    model.findOne()
      .then(doc => { return doc })
      .catch((err) => { throw new Error(err); });
  }
  
  _shortenUrl(url, id) {
    if(!url) throw new Error('url cannot be falsey');
    if(!this._isValidUrl(url)) throw new Error('url not properly formatted');
    if(isNaN(parseInt(id))) throw new Error('id must be able to be parsed to an int');
    
    return { slug: this._convertIntToBase(id, 7, baseConversionMap), destination: url };
  }
  
  _isValidUrl(url) {
    // TODO best would be to actually see if a 200 response is returned from the url
    // but easiest is just going to verify that the url is properly formatted
    
    return urlValidator.isUri(url);
  }
  
  _convertIntToBase(int, conversionLength, map) {
    if(int < 0) throw new Error('number to convert cannot be negative');
    
    let maxInt = 0;
    for(let i = conversionLength - 1; i >= 0; --i) {
      maxInt += Math.pow(map.length, i);
    }
    
    if(int > maxInt) throw new Error('int is too large, must be smaller than ' + maxInt);
    
    if(int === 0) return Array(conversionLength + 1).join('0');
    
    let conversion = '', placeValue = 0, quotient = 0, remainder = int;
    while(conversionLength > 0) {
      placeValue = Math.pow(map.length, conversionLength - 1);
      quotient = Math.floor(remainder / placeValue);
      conversion += map[quotient];
      remainder -= quotient * placeValue;
      conversionLength -= 1;
    }
    
    return conversion;
  }
  
  _respondWithDocumentAsJson(res, doc) {
    ++this.curId;
    res.json(doc).end();
  }
  
  _redirect(res, doc) {
    res.redirect(doc.destination);
  }
}

module.exports = TinyUrlController;