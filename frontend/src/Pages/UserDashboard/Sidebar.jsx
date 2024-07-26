import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUser, faGear } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className=" md:w-1/4 w-1/2  p-10 flex flex-col md:relative absolute dark:bg-slate-800 rounded-lg bg-slate-100 ml-4 mr-4 border borderoutline-blue-500 h-fit border-cyan-200">
      {/* <ul>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Dashboard')}>
                    Dashboard
                </li>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Profile')}>
                    My Profile
                </li>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Setting')}>
                    Setting
                </li>
            </ul> */}
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard"
      >
        &nbsp; &nbsp;{" "}
        <FontAwesomeIcon icon={faChartLine}beat style={{ color: "#ffffff" }} />{" "}
        &nbsp; &nbsp; Dashboard
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard/infodetail"
      >
        &nbsp; &nbsp;{" "}
        <FontAwesomeIcon icon={faUser} beat style={{ color: "#ffffff" }} /> &nbsp;
        &nbsp; My Profile
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard/profile"
      >
        &nbsp; &nbsp;{" "}
        <FontAwesomeIcon icon={faGear} beat style={{ color: "#ffffff" }} /> &nbsp;
        &nbsp; Setting
      </Link>
    </div>
  );
};

export default Sidebar;
