const mocha = require('mocha');
const before = mocha.before;
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const TinyUrlController = require('./TinyUrl.controller');
const map = require('../../constants').baseConversionMap;

describe('TinyUrl Controller', function() {
  let tinyUrlController;
  before(function() {
    tinyUrlController = new TinyUrlController();
  });
  
  describe('#convertIntToBase(int, conversionLength, map)', function() {
    it('should return a string', function() {
      let result = tinyUrlController._convertIntToBase(1, 7, map);
      expect(result).to.be.a('string');
    });
    
    it('should correctly convert an integer into a new base using the characters and length provided by the map', function() {
      let result = tinyUrlController._convertIntToBase(1, 7, map);
      expect(result).to.equal('0000001');
      
      result = tinyUrlController._convertIntToBase(125, 7, map);
      expect(result).to.equal('0000021');
      
      result = tinyUrlController._convertIntToBase(7912, 7, map);
      expect(result).to.equal('000023C');
      
      result = tinyUrlController._convertIntToBase(0, 7, map);
      expect(result).to.equal('0000000');
    });
    
    it('should throw an error if int is less than 0', function() {
      expect(tinyUrlController._convertIntToBase.bind(-1, 7, map)).to.throw(Error);
    });
    
    it('should throw an error if int is larger than the largest possible integer for conversionLength', function() {
      let tooLargeOfANumber = Math.pow(map.length, 7) + 1;
      expect(tinyUrlController._convertIntToBase.bind(tooLargeOfANumber, 7, map)).to.throw(Error);
    });
  });
  
  describe('#shortenUrl(url, id)', function() {
    it('should throw an error if the url is falsey', function() {
      expect(tinyUrlController._shortenUrl.bind('', 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind(null, 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind(undefined, 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind(false, 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind(0, 1)).to.throw(Error);
    });
    
    it('should throw an error if the url is not a valid uri', function() {
      expect(tinyUrlController._shortenUrl.bind('this is not a url', 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind('www.google.com', 1)).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind('google.com', 1)).to.throw(Error);
    });
    
    it('should throw an error if the id cannot be parsed to an integer', function() {
      expect(tinyUrlController._shortenUrl.bind('http://google.com', 'integer')).to.throw(Error);
      expect(tinyUrlController._shortenUrl.bind('http://google.com', '9484')).to.not.throw();
    });
  });
});