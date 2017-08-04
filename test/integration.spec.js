const mongoose = require('mongoose');
mongoose.promise = global.Promise; 
const mocha = require('mocha');
const before = mocha.before;
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
chai.use(chaihttp);

before(function(done) {
  mongoose.connect(process.env.MONGODBURITEST);
  mongoose.connection
    .once('open', function() {
        done();
    })
    .on('error', function(err) {
        console.log(err);
    });
});

describe('/new/http://google.com', function() {
  beforeEach(function(done) {
    mongoose.connection.db.dropCollection('tinyurl', function() {
      console.log('tinyurl collection dropped');
    });
  });
  
});