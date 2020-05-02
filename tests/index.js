const request = require('supertest');

const server = process.argv.indexOf('--server') !== -1;

if (server) {
    describe('Start Express server', function () {
        var server;
        beforeEach(() => {
            server = require('../bin/www');
        });
        afterEach(() => {
            server.close();
        });
        it('responds to /', (done) => {
            request(server).get('/').expect(200, done);
        });
        it('/graphql gives 302 Not Found', (done) => {
            request(server).get('/graphql').expect(302, done);
        });
        it('/timesheet gives 403 Forbidden', (done) => {
            request(server).get('/timesheet').expect(403, done);
        });
    });
}