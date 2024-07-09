import express, { Application } from 'express';
import { getCartTotal } from './src/controllers/cartController.js';
import dotenv from 'dotenv'
dotenv.config()
const app: Application = express();
app.use(express.json());

app.post('/cart/total', getCartTotal);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});