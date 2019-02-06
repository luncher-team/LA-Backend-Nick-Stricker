const request = require('superTest');
const db = require('../../data/dbConfig.js');
const schoolDb = require('../../data/helpers/schoolModel.js');
const server = require('../server.js');

const ware = require('../middleware.js')


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

            let response = await request(server).post('/schools').send({ name: 'this is a name', address: 'platformer', requested_funds: 1999 }).set('Authorization', token);

            expect(response.status).toBe(201);
        })

        it('should insert provided school', async () => {
            const { id } = await schoolDb.add({ name: 'this is a name', address: '123 road island', requested_funds: 2000 })
            const school = await schoolDb.get(id)

            let schools = await schoolDb.get();

            expect(schools).toHaveLength(1);
            expect(school.name).toEqual('this is a name');

            await schoolDb.add({ name: 'this is a second name', address: '123 road island', requested_funds: 2000 });
            schools = await schoolDb.get();

            expect(schools).toHaveLength(2);
        })

        it('should have a unique name', async () => {
            let user = await request(server).get('/schools/:id')
            let token = await ware.generateToken(user);

            await request(server).post('/schools')
                .send({ name: 'this is a name', address: '123 road island', requested_funds: 2000 }).set('Authorization', token);
            let response = await request(server).post('/schools')
                .send({ name: 'this is a name', address: '123 road island', requested_funds: 2000 }).set('Authorization', token);

            expect(response.status).toBe(405);
            expect(response.body.msg).toBe('name must be unique');
        })
    })
})