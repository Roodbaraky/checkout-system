interface SpecialPrice {
    quantity: number;
    price: number;
  }
  
  interface PricingData {
    unitPrice: number;
    specialPrice?: SpecialPrice;
  }
  
  const pricingData= require('./pricingData.json') as Record<string, PricingData> 
  export default pricingData;
  