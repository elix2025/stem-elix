 import express from 'express';
import {
createOrder,
verifyPayment
} from '../controllers/orderController.js';


const paymentRouter = express.Router()

paymentRouter.post("/create", createOrder)
paymentRouter.post("/verify", verifyPayment)


 export default paymentRouter;