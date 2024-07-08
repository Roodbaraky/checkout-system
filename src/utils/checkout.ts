import { CartData } from "../models/cart";
import itemsData from "../models/item";


export const calculateCartTotal = (cartItems: CartData[]): number => {
    if (!Array.isArray(cartItems) || !cartItems.every((item => typeof item.code === 'string' && typeof item.quantity === 'number' && Object.keys(item).length === 2))) {
        throw new Error('Invalid cart data');
    }

    let total = 0;
    cartItems.forEach((item) => {
        const specialPrice = itemsData[item.code].specialPrice;
        if (specialPrice && item.quantity / specialPrice.quantity >= 1) {
            const multiple = Math.floor(item.quantity / specialPrice.quantity);
            const remainder = item.quantity % specialPrice.quantity;
            total += specialPrice.price * multiple;
            total += itemsData[item.code].unitPrice * remainder;
        } else {
            total += itemsData[item.code].unitPrice * item.quantity;
        }
    });
    return total;
};
