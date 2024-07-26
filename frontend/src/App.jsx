import React from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import UserDashboardHeader from "./Pages/UserDashboard/components/UserDashboardHeader";
import AdminDashboardHeader from "./Pages/AdminDashboard/components/AdminDashboardHeader";

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const location = useLocation();
  const excludedPaths = [
    "/signin",
    "/bookyourroom",
    "/register",
    "/contact",
    "/posthostel",
  ];
  const isExcludedPage = excludedPaths.includes(location.pathname);

  return (
    <div>
      {location.pathname.includes("/UserDashboard") ? (
        <UserDashboardHeader />
      ) : location.pathname.includes("/AdminDashboard") ? (
        <AdminDashboardHeader />
      ) : (
        !location.pathname.includes("/up") && <Header />
      )}
      <Outlet />
      {!isExcludedPage &&
        !location.pathname.includes("/UserDashboard") &&
        !location.pathname.includes("/AdminDashboard") &&
        !location.pathname.includes("/Register") &&
        !location.pathname.includes("/up") && <Footer />}
    </div>
  );
};

export default App;
