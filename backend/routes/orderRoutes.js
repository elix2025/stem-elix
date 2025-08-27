 import express from 'express';
import {
createOrder,
verifyPayment
} from '../controllers/orderController.js';


const orderRouter = express.Router()

orderRouter.post('/create', createOrder)
orderRouter.post('/verify', verifyPayment)


 export default orderRouter;