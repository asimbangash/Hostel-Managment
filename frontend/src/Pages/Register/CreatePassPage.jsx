import React from "react";
import { Link } from "react-router-dom";

const CreatePassPage = () => {

    return (
        <div className="bg-[#fdfdfd] m-10 border">
            <div className="mx-10">
                <h1 className="flex text-3xl font-bold pt-6">
                    Create Password
                </h1>
                <p className="w-[740px]">Use a minimum of 8 characters, including uppercase letters, lowercase letter and numbers</p>
            </div>
            <form>
                <div className="mx-10 font-serif text-xl mt-5">
                    <label>Password</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Password"
                        className="w-full mt-1 p-5 pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mx-10 font-serif text-xl mt-5">
                    <label>Confirm Password</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Confirm Your Password"
                        className="w-full p-5  pr-10 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
                    <button className="font-serif text-2xl">Create Account</button>
                </div>
                <div className="font-serif flex justify-center  text-2xl ">
                    <h1 className="my-10 w-[986px]">
                        By signing in or creating an account, you agree with our Terms & conditions and Privacy statement
                    </h1>
                </div>
            </form>
        </div>
    );
};

export default CreatePassPage;
