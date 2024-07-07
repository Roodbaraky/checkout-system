import pricingData from '../data/pricingData.json'
interface SpecialPrice {
    quantity: number;
    price: number;
}

export interface ItemData {
    unitPrice: number;
    specialPrice?: SpecialPrice;
}
const items: Record<string, ItemData> = pricingData

export default items;