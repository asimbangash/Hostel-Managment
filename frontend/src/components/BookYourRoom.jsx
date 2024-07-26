import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const BookYourRoom = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const hid = query.get("hid");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    city: "",
    state: "",
    roomType: "",
    roomNo: "",
    joiningDate: "",
    vacateDate: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate and update form data
    if (name === "firstName" || name === "lastName" || name === "city" || name === "state") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} should only contain letters and spaces.`,
        }));
        return; // Exit early if contains non-letters or non-spaces
      } else if (value.length > 20) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} should not exceed 20 characters.`,
        }));
        return; // Exit early if length exceeds 20 characters
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Limit phone number to 11 digits and validate format
    if (name === "phoneNo") {
      const trimmedValue = value.replace(/\D/g, ""); // Remove non-digit characters
      if (trimmedValue.length > 11) return; // Limit to 11 digits
      if (!/^\d{0,11}$/.test(trimmedValue)) return; // Ensure only digits
      setFormData({
        ...formData,
        [name]: trimmedValue,
      });
      return;
    }

    // Update form data for other fields
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number format
    if (!/^\d{11}$/.test(formData.phoneNo)) {
      setErrors({
        ...errors,
        phoneNo: "Phone number must be exactly 11 digits.",
      });
      return;
    }

    // Validate Joining Date and Vacate Date
    const joiningDate = new Date(formData.joiningDate);
    const vacateDate = new Date(formData.vacateDate);

    if (joiningDate > vacateDate) {
      setErrors({
        ...errors,
        dateError: "Vacate Date must be later than or equal to Joining Date.",
      });
      return;
    } else {
      setErrors({
        ...errors,
        dateError: "",
      });
    }

    // Validate other fields for length and content if needed
    // Example: firstName, lastName, city, state
    if (
      formData.firstName.length > 20 ||
      formData.lastName.length > 20 ||
      formData.city.length > 20 ||
      formData.state.length > 20
    ) {
      setErrors({
        ...errors,
        nameLength: "Fields should not exceed 20 characters.",
      });
      return;
    }

    // Prepare data to send
    const objtosend = { ...formData, hostelId: hid };
    console.log("Form data being sent:", objtosend);

    // Send data using axios
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/bookyourroom",
        objtosend
      );
      if (response.data) {
        toast.info(response.data);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Error while submitting the form");
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <div className="mt-5 max-w-5xl ml-64 border-2 shadow-slate-300 bg-sky-50 rounded-lg">
        <h1 className="block text-md font-medium leading-6 text-gray-900 text-start mt-7 ml-16 h-16">
          Please fill out the details below to book your room
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 max-w-5xl ml-64 rounded-2xl border-2 shadow-inner"
      >
        <div className="grid grid-cols-2 mx-16 gap-80">
          <div className="">
            <label className="block text-md font-medium leading-6 text-gray-900 mt-10">
              First Name
            </label>
            <input
              type="text"
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-10">
              Last Name
            </label>
            <input
              type="text"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mx-16 gap-80">
          <div className="">
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              pattern="[a-zA-Z0-9._%+-]+@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Phone No
            </label>
            <input
              type="text"
              required
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.phoneNo ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.phoneNo}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mx-16 gap-80">
          <div className="">
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              City
            </label>
            <input
              type="text"
              required
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.city ? "border-red-500" : ""
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              State
            </label>
            <input
              type="text"
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.state ? "border-red-500" : ""
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.state}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 mx-16 gap-80">
          <div className="">
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Room type
            </label>
            <select
              name="roomType"
              required
              value={formData.roomType}
              onChange={handleChange}
              className="w-72 font-serif mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
            >
              <option value="" required></option>
              <option value="One Seater">One Seater</option>
              <option value="Two Seater">Two Seater</option>
              <option value="Three Seater">Three Seater</option>
              <option value="Four Seater">Four Seater</option>
            </select>
          </div>
          <div>
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Room No
            </label>
            <select
              name="roomNo"
              required
              value={formData.roomNo}
              onChange={handleChange}
              className="w-72 font-serif mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
            >
              <option value="" required></option>
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 mx-16 gap-80">
          <div className="">
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Joining Date
            </label>
            <input
              type="date"
              required
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              min={getTodayDate()}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
              Vacate Date
            </label>
            <input
              type="date"
              required
              name="vacateDate"
              value={formData.vacateDate}
              onChange={handleChange}
              min={getTodayDate()}
              className={`w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${
                errors.dateError ? "border-red-500" : ""
              }`}
            />
            {errors.dateError && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.dateError}</p>
            )}
          </div>
        </div>
        <div className="mx-16 min-w-96 py-3">
          <label className="block font-serifblock text-md font-medium leading-6 text-gray-900 mt-5">
            Payment Method
          </label>
          <select
            className="w-full font-serif mt-1 p-2 pr-10 border h-12 border-gray-300 rounded-md focus:outline-blue-600"
            name="paymentMethod"
            required
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="No prepament needed - pay at the property">
              No prepament needed - pay at the property
            </option>
          </select>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 px-6 py-2 rounded-md my-6 mb-10 w-80 h-12 text-white"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookYourRoom;
