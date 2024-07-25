import { describe, expect, it } from 'vitest'
import { validateCart, calculateCartTotal, getPricesByItemCode } from '../../src/models/cart'
import exampleCartData from '../../src/data/testCartData.json'

describe('validateCart', () => {
    it('should return true if passed a valid cart', () => {
        const cart = [{ code: 'A', quantity: 1 }]
        expect(validateCart(cart)).toBe(true)
        expect(validateCart(exampleCartData)).toBe(true)
    });

    it('should throw an error if passed a cart with items containing negative quantity values', () => {
        const cart = [{ code: 'A', quantity: -1 }]
        try {
            validateCart(cart)
        } catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Invalid cart data')
        }


    })

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

    it('should throw an error if passed a cart containing item/s with codes not in pricingData', () => {
        const cart = [{ code: 'Z', quantity: 2 }] as any
        try {
            validateCart(cart)
        } catch (error) {
            expect(error).toBeDefined()
            const err = error as Error
            expect(err.message).toBe('Item/s not found')
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

    });
    it('should not mutate the cart array', () => {
        const cart = [{ code: 'A', quantity: 1 }]
        const cartCopy = [{ code: 'A', quantity: 1 }]
        validateCart(cart)
        expect(cart).toEqual(cartCopy)
    })
});

describe('calculateCartTotal()', () => {
    it('should return the unit price of the item when passed a cart containing one item', async () => {
        const cart = [{ code: 'A', quantity: 1 }]
        expect(await calculateCartTotal(cart)).toBe(50)
    });
    it('should return the product of unitPrice and quantity of an item when passed a cart containing multiple of one item', async () => {
        const cart = [{ code: 'A', quantity: 2 }]
        expect(await calculateCartTotal(cart)).toBe(100)
    });
    it('should return the total price of items when passed a cart containing multiple items', async () => {
        const cart = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 1 }]
        expect(await calculateCartTotal(cart)).toBe(85)
    });
    it('should incorporate special prices of items when returning the cart total', async () => {
        const cart = [{ code: 'A', quantity: 1 }, { code: 'A', quantity: 2 }]
        const cart2 = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 3 }]
        const cart3 = [{ code: 'A', quantity: 1 }, { code: 'B', quantity: 6 }]


        expect(await calculateCartTotal(cart)).toBe(140)
        expect(await calculateCartTotal(cart2)).toBe(145)
        expect(await calculateCartTotal(cart3)).toBe(230)
        expect(await calculateCartTotal(exampleCartData)).toBe(284)


    });
    it('should not mutate the cart array', async () => {
        const cart = [{ code: 'A', quantity: 1 }]
        const cartCopy = [{ code: 'A', quantity: 1 }]
        await calculateCartTotal(cart)
        expect(cart).toEqual(cartCopy)
    });
    it('should ignore zero valued quanities', async () => {
        const cart = [{ code: 'A', quantity: 0 }]
        const cart2 = [{ code: 'A', quantity: 0 }, { code: 'B', quantity: 1 }]
        expect(await calculateCartTotal(cart)).toBe(0)
        expect(await calculateCartTotal(cart2)).toBe(35)

    })
})

describe('getPricesByItemCode', () => {
    it('should return the unit price and special price for an itemCode which has a special price', async () => {
        try {
            const data = await getPricesByItemCode('A')
            const { unit_price, Offers } = data;
            expect(unit_price).toBe(50)
            expect(Offers?.price).toBe(140)
        } catch (err) {
            console.log(err)
            throw err
        }

    });

    it('should return the unit price and an undefined specialPrice for an itemCode which has no special price', async () => {
        try {
            const data = await getPricesByItemCode('C')
            const { unit_price, Offers } = data;
            expect(unit_price).toBe(25)
            expect(Offers?.price).toBe(undefined)
        } catch (err) {
            console.log(err)
            throw err
        }
    })

    it('should throw an error if queried with a non-existent itemCode', async () => {
        try {
            const data = await getPricesByItemCode('E')
        } catch (err) {
            expect(err.message).toBe('Item/s not found')
        }
    })
})