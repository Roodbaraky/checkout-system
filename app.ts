import express, { Application } from 'express';
import { getCartTotal } from './src/controllers/cartController.js';

const app: Application = express();
app.use(express.json());

app.post('/cart/total', getCartTotal);

const PORT: Number = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});