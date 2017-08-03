const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const TinyUrlController = require('./TinyUrl.controller');
const map = require('../../constants').baseConversionMap;

describe('TinyUrl Controller', function() {
  describe('#convertIntToBase(int, conversionLength, map)', function() {
    it('should return a string', function() {
      let result = TinyUrlController.convertIntToBase(1, 7, map);
      expect(result).to.be.a('string');
    });
    
    it('should correctly convert an integer into a new base using the characters and length provided by the map', function() {
      let result = TinyUrlController.convertIntToBase(1, 7, map);
      expect(result).to.equal('0000001');
      
      result = TinyUrlController.convertIntToBase(125, 7, map);
      expect(result).to.equal('0000021');
      
      result = TinyUrlController.convertIntToBase(7912, 7, map);
      expect(result).to.equal('000023C');
      
      result = TinyUrlController.convertIntToBase(0);
      expect(result).to.equal('0000000');
    });
    
    it('should throw an error if int is less than 0', function() {
      expect(TinyUrlController.convertIntToBase(-1)).to.throw(Error);
    });
    
    it('should throw an error if int is larger than the largest possible integer for conversionLength', function() {
      let tooLargeOfANumber = Math.pow(map.length, 7) + 1;
      expect(TinyUrlController.convertIntToBase(tooLargeOfANumber, 7, map)).to.throw(Error);
    });
  });
});