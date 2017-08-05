const server = require('../server');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
const mocha = require('mocha');
const before = mocha.before;
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const afterEach = mocha.afterEach;
const after = mocha.after;
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

before(function(done) {
  console.log(process.env.MONGODBURITEST);
  mongoose.connect(process.env.MONGODBURITEST)
    .then(done, err => {
      console.log(err);
    });
});

// after(function(done) {
  
// });

// describe('/new/http://google.com', function() {
//   beforeEach(function(done) {
    
//   });
  
//   afterEach(function(done) {
//     mongoose.connection.db.dropCollection('tinyurl', function() {
//       console.log('tinyurl collection dropped');
//     });
//   });
  
//   it('should create a document from a valid long url', function(done) {
//     chai.request(server)
//       .get('/new/http://google.com')
//       .end((err, res) => {
//         if(err) console.log(err);
//         else console.log(res.body);
//         done();
//       })
//   });
// });