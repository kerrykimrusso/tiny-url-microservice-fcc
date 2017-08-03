const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const TinyUrlController = require('./TinyUrl.controller');

describe('TinyUrl Controller', function() {
  describe('#convertIntToBase(int, conversionLength, map)', function() {
    it('should return a string', function() {
      expect(TinyUrlController.convertIntToBase()).to.be.a('string');
    });
    
    it('should correctly convert an integer into a new base using the characters and length provided by the map', function() {
      expect(TinyUrlController.convertIntToBase()).to.equal('');
    });
    
    it('should throw an error if int is less than 0', function() {
      expect(TinyUrlController.convertIntToBase()).to.throw();
    });
  });
});