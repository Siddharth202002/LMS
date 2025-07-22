import { model, Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    razorpay_payment_id: {
      type: String,
      required: [true, "razor_pay payment id required"],
    },
    razor_subscription_id: {
      type: String,
      requiredL: [true, "razor_pay subscription id required"],
    },
    razorpay_signature: {
      type: String,
      required: [true, "razor_pay signature id required"],
    },
  },
  {
    timestamps: true,
  }
);
const Payment = model("payment", paymentSchema);
export default Payment;
