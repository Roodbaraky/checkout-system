import { supabase } from "../database/seed.js";

export interface CartData {
    code: string;
    quantity: number;
}

export const getPricesByItemCode = async (itemCode: string) => {
    const { data, error } = await supabase
        .from('Items')
        .select(`
            unit_price, 
            Offers (price, quantity)
            `)
        .eq('item_code', itemCode)
    if (error) {
        console.error('Error fetching prices', error)
        throw error
    } else {
        if (data) {
            if (data[0]) {
                return data[0]
            } else {
                throw new Error('Item/s not found')
            }
        } else {
            throw new Error('Invalid cart data')
        }
    }
}

export const validateCart = (cart: CartData[]) => {
    if (!Array.isArray(cart) || !cart.every((item => typeof item.code === 'string' && isNaN(Number(item.code)) && typeof item.quantity === 'number' && item.quantity >= 0 && Object.keys(item).length === 2))) {
        throw new Error('Invalid cart data');
    }
    else {
        return true
    }
}

export const calculateCartTotal = async (cart: CartData[]): Promise<number> => {
    let total = 0;
    if (!cart.length) {
        return total;
    }

    const keyObject: Record<string, number> = {};
    cart.forEach((item) => {
        if (keyObject.hasOwnProperty(item.code)) {
            keyObject[item.code] += item.quantity;
        } else {
            keyObject[item.code] = item.quantity;
        }
    });

    for (const [code, quantity] of Object.entries(keyObject)) {

        const result = await getPricesByItemCode(code);
        const specialPrice = result.Offers?.price;
        const unitPrice = result?.unit_price;
        const offerQuantity = result?.Offers?.quantity;

        if (specialPrice && offerQuantity && quantity >= offerQuantity) {
            const multiple = Math.floor(quantity / offerQuantity);
            const remainder = quantity % offerQuantity;
            total += specialPrice * multiple;
            total += unitPrice * remainder;
        } else if (unitPrice) {
            total += unitPrice * quantity;
        } else {
            throw new Error('Item not found');
        }
    }
    return total;
};
