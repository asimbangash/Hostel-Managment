import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faChartLine, faAddressBook, faUser, faUsers, faCircleInfo, faHome } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const [showPages, setShowPages] = useState(false);
  const handleClick = () => {
    setShowPages(!showPages);
  };
  return (
    <div className=" md:w-1/4 w-1/2 p-10 flex flex-col md:relative absolute rounded-lg bg-slate-100 ml-4 mr-4  border h-fit borderoutline-blue-500  border-cyan-200">
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700  "
        to="/AdminDashboard"
      >
       &nbsp; &nbsp;&nbsp;<FontAwesomeIcon icon={faChartLine } beat style={{color: "#ffffff",}} />  &nbsp; &nbsp; Dashboard
    
     
     
      </Link>
      <button
        className="cursor-pointer pr-16 mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        onClick={handleClick}
      >
    <FontAwesomeIcon icon={ faCircleInfo }beat style={{color: "#ffffff ", }} />  &nbsp; &nbsp; Hostel Details
     
      </button>
      {showPages && (
        <ul className="font-serif py-1 pl-8  h-fit mt-1">
          <li>
            <Link className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700" to="/AdminDashboard/hostelgeneraldetails">
              - Hostel Details
            </Link>
          </li>
        
          <li className="mt-6 mb-3 ">
        <Link className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700" to="/AdminDashboard/hostelfacilities">
              - Hostel Facilities
            </Link>
          </li>

          <li className="mt-6 mb-3">
            <Link className="cursor-pointer mb-2  bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700" to="/AdminDashboard/hostelspecification">
              - Hostel Specification
            </Link>
          </li>

        </ul>
      )}
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/allusers"
      >
      &nbsp;&nbsp;  <FontAwesomeIcon icon={faUsers } beat style={{color: "#ffffff",}} />  &nbsp; &nbsp;All Users
      </Link>
      {/* <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/reviews"
      >
     &nbsp; &nbsp; &nbsp; <FontAwesomeIcon icon={faStreetView  } style={{color: "#fb7e18",}} />  &nbsp; &nbsp;   Reviews
      </Link> */}

      <Link className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
       to={"/AdminDashboard/AddNew"}>
      &nbsp;&nbsp; <FontAwesomeIcon icon={faHome }beat style={{color: "#ffffff",}} />  &nbsp; &nbsp;   Add Hostel</Link>

{/* 
      <Link
        className="cursor-pointer mb-2 bg-sky-500 hover:bg-sky-700 p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/contactus"
      >
     &nbsp;&nbsp; <FontAwesomeIcon icon={faAddressBook }beat style={{color: "#ffffff",}} />  &nbsp; &nbsp;   Contact Us
      </Link> */}
      
    </div>
  );
};

export default Sidebar;
