const request = require('superTest');
const db = require('../../data/dbConfig.js');
const authDb = require('../../data/helpers/authModel.js');

const server = require('../server.js');

afterEach(async () => {
    await db('users').truncate()
});

describe('server.js', () => {
    describe('GET /api/users endpoint', () => {
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

    describe('Post /api/register endpoint', () => {
        it('should return status code 201', async () => {

            let response = await request(server).post('/api/register').send({
                "username": "Regi",
                "password": "goodboi",
                "email": "goodboi@gmail.com"
            });

            expect(response.status).toBe(201);
        })

        it('should insert provided school', async () => {
            let login = await request(server).post('/api/register').send({
                "username": "Regi",
                "password": "goodboi",
                "email": "goodboi@gmail.com"
            });

            let [user] = await authDb.get(login.id);
            let users = await authDb.get();

            expect(users).toHaveLength(1);
            expect(user.username).toEqual('Regi');

            await authDb.add({
                "username": "Legi",
                "password": "goodboi",
                "email": "goodboi@gmail.com"
            });
            users = await authDb.get();

            expect(users).toHaveLength(2);
        })

        it('should have a unique name', async () => {

            await request(server).post('/api/register')
                .send({
                    "username": "Regi",
                    "password": "goodboi",
                    "email": "goodboi@gmail.com"
                });
            let response = await request(server).post('/api/register')
                .send({
                    "username": "Regi",
                    "password": "goodboi",
                    "email": "goodboi@gmail.com"
                });

            expect(response.status).toBe(405);
            expect(response.body.msg).toBe('Username already exists');
        })
    })


    describe('Post /api/Login endpoint', () => {
        it('should return status code 201', async () => {

            await request(server).post('/api/register').send({
                "username": "Regi",
                "password": "goodboi",
                "email": "goodboi@gmail.com"
            });

            let response = await request(server).post('/api/login').send({
                "username": "Regi",
                "password": "goodboi"
            });

            expect(response.status).toBe(200);
        })

        it('should insert provided user', async () => {
            await request(server).post('/api/register').send({
                "username": "Regi",
                "password": "goodboi",
                "email": "goodboi@gmail.com"
            });
            await request(server).post('/api/register').send({
                "username": "Legi",
                "password": "goodboi",
                "email": "badboi@gmail.com"
            });
            let login = await request(server).post('/api/login').send({
                "username": "Regi",
                "password": "goodboi"
            });


            let users = await authDb.get();

            expect(login.text).toBeTruthy();
            expect(login.text).toContain('username', 'id', 'token');
            expect(users[0]).toMatchObject({
                "id": 1,
                "username": "Regi",
                "first_name": "",
                "last_name": "",
                "email": "goodboi@gmail.com",
                "user_type": "patron",
                "donated": 0
            });

            expect(users[1]).toMatchObject({
                "id": 2,
                "username": "Legi",
                "first_name": "",
                "last_name": "",
                "email": "badboi@gmail.com",
                "user_type": "patron",
                "donated": 0
            });
        })

        // it('should have a unique name', async () => {

        //     let login = await request(server).post('/api/login').send({
        //         "username": "Regi",
        //         "password": "goodboi"
        //     });

        //     expect(login.status).toBe(500);
        //     expect(login.body.msg).toBe('username or password are incorrect');
        // })
    })

});