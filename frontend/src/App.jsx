import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/CoursePages/CourseDescription";
import CourseListPage from "./Pages/CoursePages/CourseListPage";
import CreateCourse from "./Pages/CreateCourse";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payments/Checkout";
import CheckoutFailure from "./Pages/Payments/CheckoutFailure";
import CheckoutSuccess from "./Pages/Payments/CheckoutSuccess";
import Signup from "./Pages/Signup";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CourseListPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
          <Route path="/checkout/failed" element={<CheckoutFailure />}></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
