import { Request, Response } from 'express';
import { calculateCartTotal, returnCartTotal } from '../models/cart.js';
import { CartData, validateCart } from '../models/cart.js';

export const getCartTotal = (req: Request, res: Response): void => {
    const cart: CartData[] = req.body;
    try {
        if (validateCart(cart)) {
            const total = returnCartTotal(cart);
            res.status(200).send({ total });
        }
    } catch (error) {
        const err = error as Error
        if (err?.message === 'Invalid cart data') {
            res.status(400).send({ error: err.message });
        }
        else if (err?.message === 'Item/s not found') {
            res.status(404).send({ error: err.message })
        }
        else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
};
