import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccess() {
  const dispatch = useDispatch();
  async function update() {
    await dispatch(getUserData());
  }

  useEffect(() => {
    update();
  }, []);
  return (
    <HomeLayout>
      <div
        className="  flex flex-col items-center justify-center
        h-[90vh] "
      >
        <div className=" relative flex flex-col justify-center  items-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black] h-[26rem]">
          <h1 className="text-center text-2xl font-bold absolute top-0 bg-green-500 w-full rounded-tl-lg rounded-tr-lg py-3">
            Payment Successful
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                Welcome to the pro bundle
              </h2>

              <p className="text-left">Now you can enjoy all the courses.</p>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className=" absolute bottom-0 w-full bg-green-500 hover:bg-green-400 text-center font-bold text-xl py-2 rounded-br-lg rounded-bl-lg transition-all ease-in-out duration-300"
          >
            <button> Go to dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
