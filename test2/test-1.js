require('mocha-generators').install();
const request = require('supertest');

const app = require('../src/index');
 
describe('GET /user', function() {
    it('respond with json', function(done) {
      request(app)
        .get('/wxUser')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });