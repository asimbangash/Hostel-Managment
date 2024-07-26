import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().max(30).min(6).required(),
});

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = async () => {
    let signIndata = { email, password };
    let isFormValid = await schema.isValid(signIndata);
    if (isFormValid) {
      return null;
    }

    const res = await schema.validate(signIndata).catch((err) => {
      if (err) {
        return err.message;
      }
      return null;
    });
    return res;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let ValidateError = await validate();
    if (ValidateError) {
      return setError(ValidateError);
    }

    let { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
      { email, password }
    );
    console.log(data);

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="bg-[#fdfdfd] m-10 border">
      <h1 className="flex justify-center text-3xl font-bold pt-6 pb-14">
        Sign In
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mx-10 font-serif text-xl">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mx-10 font-serif text-xl">
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="w-full mt-10 p-5  pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center font-serif text-2xl my-8">
          <button type="button" className="text-[#2991DC]">
            Forgot Password?
          </button>
        </div>
        <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center">
          <button type="submit" className="font-serif text-2xl">
            Login
          </button>
        </div>
        <div className="font-serif flex justify-center  text-2xl">
          <h1 className="my-10">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#2991DC]">
              Register
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Signin;
