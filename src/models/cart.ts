import itemsData from "../models/item.js";

export interface CartData {
    code: string;
    quantity: number;
}

export const validateCart = (cart: CartData[]) => {
    if (!Array.isArray(cart) || !cart.every((item => typeof item.code === 'string' && isNaN(Number(item.code)) && typeof item.quantity === 'number' && item.quantity >= 0 && Object.keys(item).length === 2))) {
        throw new Error('Invalid cart data');
    }
    else {
        return true
    }
}

export const calculateCartTotal = (cart: CartData[]): number => {
    let total = 0;
    if (!cart.length) {
        return total
    }
    //Iterate through cart array
    //Count instances of each item code
    //Sum quantities if item code === item code
    interface keyObject {
        [key: string]: number
        
    }
    const keyObject: keyObject = {}
    cart.forEach((item) => {
        if (keyObject.hasOwnProperty(item.code)) {
            keyObject[item.code] += item.quantity
        }
        else{
            keyObject[item.code]=item.quantity
        }
    })
    

    Object.entries(keyObject).forEach((item) => {
        const specialPrice = itemsData[item[0]]?.specialPrice;
        const unitPrice = itemsData[item[0]]?.unitPrice;
        if (specialPrice && item[1] / specialPrice.quantity >= 1) {
            const multiple = Math.floor(item[1] / specialPrice.quantity);
            const remainder = item[1] % specialPrice.quantity;
            total += specialPrice.price * multiple;
            total += itemsData[item[0]]?.unitPrice * remainder;
        } else if (unitPrice) {
            total += itemsData[item[0]]?.unitPrice * item[1];

        } else {
            throw Error('Item/s not found')
        }
    });
    return total;
};