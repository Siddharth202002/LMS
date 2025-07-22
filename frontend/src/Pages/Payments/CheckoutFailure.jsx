import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
  return (
    <HomeLayout>
      <div
        className="  flex flex-col items-center justify-center
        h-[90vh] "
      >
        <div className=" relative flex flex-col justify-center  items-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black] h-[26rem]">
          <h1 className="text-center text-2xl font-bold absolute top-0 bg-red-500 w-full rounded-tl-lg rounded-tr-lg py-3">
            Payment failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                {" "}
                Oops! Your payment failed
              </h2>

              <p className="text-left">Please try again later</p>
            </div>
            <RxCrossCircled className="text-red-500 text-5xl" />
          </div>

          <Link
            to="/checkout"
            className=" absolute bottom-0 w-full bg-red-500 hover:bg-red-400 text-center font-bold text-xl py-2 rounded-br-lg rounded-bl-lg transition-all ease-in-out duration-300"
          >
            <button> Try again</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailure;
