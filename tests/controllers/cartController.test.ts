import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import exampleCartData from '../../src/data/testCartData.json'
import { getCartTotal } from '../../src/controllers/cartController';

const app = express()
app.use(express.json())

app.post('/cart/total', getCartTotal)

describe('getCartTotal()', () => {
    it('should return the calculated total when queried with a valid cart payload', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send(exampleCartData
            )
        expect(response.status).toBe(200)
        expect(response.body.total).toBe(284)
    });

    it('should return 200 status, total 0 when queried with an empty cart payload', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send(
                []
            )
        expect(response.status).toBe(200)
        expect(response.body.total).toBe(0)
    });

    it('should return 400 status when queried with invalid cart data (not an array)', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send(
                {}
            )
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Invalid cart data')
    });

    it('should return 400 status when queried with invalid cart data (wrong datatype of cart values)', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send([
                    {
                        code: 9,
                        quantity: '1'
                    }

                ]
            )
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Invalid cart data')
    });

    it('should return 400 status when queried with invalid cart data (additional properties)', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send( [
                    {
                        code: 'A',
                        quantity: 1,
                        potentiallyMaliciousKey: 'potentiallyMaliciousValue'
                    }
                ]
            )
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Invalid cart data')

    });

    it('should return 404 status when queried with valid item codes which are not present in the pricing table', async () => {
        const response = await request(app)
            .post('/cart/total')
            .send( [
                    {
                        code: 'Z',
                        quantity: 1,
                      
                    }
                ]
            )
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Item/s not found')

    });
});
