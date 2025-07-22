import AppError from "../utils/error.util.js";
import User from "../models/userModel.js";
import { razorpay } from "../server.js";
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import userRouter from "../routes/user.router.js";

const getRazorpayApiKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API key ",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return next(new AppError("Failed to give Razorpay API key  ", 500));
  }
};
const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Invalid User Id", 400));
    }
    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    if (!subscription) {
      return next(new AppError("subscription not created", 500));
    }
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("Invalid User Id  ", 400));
    }
    const subscriptionId = user.subscription.id;
    const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    user.subscription.status = subscription.status;
    await user.save();
    res.status(200).json({
      success: true,
      message: "subscription end successfully ",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Inavlid User Id", 400));
    }

    // const subscription_id = user.subscription_id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified ,please try again ", 400));
    }
    await Payment.create({
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    });

    user.subscription.status = "Active";
    await user.save();
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;
    const subscription = await razorpay.subscriptions.all({
      count: count | 10,
    });

    const all_payments = subscription.items;
    // console.log(all_payments);
    const monthsOfAllPayments = new Array(12);
    let start = 0;

    all_payments.forEach((payment) => {
      const timeStamp = payment.created_at;

      const date = new Date(timeStamp);
      const month = date.getMonth();
      // console.log(month);

      monthsOfAllPayments[start] = month;
      start += 1;
    });

    let monthlySalaryRecord = new Array(12).fill(0);
    monthsOfAllPayments.forEach((ele) => {
      switch (ele) {
        case 0:
          monthlySalaryRecord[ele] += 1;
          break;
        case 1:
          monthlySalaryRecord[ele] += 1;
          break;
        case 2:
          monthlySalaryRecord[ele] += 1;
          break;
        case 3:
          monthlySalaryRecord[ele] += 1;
          break;
        case 4:
          monthlySalaryRecord[ele] += 1;
          break;
        case 5:
          monthlySalaryRecord[ele] += 1;
          break;
        case 6:
          monthlySalaryRecord[ele] += 1;
          break;
        case 7:
          monthlySalaryRecord[ele] += 1;
          break;
        case 8:
          monthlySalaryRecord[ele] += 1;
          break;
        case 9:
          monthlySalaryRecord[ele] += 1;
          break;
        case 10:
          monthlySalaryRecord[ele] += 1;
          break;
        case 11:
          monthlySalaryRecord[ele] += 1;
          break;
      }
    });

    const finalMonths = { ...monthlySalaryRecord };
    const keyMapping = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    for (const oldKey in keyMapping) {
      if (finalMonths.hasOwnProperty(oldKey)) {
        const newKey = keyMapping[oldKey];
        finalMonths[newKey] = finalMonths[oldKey];
        delete finalMonths[oldKey];
      }
    }

    res.status(200).json({
      success: true,
      message: "All Subscriptions",
      allPayments: subscription,
      monthlySalaryRecord,
      finalMonths,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getRazorpayApiKey,
  buySubscription,
  cancelSubscription,
  verifySubscription,
  allPayments,
};
