import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const [email, setEmail] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/pass/resetpassword`,
      email
    );
    toast.info(res.data.message);
    setEmail("");
  };

  const handleChange = (e) => {
    setEmail((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
   <div className="flex items-center justify-center mt-10 w-fit border-1 border-gray-200 rounded-lg  m-auto">
  <div className="flex flex-col items-center justify-center w-auto h-96 border-2 border-gray-200 rounded-lg">
    <div className="px-10 py-6 text-center">
      <h1 className="flex text-xl font-bold pt-6">
        Forgotten Password
      </h1>
      <br />
      <p className="text-sm font-medium text-gray-900">
        Please enter your email to reset your password
      </p>
    </div>
    <form onSubmit={handleSubmit} className="w-full px-10">
      <div className="font-serif text-xl mb-5">
        <label className="block text-sm font-bold leading-6 text-gray-900 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="atifshinwari@gmail.com"
          onChange={handleChange}
          className="w-full mt-1 p-5 h-12 tracking-wide pr-10 text-sm font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg focus:outline-blue-600"
        />
      </div>
      <div className="w-full p-5 h-14 tracking-wide text-sm font-light leading-6 bg-blue-600 hover:bg-blue-800 rounded-md text-white flex justify-center mb-10">
        <button className="font-serif text-lg w-full leading-6">Send Reset Link</button>
      </div>
      <div className="text-center font-serif text-xl my-8">
        <button className="text-[#2991DC]">Forgot Password?</button>
      </div>
    </form>
  </div>
</div>

  );
};

export default ForgotPass;
