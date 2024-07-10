import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../app';
import exampleCartData from '../src/data/testCartData.json';
describe('app', () => {
    it('should return 200 when a valid POST to /cart/total is made', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send(exampleCartData)
        expect(response.status).toBe(200)
    });

    it('should return 405 when an invalid method is used', async () => {
        const response = await request(app)
            .put('/cart/total')
            .send(exampleCartData)
        expect(response.status).toBe(405)

    })
    it('should return 404 when an invalid route is used', async () => {
        const response = await request(app)
            .post('/cart')
            .send(exampleCartData)
        expect(response.status).toBe(404)

    })
})