import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value });
  }

  function getImage(e) {
    e.preventDefault();
    // getting the image
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setSignupData({
        ...signupData,
        avatar: uploadImage,
      });
      const reader = new FileReader();
      reader.readAsDataURL(uploadImage);
      console.log(reader);

      reader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullname ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    // checking full name

    if (!signupData.fullname.length > 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // checking valid email
    if (!isValidEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }

    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullname", signupData.fullname);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      navigate("/");
    }
    setSignupData({
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <>
      <HomeLayout>
        <div
          className=" signup flex flex-col items-center justify-center
        h-[90vh]"
        >
          <form
            noValidate
            onSubmit={createNewAccount}
            className="flex flex-col justify-center  items-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-bold ">
              Registration Page
            </h1>

            <label htmlFor="image_uploads" className=" cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                  alt=""
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              className="hidden"
              name="image_uploads"
              id="image_uploads"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={getImage}
            />
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="fullname" className=" font-semibold">
                Fullname
              </label>
              <input
                type="fullname"
                required
                name="fullname"
                id="fullname"
                placeholder="Enter your name..."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.fullname}
              />
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="email" className=" font-semibold">
                Email
              </label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email..."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.email}
              />
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="password" className=" font-semibold">
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password..."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={signupData.password}
              />
            </div>

            <button
              type="submit"
              className=" mt-2 px-2 py-2 bg-yellow-600 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  text-lg cursor-pointer  font-semibold"
            >
              Create account
            </button>

            <p className="text-center">
              Already have an account?
              <Link to="/login" className=" link text-accent cursor-pointer">
                Login
              </Link>
            </p>
          </form>
        </div>
      </HomeLayout>
    </>
  );
}

export default Signup;
