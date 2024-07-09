import pricingData from '../data/pricingData.json' with {type:"json"}
interface SpecialPrice {
    quantity: number;
    price: number;
}

export interface ItemData {
    unitPrice: number;
    specialPrice?: SpecialPrice;
}
const itemsData: Record<string, ItemData> = pricingData

export default itemsData;