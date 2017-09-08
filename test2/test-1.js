require('mocha-generators').install();
const request = require('supertest');
const {
  log4js
} = require('../src/global');
const app = require('../src/index');
const logger = log4js.getLogger();

describe('GET /user', function () {
  it('respond with json', function (done) {
    request(app)
      .get('/wxUser')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});