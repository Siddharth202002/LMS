import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className=" grid grid-cols-2 gap-10 py-10 relative ">
          <div className="space-y-5 ">
            <img
              src={state?.thumbnail?.secure_url}
              alt="course image"
              className="w-full h-64"
            />

            <div space-y-4>
              <div className="flex flex-col justify-center  gap-2">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Total lectures :{" "}
                  </span>
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{" "}
                  </span>
                  {state?.createdBy}
                </p>

                {role === "Admin" || data?.subsciption?.status === "Active" ? (
                  <button className="border border-white bg-yellow-600 rounded-lg  py-3 w-1/2 px-5  mt-2 hover:bg-amber-500 ease-in-out duration-300  font-semibold text-xl ">
                    {" "}
                    Watch lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="border border-white bg-yellow-600 rounded-lg   py-2   mt-2 hover:bg-amber-500 ease-in-out duration-300  font-semibold text-xl w-1/2  "
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className="text-yellow-500">course description:</p>
            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
