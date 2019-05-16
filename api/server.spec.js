const request = require('supertest');

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