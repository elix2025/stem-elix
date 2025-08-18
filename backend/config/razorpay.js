import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

export const razorpayinstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
//   headers: {
//     "X-Razorpay-Account": "<merchant_account_id>"
//   }
});

razorpayinstance.orders.all().then(console.log).catch(console.error);