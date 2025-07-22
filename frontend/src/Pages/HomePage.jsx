import React from "react";
import { Link } from "react-router-dom";

import HomePageImage from "../assets/Images/HomePageImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className=" main-secxtion pt-10 text-white  flex  items-center justify-center gap-50 mx-16 h-[90vh] ">
        <div className=" Left-Section w-1/2  space-y-6">
          <h1 className="text-5xl font-semibold ">
            Find out best
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordabel cost.
          </p>
          <div className="space-x-6">
            <Link to="/courses">
              <button
                className=" bg-yellow-500 px-5  py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 
              transition-all ease-in-out duration-300 "
              >
                Explore courses
              </button>
            </Link>

            <Link to="/contact">
              <button
                className=" border border-yellow-500 px-5  py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 
              transition-all ease-in-out duration-300 "
              >
                Explore courses
              </button>
            </Link>
          </div>
        </div>

        <div className=" Right-Section w-1/2 items-center justify-center">
          <img
            src={HomePageImage}
            alt="homepage image "
            className="h-[500px] "
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
