const request = require('supertest');
const db = require('../data/dbConfig');

const server = require('./server');

describe('server', () => {
    
    describe('GET /', () => {
        it('should return an OK status code', () => {
            return request(server).get('/').expect(200);
        })

        it('should return a JSON object', () => {
            return request(server).get('/').then(res => {
                expect(res.type).toBe('application/json');
            })
        })

        it('should return {api: Good!}', () => {
            return request(server).get('/').then(res => {
                expect(res.body).toEqual({'api': 'Good!'});
            })
        })
    })
})

describe('users', () => {

    afterEach(async () => {
        await db('users').truncate();
      });
    
    describe('GET / users', () => {
        it('should return an OK status code', () => {
            return request(server).get('/api/users').expect(200);
        })

        it('should return a JSON object (list of users)', () => {
            return request(server).get('/api/users').then(res => {
                expect(res.type).toBe('application/json');
            })
        })

        it('should always return an array even if no users in database', () => {
            return request(server).get('/api/users').then(res => {
                expect(res.body).toEqual(expect.any(Array))
            })
        })

    })

    describe('POST / users', () => {
        it('should status code 400 if no user information provided', () => {
            return request(server).post('/api/users').expect(422);
        })

        it('should return status code 200 when user added sucessfully', async () => {
            const user = { name: 'test', email: 'test@test.com' };
            const res = await request(server)
                .post('/api/users')
                .send(user)
                expect(res.status).toBe(200)
        })

        it('should return JSON object when new user has been sucessfully added', async () => {
            const user = { name: 'test', email: 'test@test.com' };
            const res = await request(server)
                .post('/api/users')
                .send(user)
                expect(res.type).toBe('application/json')
        })

    })
})