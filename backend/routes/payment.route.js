import { Router } from "express";
import {
  isloogedIn,
  autorizeRoles,
  authorizeSubscriber,
} from "../middleWare/auth.middleware.js";
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from "../controllers/payment.controller.js";
const paymentRouter = Router();
paymentRouter.route("/razorpay_key").get(isloogedIn, getRazorpayApiKey);

paymentRouter.route("/subscribe").post(isloogedIn, buySubscription);

paymentRouter.route("/verify").post(isloogedIn, verifySubscription);

paymentRouter
  .route("/unsubscribe")
  .post(isloogedIn, authorizeSubscriber, cancelSubscription);

paymentRouter.route("/").get(isloogedIn, autorizeRoles("ADMIN"), allPayments);

export default paymentRouter;
