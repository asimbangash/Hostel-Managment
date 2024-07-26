import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useGlobalRegisterContext } from "../store/context/register-context";
import * as yup from "yup";
import { useGlobalAuthContext } from "../store/context/auth-context";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"; // Import Google OAuth components
import { useGoogleLogin } from "@react-oauth/google";
import { m } from "./Magic-Client";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().max(30).min(6).required(),
});

let SignInschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().max(30).min(6).required(),
});

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const CreatePassPage = () => {
  const { continueWithEmail, setContinueWithEmail, signup, setSignUp } =
    useGlobalRegisterContext();

  const { setIsAuthenticated } = useGlobalAuthContext();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleBackbtn() {
    setContinueWithEmail(false);
    setSignUp(false);
  }

  function handleEmailchange(e) {
    setEmail(e.target.value);
  }

  function handleSignUpFormData(e) {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const responseGoogle = useGoogleLogin({
    onSuccess: async (code) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/google`,
          {
            code,
          }
        );
        if (data.success) {
          localStorage.setItem("accesstoken", data.accessToken);
          localStorage.setItem("refreshtoken", data.refreshToken);
          localStorage.setItem("role", data.role);
          localStorage.setItem("email", data.email);

          setIsAuthenticated(true);

          axios.interceptors.request.use(
            (config) => {
              config.headers.authorization = `Bearer ${data.accessToken}`;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );

          navigate("/");
        }
      } catch (error) {
        toast.info(error.message);
      }
    },
  });

  const onFailureGoogle = (error) => {
    toast.info(error.message);
    // Handle failure/error in Google sign-in
  };

  const validate = async () => {
    let { name, email, password } = signupData;
    let isFormValid = await schema.isValid({ name, email, password });
    if (isFormValid) {
      return null;
    }

    const res = await schema
      .validate({ name, email, password })
      .catch((err) => {
        if (err) {
          toast.info(err.message);
        }
        return null;
      });
    return res;
  };

  async function handleSignupFormSubmit(e) {
    e.preventDefault();

    let { name, password, confirmPassword, email } = signupData;

    if (password !== confirmPassword) {
      setError("Password did not match");
      toast("Password did not match");
      return;
    }

    let dataobj = {
      name: name,
      email: email,
      password: password,
    };

    const ValidateError = await validate();
    if (ValidateError) {
      setError(ValidateError);
      toast("Invalid input field");
      return;
    }

    const didToken = await m.auth.loginWithMagicLink({
      email: email,
    });

    console.log(didToken);

    if (didToken) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
          dataobj
        );

        if (data.success) {
          localStorage.setItem("accesstoken", data.accessToken);
          localStorage.setItem("refreshtoken", data.refreshToken);
          localStorage.setItem("role", data.role);
          localStorage.setItem("email", email);

          setIsAuthenticated(true);

          axios.interceptors.request.use(
            (config) => {
              config.headers.authorization = `Bearer ${data.accessToken}`;
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
          navigate("/");
        }
      } catch (error) {
        console.log("Error during signup:", error);
        toast.error(error.response.data);
      }
    }
  }

  const SignInValidate = async () => {
    let signIndata = { email, password };
    let isFormValid = await SignInschema.isValid(signIndata);
    if (isFormValid) {
      return null;
    }

    const res = await SignInschema.validate(signIndata).catch((err) => {
      if (err) {
        toast.info(err.message);
      }
      return null;
    });
    return res;
  };

  async function handleSignInSubmit(e) {
    e.preventDefault();

    let ValidateError = await SignInValidate();
    if (ValidateError) {
      setError(ValidateError);
      toast(error);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
        { email, password }
      );

      if (data.success) {
        localStorage.setItem("accesstoken", data.accessToken);
        localStorage.setItem("refreshtoken", data.refreshToken);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email);

        setIsAuthenticated(true);

        axios.interceptors.request.use(
          (config) => {
            config.headers.authorization = `Bearer ${data.accessToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  function handleContinueWithEmail() {
    if (!isEmail(email)) {
      toast.error("Invalid Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setContinueWithEmail(!continueWithEmail);
  }

  return (
    <div className=" flex items-center justify-center mt-10 w-fit border-2 border-gray-200 rounded-lg  m-auto">
      {!continueWithEmail && !signup && (
        <div>
          <div className="mx-10">
            <h1 className="flex text-lg  pt-6 text-md font-bold leading-6 text-gray-900 ">
              Sign in or create an account
            </h1>
          </div>
          <form>
            <div className="mx-10 font-serif text-xl mt-5 ">
              <label className="id flex text-sm  text-md font-bold leading-6 text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailchange}
                placeholder="Email"
                required={true}
                className="w-96 mt-1 p-5 h-14 tracking-wide pr-10 text-sm  text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className=" bg-blue-600 hover:bg-blue-800 mx-10 p-5 rounded-md text-white flex justify-center mt-5">
              <button
                className="font-serif text-lg  w-full leading-6 "
                onClick={handleContinueWithEmail}
              >
                Continue with email
              </button>
            </div>
            <div className=" bg-blue-600 hover:bg-blue-800  mx-10 p-5 rounded-md text-white flex justify-center mt-5  ">
              <button
                onClick={() => {
                  responseGoogle();
                }}
                className="font-serif text-lg  w-full leading-6 "
              >
                Login with Google
              </button>
            </div>
            <div className=" bg-blue-600 hover:bg-blue-800 mx-10 p-5 rounded-md text-white flex justify-center mb-10 mt-5">
              <button
                className="font-serif text-lg  w-full leading-6"
                onClick={() => setSignUp(!signup)}
              >
                Sign UP
              </button>
            </div>
            {/* <div className="font-serif flex justify-center  text-1xl">
              <h1 className="my-10 w-[986px]">
                &nbsp; &nbsp; &nbsp; By signing in or creating an account, you
                agree with our Terms & conditions and Privacy statement
              </h1>
            </div> */}
          </form>
        </div>
      )}
      {continueWithEmail && !signup && (
        <div className="border-1 border-gray-200 h-auto rounded-lg w-auto ">
          <div className="mx-10">
            <div className="mt-3 flex align-middle items-center gap-2">
              <FaArrowLeft onClick={handleBackbtn} className="cursor-pointer" />
              <p>Back</p>
            </div>
            <h1 className="flex text-xl font-bold pt-6">Enter Your Password</h1>
          </div>
          <div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label className="id flex text-sm  text-md font-bold leading-6 text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-96 mt-1 p-5 h-14 tracking-wide pr-10 text-sm  text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className="w-96 p-5 h-14 tracking-wide pr-10 text-sm  text-md font-light leading-6 bg-blue-600 hover:bg-blue-800 mx-10  rounded-md text-white flex justify-center mb-10 mt-8">
              <button
                onClick={(e) => handleSignInSubmit(e)}
                className="font-serif text-lg  w-full leading-6"
              >
                Sign in
              </button>
            </div>
            <div className=" ml-36 justify-start font-serif text-xl my-8">
              <a
                href="http://localhost:8080/ForgotPass"
                className="text-[#2991DC]"
              >
                Forgot Password?
              </a>
            </div>
            {/* <div className="w-4/5 m-auto h-[1px] bg-black"></div> */}
            {/* <div className="font-serif flex justify-center  text-1xl ">
              <h1 className="my-10 w-[986px]">
                By signing in or creating an account, you agree with our Terms &
                conditions and Privacy statement
              </h1>
            </div> */}
          </div>
        </div>
      )}
      {signup && !continueWithEmail && (
        <div className="border-1 border-gray-200 h-auto  rounded-lg w-auto ">
          <div className="mx-10">
            <div className="mt-3 flex align-middle items-center gap-2">
              <FaArrowLeft onClick={handleBackbtn} className="cursor-pointer" />
              <p>Back</p>
            </div>
            <h1 className="flex text-xl font-bold pt-6">Create New Account</h1>{" "}
            {/* <p className="block font-serif  text-sm font-medium leading-6 text-gray-900 mt-1">
              Use a minimum of 6 characters, including <br />uppercase letters,
              lowercase letter and numbers
            </p> */}
          </div>
          <form onSubmit={handleSignupFormSubmit}>
            <div className="mx-10 font-serif text-xl mt-5">
              <label className="id flex text-sm  text-md font-bold leading-6 text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={signupData.name}
                required={true}
                onChange={handleSignUpFormData}
                placeholder="Full-Name"
                className="w-96 mt-1 p-5 h-12 tracking-wide pr-10 text-sm   text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label className="flex text-sm  text-md font-bold leading-6 text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                required={true}
                value={signupData.email}
                onChange={handleSignUpFormData}
                placeholder="Enter Your Email"
                className="w-96 mt-1 p-5 h-12 tracking-wide pr-10 text-sm  text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label className="id flex text-sm  text-md font-bold leading-6 text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                required={true}
                value={signupData.password}
                onChange={handleSignUpFormData}
                placeholder="Enter Your Password"
                className="w-96 mt-1 p-5 h-12 tracking-wide pr-10 text-sm  text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className="mx-10 font-serif text-xl mt-5">
              <label className="flex text-sm  text-md font-bold leading-6 text-gray-900">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignUpFormData}
                required={true}
                placeholder="Confirm Your Password"
                className="w-96 mt-1 p-5 h-12 tracking-wide pr-10 text-sm  text-md font-light leading-6 text-gray-900 border border-gray-400 focus:outline-offset-0 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div className="w-96  h-12 tracking-wide pr-10 text-sm  text-md font-light leading-6 bg-blue-600 hover:bg-blue-800 mx-10  rounded-md  flex justify-center mb-10 mt-8">
              <button
                className=" font-serif text-md text-white w-full leading-6 "
                type="submit"
              >
                Create Account
              </button>
            </div>
            <div className="font-serif flex justify-center  text-sm ">
              {/* <h1 className="my-10 w-[986px]">
                By signing in or creating an account, you agree with our Terms &
                conditions and Privacy statement
              </h1> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePassPage;
