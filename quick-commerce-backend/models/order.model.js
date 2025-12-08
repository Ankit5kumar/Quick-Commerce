import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Placed", "Processing", "Out for Delivery", "Delivered"],
      default: "Placed",
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
