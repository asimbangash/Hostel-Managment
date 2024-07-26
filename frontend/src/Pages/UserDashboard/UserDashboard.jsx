import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import UserWelcomDashboard from "./pages/UserWelcomDashboard";
import MyProfile from "./pages/MyProfile";
import Setting from "./pages/Setting";
import BookingDetails from "./pages/BookingDetails";
import { useGlobalHostelContext } from "../../store/context/hostels-context";

function UserDashboard() {
  const [activeComponent, setActiveComponent] = useState("bookingdetail");
  const { showSidebar } = useGlobalHostelContext();

  return (
    <div className="flex dark:bg-slate-800 dark:text-white h-full">
      {showSidebar && <Sidebar />}
      <Outlet />
      {/* <div className="p-4 w-full">
                {activeComponent === 'Dashboard' && <Dashboard />}
                {activeComponent === 'Profile' && <MyProfile />}
                {activeComponent === 'Setting' && <Setting />}
                {activeComponent === 'bookingdetail' && <BookingDetails />}
            </div> */}
    </div>
  );
}

export default UserDashboard;
