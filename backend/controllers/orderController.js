import { razorpayinstance } from "../config/razorpay.js";
import crypto from "crypto";
import Course from "../models/CourseModel.js";
import User from "../models/User.js";
import Payment from "../models/orderModel.js";

export const createOrder = async (req, res) => {
try{
    const {courseId, userId}  = req.body;
    const course = await Course.findById(courseId)
    if(!course){
        return res.status(404).json({message:"Course is not found"})
    }
    // const {amount, currency = "INR", receipt} = req.body;
     
    const options = {
        amount: course.price * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now}`,

    };

    const order = await razorpayinstance.orders.create(options);

    await Payment.create({
     user: userId,
     course: courseId,
     orderId: order.id,
     amount: course.price,
     status: "created"
    });
    res.status(200).json({success:true,
        order,
        courseId: course._id,
        userId,
        amount: course.price,
    });
    
} catch (err){
   console.error(err);
   res.status(500).json({message: "Error creating Razorpay order", error:err.message})
}
}; 

export const verifyPayment = async (req, res) => {
    try{
        const {courseId , userId, razorpay_order_id,
            razorpay_payment_id,
             razorpay_signature,
        } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

        // Update payment record
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "paid", paymentId: razorpay_payment_id, signature: razorpay_signature }
    );

    // enroll user in course 

    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "User not found"});

       // Prevent duplicate enrollment
    if (user.coursesEnrolled.some((c) => c.course.toString() === courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    user.coursesEnrolled.push({ course: courseId, status:"in-progress"});
    user.totalCoursesEnrolled = user.coursesEnrolled.length;
    await user.save();

   // Update Course enrolledStudents 
    const course = await Course.findById(courseId);
    if (course && !course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

        res.status(200).json({
      success: true,
      message: "Payment verified and course enrolled successfully!",
      user,
    });
      
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:`Internal server error during payment ${error} `,});

    }
}