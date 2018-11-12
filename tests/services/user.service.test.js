const assert = require('chai').assert;
var expect = require('chai').expect;
const { getUserByUsername } = require('../../services/user.service');


describe("smoke test", function () {
    it("checks equality", function (done) {
        getUserByUsername('ntn', 'username password -_id').then(user => {
            console.log(user)
            assert.containsAllDeepKeys(user, ['username', 'password']);
            done();
        }).catch(done);
    });
});