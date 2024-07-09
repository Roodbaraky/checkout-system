export interface CartData {
    code: string;
    quantity: number;
}

export const validateCart = (cart: CartData[]) => {
    if (!Array.isArray(cart) || !cart.every((item => typeof item.code === 'string' && isNaN(Number(item.code)) && typeof item.quantity === 'number' && Object.keys(item).length === 2))) {
        throw new Error('Invalid cart data');
    }
    else {
        return true
    }

}