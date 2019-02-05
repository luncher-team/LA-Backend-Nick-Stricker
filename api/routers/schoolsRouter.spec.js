const request = require('superTest');
const db = require('../../data/dbConfig.js');
const schoolDb = require('../../data/helpers/schoolModel.js');
const server = require('../server.js');

afterEach(async () => {
    await db('schools').truncate()
});

describe('server.js', () => {
    describe('GET /schools endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/schools');

            expect(response.status).toBe(200);
        })
    })
})