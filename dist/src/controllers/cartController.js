import { calculateCartTotal, validateCart } from '../models/cart.js';
export const getCartTotal = (req, res) => {
    const cart = req.body;
    try {
        if (validateCart(cart)) {
            const total = calculateCartTotal(cart);
            res.status(200).send({ total });
        }
    }
    catch (error) {
        const err = error;
        if (err?.message === 'Invalid cart data') {
            res.status(400).send({ error: err.message });
        }
        else if (err?.message === 'Item/s not found') {
            res.status(404).send({ error: err.message });
        }
        else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
};
