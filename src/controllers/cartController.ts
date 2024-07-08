import { Request, Response } from 'express';
import { calculateCartTotal } from '../utils/checkout';
import { CartData } from '../models/cart';

export const getCartTotal = (req: Request, res: Response): void => {
    const cartItems: CartData[] = req.body.cart;
    try {
        const total = calculateCartTotal(cartItems);
        res.status(200).send({ total });
    } catch (error) {
        const err = error as Error
        if (err?.message === 'Invalid cart data') {
            res.status(400).send({ error: 'Invalid cart data' });
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
};
