import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalRegisterContext } from "../store/context/register-context";
import { useGlobalAuthContext } from "../store/context/auth-context";

const Header = () => {
  const navigate = useNavigate();

  const { setContinueWithEmail, continueWithEmail, setSignUp, signup } =
    useGlobalRegisterContext();
  const { isAuthenticated, setIsAuthenticated } = useGlobalAuthContext();

  function HandleRegisterClick() {
    setSignUp(!signup);
    setContinueWithEmail(continueWithEmail);
  }

  function handleLogOut() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/");
  }

  const ScrollToTop = () => {
    window.scrollTo(0, 0)
}

  return (
    <header className="sticky top-0 z-20">
      <ul className="flex justify-between items-center h-16 hover:bg-slate-900 bg-black text-white py-3 px-4">
        <li className="text-2xl font-bold font-mono text-cyan-300 size-13 indent-8">HARP</li>
        <li>
          <NavLink
            to="/" onClick={ScrollToTop}
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}` }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allhostels" onClick={ScrollToTop}
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            All Hostels
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact" onClick={ScrollToTop}
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            Contact
          </NavLink>
        </li>
        <li>
          {!isAuthenticated ? (
            <NavLink
              to="/Register" onClick={ScrollToTop}
              className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
            >
              Sign in
            </NavLink>
          ) : (
            <NavLink
              to="/posthostel" onClick={ScrollToTop}
              className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
            >
              Post Hostel
            </NavLink>
          )}
        </li>
        {/* <li>
          <NavLink
            to="/Register"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            <div onClick={() => HandleRegisterClick()}>Register</div>
          </NavLink>
        </li> */}
        <li>
          {isAuthenticated && (
            <button onClick={() => handleLogOut()}>Logout</button>
          )}
        </li>
        {isAuthenticated && (
          <li>
            {localStorage.getItem("role") === "user" ? (
              <NavLink
                to="/UserDashboard" onClick={ScrollToTop}
                className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/AdminDashboard" onClick={ScrollToTop}
                className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
              >
                Dashboard
              </NavLink>
            )}
          </li>
        )}

        {isAuthenticated && <li>{localStorage.getItem("email")}</li>}
        
      </ul>
    </header>
  );
};

export default Header;
