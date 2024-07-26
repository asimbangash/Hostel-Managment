import React from "react";
import { Link } from "react-router-dom";

const CheckInboxPage = () => {

    return (
        <div className="bg-[#fdfdfd] m-36 border">
            <div className="mx-10">
                <h1 className="flex text-3xl font-bold pt-6">
                    Check Your Inbox
                </h1>
                <p className="w-[740px] mt-4">we’ve just emailed instructions and a reset password link to your email. It might take a few minutes to arrive.</p>
            </div>
            <div>
                <div className="bg-[#2991DC] mx-10 p-5 rounded-md text-white flex justify-center mt-5">
                    <button className="font-serif text-2xl">Back to sign-in</button>
                </div>
                <div className="w-4/5 m-auto h-[1px] bg-black"></div>
                <div className="font-serif flex justify-center  text-2xl ">
                    <h1 className="my-10 w-[986px]">
                        By signing in or creating an account, you agree with our Terms & conditions and Privacy statement
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default CheckInboxPage;
