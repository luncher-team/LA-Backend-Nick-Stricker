const request = require('superTest');
const db = require('../../data/dbConfig.js');
const schoolDb = require('../../data/helpers/schoolModel.js');
const server = require('../server.js');

const ware = require('../middleware.js')
const bcrypt = require('bcryptjs');

afterEach(async () => {
    await db('schools').truncate()
});

describe('server.js', () => {
    describe('GET /schools endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/schools');

            expect(response.status).toBe(200);
        })
        it('should respond with JSON', async () => {
            let response = await request(server).get('/schools');

            expect(response.type).toMatch(/json/i);
        })
        it('should respond with array', async () => {
            const expected = [];
            let response = await request(server).get('/schools');

            expect(response.body).toMatchObject(expected);
        })
    })

    describe('Post /schools endpoint', () => {
        it('should return status code 201', async () => {
            let user = await request(server).get('/schools/:id')
            let token = await ware.generateToken(user);

            let response = await request(server).post('/schools').send({ name: 'this is a name', address: 'platformer', requested_funds: 1999 }).set('Authentication', token);

            expect(response.status).toBe(201);
        })

        it('should insert provided school', async () => {

        })

        it('should have a unique name', async () => {

        })
    })
})