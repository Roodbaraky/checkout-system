import { describe, expect, it } from 'vitest'
import { calculateCartTotal } from '../../src/utils/checkout'
import exampleCartData from '../../src/data/testCartData.json'

describe('getCartTotal()', () => {
    it('should return the unit price of the item when passed a cart containing one item', () => {
        const cart = [{ code: 'A', quantity: 1 }]
        expect(calculateCartTotal(cart)).toBe(50)
    });
    it('should return the product of unitPrice and quantity of an item when passed a cart containing multiple of one item', () => {
        const cart = [{ code: 'A', quantity: 2 }]
        expect(calculateCartTotal(cart)).toBe(100)
    });
    it('should return the total price of items when passed a cart containing multiple items', () => {
        const cart = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 1 }]
        expect(calculateCartTotal(cart)).toBe(85)
    });
    it('should incorporate special prices of items when returning the cart total', () => {
        const cart = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 2 }]
        const cart2 = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 3 }]
        const cart3 = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 6 }]

        expect(calculateCartTotal(cart)).toBe(110)
        expect(calculateCartTotal(cart2)).toBe(145)
        expect(calculateCartTotal(cart3)).toBe(230)
        expect(calculateCartTotal(exampleCartData)).toBe(284)

    });
    it('should throw an error if passed a cart containing invalid items (invalid \'code\' datatype)', () => {
        const cart = [{ code: 4, quantity: 2 }] as any
        try {
            calculateCartTotal(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }

    });

    it('should throw an error if passed a cart containing invalid items (invalid \'quantity\' datatype)', () => {
        const cart = [{ code: 'A', quantity: '2' }] as any
        try {
            calculateCartTotal(cart)
        }
        catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')

        }

    })

})