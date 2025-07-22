import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createNewCourse } from "../Redux/Slices/CourseSlice";

function CreateCourse() {
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadFile = e.target.files[0];
    if (uploadFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadFile);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadFile,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.description ||
      !userInput.thumbnail ||
      !userInput.category ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandotary");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        ...userInput,
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
    }
    navigate("/courses");
  }

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5  rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black]  relative"
        >
          <Link className=" absolute top-8 text-2xl  link cursor-pointer text-accent">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_upload" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="user image"
                    />
                  ) : (
                    <div className="flex items-center justify-center border w-full h-44 m-auto">
                      <h1 className="font-bold text-lg ">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  className=" hidden"
                  id="image_upload"
                  accept=".jpg ,.jpeg, .png,.webp"
                  name="image_upload"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput?.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center ">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter Course Instrutor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput?.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter Course Category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput?.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Course description"
                  className="bg-transparent px-2 py-1 border resize-none h-24 w-full overflow-scroll"
                  value={userInput?.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full py-2 px-1 text-lg font-semibold rounded-sm"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
