import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import razorpaySliceReducer from "./Slices/razorpaySlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    courses: courseSliceReducer,
    razorpay: razorpaySliceReducer,
  },
  devTools: true,
});

export default store;
