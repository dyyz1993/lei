require('mocha-generators').install();
const assert = require('chai').assert;
const {
  log4js,
  utils
} = require('../src/global');



const app = require('../src/index');
const agent = require('supertest')(app);

const logger = log4js.getLogger();


describe('GET /wxUser', function () {
  let wxUser = {
    nickname :utils.randomStr(5),
    openid:utils.randomStr(10),
    username:'许映洲',
    mobile:'13751880018',
    markettype:1,
    address:32131
  }

  let cookie = '';

  before('登录',function*(){
    let { code,data } = yield agent.post('/apis/wxUser/add/')
    .send(wxUser)
    .expect(200)
    .then(({headers,body})=>{
      cookie = headers['set-cookie'];
      return body;
    });
    assert.equal(code,0)
    assert.equal(wxUser.nickname,data.nickname)
  })

  it('select markettype', function*() {
    let { code,data }= yield agent.get(`/apis/wxUser/${wxUser.markettype}`)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>{
      return body;
    });
    assert.equal(code,0)
    assert.equal(wxUser.openid,data.openid)
    assert.equal(data.ischance,1)
  });

 
  it('user lottery', function*() {
    let { code,data } = yield agent.put(`/apis/wxUser/lottery/${wxUser.markettype}`)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>body);
    assert.equal(code,0)
    assert.equal(wxUser.openid,data.openid)
  });


  
  it('user perfect address', function*() {
    let { code,data } = yield agent.put(`/apis/wxUser/perfect/`)
    .send(wxUser)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>body);
    assert.equal(code,0)

  });


  it('wxUser awards', function*() {
    let { code,data } = yield agent.get(`/apis/wxUser/my/awards/`)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>body);
    assert.equal(code,0)
    assert.isArray(data);
  });


  it('wxUser all awards', function*() {
    let { code,data } = yield agent.get(`/apis/wxUser/lottery/list`)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>body);
    assert.equal(code,0)
    assert.isArray(data);
  });


  it('wxUser deal prize', function*() {
    let { code,data } = yield agent.put(`/apis/wxUser/deal/prize`)
    .send(wxUser)
    .expect(200)
    .set('cookie',cookie)
    .then(({headers,body})=>body);
    assert.equal(code,0)
  });

});