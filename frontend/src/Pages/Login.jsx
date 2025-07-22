import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setloginData({ ...loginData, [name]: value });
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      navigate("/");
    }
    setloginData({
      email: "",
      password: "",
    });
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
            <h1 className="text-center text-2xl font-bold ">Login Page</h1>

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
                value={loginData.email}
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
                value={loginData.password}
              />
            </div>

            <button
              type="submit"
              className=" mt-2 px-2 py-2 bg-yellow-600 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  text-lg cursor-pointer  font-semibold"
            >
              Login
            </button>

            <p className="text-center">
              Dont't have an account !
              <Link
                to="/signup"
                className=" link text-accent cursor-pointer ml-1"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </HomeLayout>
    </>
  );
}

export default Login;
