import dotenv from 'dotenv';
import express from 'express';
import { getCartTotal } from './src/controllers/cartController.js';
import { errorHandler } from './src/utils/utils.js';
dotenv.config();
export const app = express();
app.use(express.json());
app.post('/cart/total', getCartTotal);
app.all('*', errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
