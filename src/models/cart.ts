import cartData from '../data/cartData.json'
interface CartData {
    code: string;
    quantity: number;
}

const cart: CartData[] = cartData 