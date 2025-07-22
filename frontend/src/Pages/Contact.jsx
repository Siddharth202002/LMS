import React, { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isValidEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function inputHandler(e) {
    const { value, name } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(event) {
    event.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("Required All Fields");
      return;
    }

    if (!isValidEmail(userInput.email)) {
      toast.error("Email is not valid");
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "failed to submit the form",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error("opertion failed...", err);
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className=" flex flex-col items-center justify-center gap-2 rounded-md text-white
        shadow-[0_0_10px_black] w-[22rem] p-3"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={inputHandler}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={inputHandler}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm h-40 resize-none"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={inputHandler}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 w-full hover:bg-yellow-500 ease-in-out duration-300 cursor-pointer font-semibold text-lg py-1"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
