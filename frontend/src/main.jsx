import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import AllHostelsPage from "./Pages/AllHostel/AllHostelsPage.jsx";
import ContactPage from "./Pages/Contact/ContactPage.jsx";
import SigninPage from "./Pages/Signin/SigninPage.jsx";
import RegisterPage from "./Pages/Register/RegisterPage.jsx";
import PostHostelPage from "./Pages/PostHostel/PostHostelPage.jsx";
import HostelDetails from "./Pages/HostelDetails/HostelDetails.jsx";
import UserDashboard from "./Pages/UserDashboard/UserDashboard.jsx";
import CreatePassPage from "./Pages/Register/CreatePassPage.jsx";
import PasswordPage from "./Pages/Signin/PasswordPage.jsx";
import ForgotPass from "./Pages/Signin/ForgotPass.jsx";
import CheckInboxPage from "./Pages/Signin/CheckInboxPage.jsx";
import MyProfile from "./Pages/UserDashboard/pages/MyProfile.jsx";
import UserWelcomDashboard from "./Pages/UserDashboard/pages/UserWelcomDashboard.jsx";
import Setting from "./Pages/UserDashboard/pages/Setting.jsx";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard.jsx";
import AdminWelcomDashboad from "./Pages/AdminDashboard/pages/AdminWelcomDashboad.jsx";
import AllUsers from "./Pages/AdminDashboard/pages/AllUsers.jsx";
import Reviews from "./Pages/AdminDashboard/pages/Reviews.jsx";
import ContactUs from "./Pages/AdminDashboard/pages/ContactUs.jsx";
import BookingDetails from "./Pages/UserDashboard/pages/BookingDetails.jsx";
import InfoDetails from "./Pages/UserDashboard/pages/InfoDetails.jsx";
import UserOrders from "./Pages/AdminDashboard/pages/UserOrders.jsx";
import TotalHostels from "./Pages/AdminDashboard/pages/TotalHostels.jsx";
import ActiveHostels from "./Pages/AdminDashboard/pages/ActiveHostels.jsx";
import PendingHostels from "./Pages/AdminDashboard/pages/PendingHostels.jsx";
import HostelGeneralDetails from "./Pages/AdminDashboard/pages/HostelGeneralDetails.jsx";
import HostelSpecification from "./Pages/AdminDashboard/pages/HostelSpecification.jsx";
import HostelFacilities from "./Pages/AdminDashboard/pages/HostelFacilities.jsx";
import { RegisterContextProvider } from "./store/context/register-context.jsx";
import { HostelsContextProvider } from "./store/context/hostels-context.jsx";
import { AuthContextProvider } from "./store/context/auth-context.jsx";
import BookYourRoomPage from "./Pages/BookYourRoom/BookYourRoomPage.jsx";
import AdminProfile from "./Pages/MyProfile/MyProfile.jsx";
import AdminPostHostel from "./Pages/AdminDashboard/pages/PostHostel.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import UpdatePassword from "./Pages/Signin/updatepass.jsx";
import Map from "./Pages/Map/Map.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="AllHostels" element={<AllHostelsPage />} />
      <Route path="Contact" element={<ContactPage />} />
      <Route path="Register" element={<RegisterPage />} />
      <Route path="PostHostel" element={<PostHostelPage />} />
      <Route path="HostelDetails/:id" element={<HostelDetails />} />
      <Route path="HostelDetails" element={<HostelDetails />} />
      <Route path="BookYourRoom" element={<BookYourRoomPage />} />
      {/* <Route path="AdminPanel" element={<Dashboard />} /> */}
      <Route path="UserPanel" element={<UserDashboard />} />
      <Route path="CreatePass" element={<CreatePassPage />} />
      <Route path="EnterCredentail" element={<PasswordPage />} />
      <Route path="ForgotPass" element={<ForgotPass />} />
      <Route path="up/:id" element={<UpdatePassword />} />
      <Route path="CheckInpox" element={<CheckInboxPage />} />
      <Route path="Map" element={<Map />} />

      <Route path="UserDashboard" element={<UserDashboard />}>
        <Route path="" element={<UserWelcomDashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="setting" element={<Setting />} />
        <Route path="infodetail" element={<InfoDetails />} />
        <Route path="bookingdetail" element={<BookingDetails />} />
      </Route>

      <Route path="AdminDashboard" element={<AdminDashboard />}>
        <Route path="" element={<AdminWelcomDashboad />} />
        <Route path="allusers" element={<AllUsers />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="userorders" element={<UserOrders />} />
        <Route path="totalhostels" element={<TotalHostels />} />
        <Route path="activehostels" element={<ActiveHostels />} />
        <Route path="addnew" element={<AdminPostHostel />} />
        <Route path="pendinghostels" element={<PendingHostels />} />
        <Route path="hostelgeneraldetails" element={<HostelGeneralDetails />} />
        <Route path="hostelspecification" element={<HostelSpecification />} />
        <Route path="hostelfacilities" element={<HostelFacilities />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="406195407798-ocv778b6cgtauvm88k2kdt9qrp0k5nh1.apps.googleusercontent.com">
      <AuthContextProvider>
        <RegisterContextProvider>
          <HostelsContextProvider>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </HostelsContextProvider>
        </RegisterContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
