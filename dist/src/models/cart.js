import itemsData from "../models/item.js";
export const validateCart = (cart) => {
    if (!Array.isArray(cart) || !cart.every((item => typeof item.code === 'string' && isNaN(Number(item.code)) && typeof item.quantity === 'number' && Object.keys(item).length === 2))) {
        throw new Error('Invalid cart data');
    }
    else {
        return true;
    }
};
export const calculateCartTotal = (cart) => {
    let total = 0;
    if (!cart.length) {
        return total;
    }
    cart.forEach((item) => {
        const specialPrice = itemsData[item.code]?.specialPrice;
        const unitPrice = itemsData[item.code]?.unitPrice;
        if (specialPrice && item.quantity / specialPrice.quantity >= 1) {
            const multiple = Math.floor(item.quantity / specialPrice.quantity);
            const remainder = item.quantity % specialPrice.quantity;
            total += specialPrice.price * multiple;
            total += itemsData[item.code]?.unitPrice * remainder;
        }
        else if (unitPrice) {
            total += itemsData[item.code]?.unitPrice * item.quantity;
        }
        else {
            throw Error('Item/s not found');
        }
    });
    return total;
};
