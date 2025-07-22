import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecored: [],
};

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const res = await axiosInstance.get("/payments/razorpay_key");
    return res.data;
  } catch {
    toast.error("Failed to load data");
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      return res.data;
    } catch (e) {
      toast.error(e?.res?.data?.message);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      console.log(data);

      const res = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return res.data;
    } catch (e) {
      toast.error(e?.res?.data?.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const res = await axiosInstance.get("/payments?count=100");
      toast.promise(res, {
        loading: "Getting the payments of records",
        success: (data) => data?.data?.message,
        error: "Failed to get payment records",
      });
      return (await res).data;
    } catch {
      toast.error("Operation Failed");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const res = axiosInstance.post("/payments/unsubscribe");
      toast.promise(res, {
        loading: "Unsubscribing the bundle",
        success: (data) => data?.data?.message,
        error: "Failed to unsubscribe",
      });
      return (await res).data;
    } catch {
      toast.error("Operation Failed");
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription?.id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);

        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecored = action?.payload?.monthlySalesRecored;
      });
  },
});

export default razorpaySlice.reducer;
