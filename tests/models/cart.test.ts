import { describe, expect, it } from 'vitest'
import { validateCart } from '../../src/models/cart'
import exampleCartData from '../../src/data/testCartData.json'

describe('validateCart', () => {
    it('should return true if passed a valid cart', () => {
        const cart = [{ code: 'A', quantity: 1 }]
        expect(validateCart(cart)).toBe(true)
        expect(validateCart(exampleCartData)).toBe(true)
    });

    it('should throw an error if passed a cart containing item/s with invalid code/s', () => {
        const cart = [{ code: 4, quantity: 2 }] as any
        try {
            validateCart(cart)
        } catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }
    });

    it('should throw an error if passed a cart containing item/s with invalid quantity/s', () => {
        const cart = [{ code: 'A', quantity: '2' }] as any
        try {
            validateCart(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }
    });

    it('should throw an error if passed a cart containing item/s with invalid key/s', () => {
        const cart = [{ kode: 'A', quantity: 1 }] as any
        try {
            validateCart(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }
    });

    it('should throw an error if passed a cart containing item/s with unexpected key/s', () => {
        const cart = [{
            code: 'A',
            quantity: 1,
            potentiallyMaliciousKey: 'potentiallyMaliciousValue'
        }] as any
        try {
            validateCart(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }
    });

    it('should throw an error if passed a cart which is not an array', () => {
        const cart = {} as any
        try {
            validateCart(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }

    })
})