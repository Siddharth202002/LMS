import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateUserProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleUserInput(e) {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  }

  function getImage(e) {
    const uplodedImage = e?.target?.files[0];
    if (uplodedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uplodedImage);
      fileReader.addEventListener("load", function () {
        setData({ ...data, previewImage: this.result, avatar: uplodedImage });
      });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data?.fullName || !data?.avatar) {
      toast.error("All fields are required");
    }

    if (data?.fullName.length < 5) {
      toast.error("Name is cannot be less than 5 characters");
    }

    const formdata = new FormData();
    formdata.append("fullName", data?.fullName);
    formdata.append("avatar", data?.avatar);

    await dispatch(updateUserProfile({ id: data?.userId, formData: formdata }));
    await dispatch(getUserData());
    navigate("/");
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
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center  gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]"
          >
            <h1 className="text-center text-2xl font-bold ">Edit Profile</h1>

            <label htmlFor="image_uploads" className=" cursor-pointer">
              {data.previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={data.previewImage}
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
              <label htmlFor="fullName" className=" font-semibold">
                Fullname
              </label>
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                placeholder="Enter your name..."
                className="bg-transparent px-2 py-1 border"
                onChange={handleUserInput}
                value={data.fullName}
              />
            </div>

            <button
              type="submit"
              className=" mt-2 px-2 py-2 bg-yellow-600 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  text-lg cursor-pointer  font-semibold"
            >
              Update Profile
            </button>

            <Link to="/user/profile">
              <p className=" gap-1 link text-accent flex items-center justify-center w-full font-medium cursor-pointer">
                <AiOutlineArrowLeft /> Go back to Profile
              </p>
            </Link>
          </form>
        </div>
      </HomeLayout>
    </>
  );
}

export default EditProfile;
