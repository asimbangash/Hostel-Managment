import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserDashCard from "../components/UserDashCard";
import { Link } from "react-router-dom";
import user from "../../../../public/user.png";

const UserWelcomDashboard = () => {
  return (
    <div className="w-full font-serif h-screen">
      <div className="flex rounded-lg gap-2 align-middle items-center bg-[#e2f0f9] dark:bg-slate-800 dark:text-white p-5 w-full">
        <IoMdNotificationsOutline />
        <p>Welcome to User Dashboard</p>
      </div>
      <div className="flex gap-4 mt-5 border border-gray-300 rounded-lg">
        <Link
          className={`bg-[#55aada] rounded-lg text-white p-5 mx-4 my-8 w-64 dark:bg-gray-700`}
          to="/UserDashboard/infodetail"
        >
          <div className="flex justify-between">
            <div>
              <p>user Info</p>
              <h4 className="font-bold">View Profile</h4>
            </div>
            <div className="mt-[-1rem]">
              <img src={user} className="w-8 h-8" />
            </div>
          </div>
        </Link>
        <Link
          className={`bg-[#0CBF69] rounded-lg text-white p-5 mx-4 my-8 w-64 dark:bg-gray-700`}
          to="/UserDashboard/bookingdetail"
        >
          <p>Room Info</p>
          <h4 className="font-bold">View Booking Details</h4>
        </Link>
      </div>
    </div>
  );
};

export default UserWelcomDashboard;
