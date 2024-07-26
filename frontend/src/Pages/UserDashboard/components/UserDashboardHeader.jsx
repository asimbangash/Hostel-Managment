import React, { useState } from "react";
import { IoMoonOutline, IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalAuthContext } from "../../../store/context/auth-context";
import { useGlobalHostelContext } from "../../../store/context/hostels-context";

const UserDashboardHeader = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const { setShowSidebar } = useGlobalHostelContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleDropdownClick = () => {
    setShowDropDown(!showDropdown);
  };

  const { setIsAuthenticated } = useGlobalAuthContext();

  const toggleSidebar = () => {
    console.log("call");
    setShowSidebar((prev) => !prev);
  };

  function handleLogOut() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/");
  }

  const closeDropdown = () => {
    setShowDropDown(false);
  };

  return (
    <div className="w-full flex align-middle justify-around items-center py-3 relative dark:bg-slate-800">
      <Link
        to="/"
        className="font-bold md:block hidden font-serif text-xl dark:text-white"
      >
        Harp
      </Link>
      <button
        onClick={toggleSidebar}
        className="md:hidden block dark:text-white"
      >
        <IoMenu className="w-8 h-8" />
      </button>
      <div className="md:block hidden">
        <form class="w-full mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-[30rem] font-serif p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Harp..."
              required
            />
          </div>
        </form>
      </div>
      <div className="flex gap-11">
        <button onClick={toggleDarkMode}>
          <IoMoonOutline size={25} className="dark:text-white" />
        </button>
        
        <Link to="/UserDashboard/profile">
          <CgProfile size={25} className="dark:text-white" />
        </Link>
        <IoIosArrowDown
          size={25}
          onClick={handleDropdownClick}
          className="cursor-pointer dark:text-white"
        />
      </div>
      {showDropdown && (
        <div className="absolute bg-white shadow-md border top-14 right-32">
          <ul>
            <li className="p-1.5 " onClick={closeDropdown}>{localStorage.getItem("email")}</li>
            <li className="border p-2 px-3">
              <Link to="/UserDashboard/profile" onClick={closeDropdown}>
                My Profile
              </Link>
            </li>
            <li className="border p-2 px-3">
              <Link to="/UserDashboard/profile" onClick={closeDropdown}>
                Setting
              </Link>
            </li>
            <li className="border p-2 px-3">
              <button
                onClick={() => {
                  handleLogOut(), closeDropdown();
                }}
              >
                Logout
              </button>
            </li>{" "}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboardHeader;
