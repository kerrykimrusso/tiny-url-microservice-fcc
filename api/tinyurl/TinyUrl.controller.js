const mongoose = require('mongoose');
const model = require('./TinyUrl.model');
const urlValidator = require('valid-url');
const baseConversionMap = require('../../constants').baseConversionMap;

class TinyUrlController {
  constructor() {
    this.curId = this._setId();
    console.log(this.curId);
  }
   
  create(req, res, next) {
    try {
      let tinyUrl = this._shortenUrl(req.params.url, this.curId);
      model.create(tinyUrl)
        .then(this._respondWithDocumentAsJson.bind(this, res))
        .catch(next);
    } catch(err) {
      res.json({ success: false, error: err.message }).end();
    }
  }

  getBySlug(req, res, next) {
    let slug = req.params.slug;
    model.findOne({ slug: slug })
      .then(this._redirect.bind(this, res))
      .catch(next);
  }
  
  _setId() {
    model.find({}).sort('-createdAt').limit(1).exec()
      .then((doc) => {
        this.curId = doc && doc.length ? this._convertSlugToInt(doc[0].slug, baseConversionMap) : 0;
      })
      .catch((err) => { console.log(err) });  
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
    
    return urlValidator.isWebUri(url);
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
  
  _convertSlugToInt(slug, map) {
    if(slug) throw new Error('slug cannot be null, undefined, or empty');
    if(!map || !map.length) throw new Error('map cannot be null, undefined, or empty');
    
    let char = slug[0];
    let int = 0;
    let power = slug.length - 1;
    let slugIndex = 0;
    let charIndex = 0;
    while(power >= 0) {
      charIndex = map.indexOf(char);
      if(charIndex < 0) throw new Error(`character (${char}) in slug does not exist in map`);
      int += charIndex * Math.pow(map.length, power);
      --power;
      ++slugIndex;
      char = slug[slugIndex];
    }
    
    return int;
  }
  
  _respondWithDocumentAsJson(res, doc) {
    ++this.curId;
    res.json(doc).end();
  }
  
  _redirect(res, doc) {
    if(!doc) res.json({ success: false, error: 'That slug doesn\'t look familiar...'}).end();
    
    res.redirect(doc.destination);
  }
}

module.exports = TinyUrlController;