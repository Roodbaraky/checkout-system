import { CartData } from "../models/cart.js";
import itemsData from "../models/item.js";


export const calculateCartTotal = (cart: CartData[]): number => {
    let total = 0;
    if (!cart.length) {
        return total
    }
    cart.forEach((item) => {
        const specialPrice = itemsData[item.code]?.specialPrice;
        if (specialPrice && item.quantity / specialPrice.quantity >= 1) {
            const multiple = Math.floor(item.quantity / specialPrice.quantity);
            const remainder = item.quantity % specialPrice.quantity;
            total += specialPrice.price * multiple;
            total += itemsData[item.code]?.unitPrice * remainder;
        } else {
            total += itemsData[item.code]?.unitPrice * item.quantity;
        }
    });

    return total;


};
