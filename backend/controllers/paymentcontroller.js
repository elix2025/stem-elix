import Payment from "../models/orderModel.js";
import User from "../models/User.js";
import Course from "../models/CourseModel.js";
import connectCloudinary from "../config/cloudinary.js";
import {v2 as cloudinary} from "cloudinary";


// 1️⃣ Create a new payment (user uploads screenshot)
export const createPayment = async (req, res) => {
  try {
    const { userId, courseId, amount } = req.body;
    const reciept = req.file;

    if (!userId || !courseId || !amount || !reciept ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user & course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) 
      return res.status(404).json({ message: "User or course not found." });

    const recieptUpload = await new (() => {
      const stream = cloudinary.uploader.upload_stream({
        resource_type: "image",
        folder: "payment_proofs",
        transformation: [],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(reciept.buffer);
    });
    

    // Create payment record
    const newpayment = new Payment({
      user: userId,
      course: courseId,
      amount,
      reciept: recieptUpload.secure_url,
      status: "pending",
    });

    const savedpayent = await newpayment.save();
    console.log(`Payment Done Sucessfully:`);

    res.status(201).json({
      sucess: true,
      message:
        "Payment submitted successfully. Your enrollment will be completed once verified by us.",
       newpayment:{},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// get the user , course and screenshot of the payment done by user
export const getPayment = async (req, res) => {
 try{

  const {id} = req.params;
 }catch(error){

 }
};

// 2️⃣ Admin verifies a payment
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, gpayTransactionId } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    payment.status = "verified";
    payment.gpayTransactionId = gpayTransactionId;
    payment.verifiedAt = new Date();

    await payment.save();

    // Enroll user manually after verification
    const user = await User.findById(payment.user);
    if (!user.coursesEnrolled.some(c => c.course.toString() === payment.course.toString())) {
      user.coursesEnrolled.push({ course: payment.course, status: "in-progress" });
      user.totalCoursesEnrolled = user.coursesEnrolled.length;
      await user.save();
    }

    res.status(200).json({
      message: "Payment verified and user enrolled successfully.",
      payment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// 3️⃣ Admin rejects a payment
export const rejectPayment = async (req, res) => {
  try {
    const { paymentId, reason } = req.body;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    payment.status = "rejected";
    payment.failureReason = reason;
    await payment.save();

    res.status(200).json({ message: "Payment rejected.", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// 4️⃣ Get all payments (optional: admin view)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
