const request = require('superTest');
const db = require('../../data/dbConfig.js');

const server = require('../server.js');

afterEach(async () => {
    await db('users').truncate()
});

describe('server.js', () => {
    describe('GET /schools endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/api/users');

            expect(response.status).toBe(200);
        })
        it('should respond with JSON', async () => {
            let response = await request(server).get('/api/users');

            expect(response.type).toMatch(/json/i);
        })
        it('should respond with array', async () => {
            const expected = [];
            let response = await request(server).get('/api/users');

            expect(response.body).toMatchObject(expected);
        })
    })
});