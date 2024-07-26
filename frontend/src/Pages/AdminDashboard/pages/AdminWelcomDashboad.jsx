import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import orderImage from "../../../../public/order.png";
import totalHostel from "../../../../public/Hostel.png";
import activeHostel from "../../../../public/Hostel (1).png";
import pendingHostel from "../../../../public/Hostel (2).png";
import axios from "axios";

const AdminWelcomDashboad = () => {
  const [hostel, setHostel] = useState(0);

  useEffect(() => {
    const getAllHostel = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/postHostel"
        );

        setHostel(response.data.hostels.length);
      } catch (error) {
        console.log(error);
      }
    };
    getAllHostel();
  }, []);

  return (
    <div className="w-full">
      <div className="flex rounded-lg gap-2 align-middle items-center bg-[#e2f0f9] p-5 w-full dark:bg-slate-800">
        <IoMdNotificationsOutline className="text-xl" />
        <p className="font-serif   text-[#036163] " >Welcome to Admin Dashboard</p>
      </div>

      <div className="border border-gray-300 mt-2 rounded-1xl">
        <h1 className="font-serif pl-6 py-6 text-[#49a7ff] ">Dashboard all statistics</h1>
        <div className="md:flex md:flex-row flex flex-col justify-between mx-6">
          <Link to="/AdminDashboard/userorders">
            <div className="bg-[#E2F0F9] rounded-xl py-5 px-5 mb-6 w-48 dark:bg-gray-700">
              <img src={orderImage} alt="order" className="h-10 w-10 ml-auto" />
              <h1 className="text-[#0D94F6] font-serif text-xl leading-10">
                0
              </h1>
              <h2 className="font-serif text-xl">User Orders</h2>
            </div>
          </Link>
          <Link to="/AdminDashboard/totalhostels">
            <div className="bg-[#E2F0F9] rounded-xl py-5 px-5 mb-6 w-48 dark:bg-gray-700">
              <img
                src={totalHostel}
                alt="order"
                className="h-10 w-10 ml-auto"
              />
              <h1 className="text-[#0D94F6] font-serif text-xl leading-10">
                {hostel}
              </h1>
              <h2 className="font-serif text-xl">Total Hostels</h2>
            </div>
          </Link>
          <Link to="/AdminDashboard/activehostels">
            <div className="bg-[#E2F0F9] rounded-xl py-5 px-5 mb-6 w-48 dark:bg-gray-700">
              <img
                src={activeHostel}
                alt="order"
                className="h-10 w-10 ml-auto"
              />
              <h1 className="text-[#0D94F6] font-serif text-xl leading-10">
                3
              </h1>
              <h2 className="font-serif text-xl">Active Hostels</h2>
            </div>
          </Link>
          <Link to="/AdminDashboard/pendinghostels">
            <div className="bg-[#E2F0F9] rounded-xl py-5 px-5 mb-6 w-48 dark:bg-gray-700">
              <img
                src={pendingHostel}
                alt="order"
                className="h-10 w-10 ml-auto"
              />
              <h1 className="text-[#0D94F6] font-serif text-xl leading-10">
                2
              </h1>
              <h2 className="font-serif text-xl">Pending Hostels</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomDashboad;
