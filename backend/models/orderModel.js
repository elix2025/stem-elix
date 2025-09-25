// models/PaymentModel.js
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const paymentSchema = new mongoose.Schema(
  {
     orderId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModel",
      required: true,
      index: true,
    },
  
    // paymentId: {
    //   type: String,
    //   index: true,
    // },
    // signature: { type: String },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR"],
    },

    gpayTransactionId: {
      type: String,
    },

    paymentScreenshot: {
      data: Buffer,
      contentType: String,
      originalName: String
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },

    // Payment gateway data
    // razorpayOrderData: {
    //   type: mongoose.Schema.Types.Mixed, // Store complete Razorpay order response
    // },
    // paymentId: { type: String, index: true },
    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    paidAt: { type: Date },
    // cancelledAt: { type: Date },
    // refundedAt: { type: Date },

    verifiedAt: { type: Date },   

    // Additional fields
    failureReason: { type: String },
    // refundId: { type: String },
    // refundAmount: { type: Number },
    notes: {
      type: Map,
      of: String,
    },

    // Discount and coupon support
    originalAmount: { type: Number },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String },

    // Tracking
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true, // This will automatically manage createdAt and updatedAt
  }
);

// Indexes for better performance
paymentSchema.index({ user: 1, status: 1 });
paymentSchema.index({ course: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ orderId: 1, status: 1 });

// Virtual for total amount after discount
paymentSchema.virtual("finalAmount").get(function () {
  return this.amount - (this.discountAmount || 0);
});

// Virtual for payment age
paymentSchema.virtual("paymentAge").get(function () {
  if (!this.paidAt) return null;
  return Math.floor(
    (Date.now() - this.paidAt.getTime()) / (1000 * 60 * 60 * 24)
  ); // Days
});

// Static methods
paymentSchema.statics.getOrderStats = async function () {
  return this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
};

paymentSchema.statics.getRevenueByPeriod = async function (startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        status: "paid",
        paidAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$paidAt" },
          month: { $month: "$paidAt" },
          day: { $dayOfMonth: "$paidAt" },
        },
        revenue: { $sum: "$amount" },
        orderCount: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
    },
  ]);
};

// Instance methods
// paymentSchema.methods.markAsPaid = function (paymentId, signature) {
//   this.status = "paid";
//   this.paymentId = paymentId;
//   // this.signature = signature;
//   this.paidAt = new Date();
//   this.updatedAt = new Date();
//   this.verifiedAt = new Date();
//   return this.save();
// };

paymentSchema.methods.markAsVerified = function (gpayTransactionId) {
  this.status = "verified";
  this.gpayTransactionId = gpayTransactionId;
  this.verifiedAt = new Date();
  this.updatedAt = new Date();
  return this.save();
};
paymentSchema.methods.markAsFailed = function (reason) {
  this.status = "failed";
  this.failureReason = reason;
  this.updatedAt = new Date();
  return this.save();
};

paymentSchema.methods.cancel = function (reason) {
  if (this.status !== "created") {
    throw new Error("Only pending orders can be cancelled");
  }
  this.status = "cancelled";
  this.cancelledAt = new Date();
  this.updatedAt = new Date();
  if (reason) this.failureReason = reason;
  return this.save();
};

// Pre-save middleware
paymentSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = "ORDER-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
  }
  // this.updatedAt = new Date();
  next();
});

// Post-save middleware for logging
paymentSchema.post("save", function (doc) {
  console.log(`Payment ${doc.orderId} status updated to: ${doc.status}`);
});

// Add pagination plugin
paymentSchema.plugin(mongoosePaginate);

// Ensure virtual fields are included in JSON output
paymentSchema.set("toJSON", { virtuals: true });
paymentSchema.set("toObject", { virtuals: true });

export default mongoose.model("Payment", paymentSchema);
