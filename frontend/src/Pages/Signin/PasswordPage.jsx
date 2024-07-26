import React from "react";
import { Link } from "react-router-dom";

const PasswordPage = () => {

    return (
        <div className="bg-[#fdfdfd] m-10 border">
            <div className="mx-10">
                <h1 className="flex text-3xl font-bold pt-6">
                    Enter Your Password
                </h1>
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
                <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
                    <button className="font-serif text-2xl">Sign in</button>
                </div>
                <div className="flex justify-center font-serif text-2xl my-8">
                    <button className="text-[#2991DC]">Forgot Password?</button>
                </div>
               
                <div className="font-serif flex justify-center  text-2xl ">
                    <h1 className="my-10 w-[986px]">
                     
                    </h1>
                </div>
            </form>
        </div>
    );
};

export default PasswordPage;
