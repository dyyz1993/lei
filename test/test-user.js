require('mocha-generators').install();
const assert = require('chai').assert;
const {
    util,
    co
} = require('../src/global/index');
const userModule = require('../src/module/userModule.js');

describe('Module - user', () => {
    it('user schema', function* () {
        let schema = userModule.schema;
        assert.equal(schema, require('../src/schema/user.js'));
    });
    it('user insert', function* () {
        let user = {
            password: "1",
            username: 2221112
        };
        // let id = yield userModule.insert(user);
        let user2 = yield userModule.get({
            username: 2221112
        });
        assert.equal(user, user2);
    });

    it('user delete', function* () {

        assert.equal(1, 1);
    });

    it('user count', function* () {

        assert.equal(1, 1);
    });
    it('user list', function* () {

        assert.equal(1, 1);
    });
    it('user update', function* () {

        assert.equal(1, 1);
    });

    it('user pageList', function* () {

        assert.equal(1, 1);
    });

});