import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

const Contact = () => {
  const formRef = useRef();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      setNameError("Name should contain only letters and be less than 20 characters");
      return;
    }
    if (!validateName(lastName)) {
      setLastNameError("Last Name should contain only letters and be less than 20 characters");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("Phone number must be exactly 11 digits");
      return;
    }
    setIsLoading(true);
    emailjs
      .send(
        "service_pnhqfx5",
        "template_iojq6ld",
        {
          from_name: name,
          message: message,
          phoneNumber: phoneNumber,
        },
        {
          publicKey: "hHoCt5WlsnZOp8iID",
        }
      )
      .then(
        async () => {
          setIsLoading(false);
          alert("Send successfully");
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_UR}/api/v1/contactmess`,
            { message: message }
          );
        },
        (error) => {
          setIsLoading(false);
          alert("Failed sending mail");
        }
      );
  };

  // Function to validate Name and Last Name (letters only and less than 20 characters)
  const validateName = (value) => {
    return /^[A-Za-z\s]{1,20}$/.test(value);
  };

  // Function to validate Phone Number (exactly 11 digits)
  const validatePhoneNumber = (value) => {
    return /^\d{11}$/.test(value);
  };

  // Function to handle input change for Name and Last Name
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    if (validateName(inputValue) || inputValue === "") {
      setName(inputValue);
      setNameError("");
    } else {
      setNameError("Name should contain only letters and be less than 20 characters");
    }
  };

  const handleLastNameChange = (e) => {
    const inputValue = e.target.value;
    if (validateName(inputValue) || inputValue === "") {
      setLastName(inputValue);
      setLastNameError("");
    } else {
      setLastNameError("Last Name should contain only letters and be less than 20 characters");
    }
  };

  // Function to handle input change for Phone Number
  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputPhoneNumber.length <= 11) {
      setPhoneNumber(inputPhoneNumber);
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("Phone number must be exactly 11 digits");
    }
  };

  return (
    <div>
      <div className="border border-[#88C7F5] max-w-screen-lg ml-64 rounded-md m-20 p-4 bg-[#EAF4FC]">
        <h1 className="font-bold text-xl">CONTACT US NOW!</h1>
        <p className="pt-5 font-medium">
          Let us know what you think! In order to provide better service, please
          do not hesitate to give us your feedback, Thank you.
        </p>
      </div>
      <form onSubmit={sendEmail} className="border-2 -mt-10 border-gray-100 h-11/12 max-w-screen-lg rounded-xl ml-64">
        <div className="grid grid-cols-2 mx-20 gap-40 mr-16 ml-16">
          <div>
            <label className="block text-md font-medium leading-6 text-gray-900 text-start mt-10">First Name</label>
            <input
              type="text"
              required
              name="name"
              value={name}
              onChange={handleNameChange}
              className={`w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${nameError ? 'border-red-500' : ''}`}
            />
            {nameError && <p className="text-red-500 text-sm mt-1 ml-1">{nameError}</p>}
          </div>
          <div>
            <label className="block text-md font-medium leading-6 text-gray-900 text-start mt-10">Last Name</label>
            <input
              type="text"
              required
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              className={`w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${lastNameError ? 'border-red-500' : ''}`}
            />
            {lastNameError && <p className="text-red-500 text-sm mt-1 ml-1">{lastNameError}</p>}
          </div>
        </div>
        <div className="mx-20 my-10 mr-16 ml-16">
          <label className="block text-md font-medium leading-6 text-gray-900 text-start mt-10">Email</label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
          />
        </div>
        <div className="mx-20 my-10 mr-16 ml-16">
          <label className="block text-md font-medium leading-6 text-gray-900 text-start mt-10">Phone Number</label>
          <input
            type="tel"
            required
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600 ${phoneNumberError ? 'border-red-500' : ''}`}
          />
          {phoneNumberError && <p className="text-red-500 text-sm mt-1 ml-1">{phoneNumberError}</p>}
        </div>
        <div className="mx-20 my-10 mr-16 ml-16">
          <label className="block text-md font-medium leading-6 text-gray-900 text-start mt-10">Message</label>
          <br />
          <textarea
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-64 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-blue-600"
          />
        </div>
        <br /><br />
        <div className="flex justify-end gap-4 mr-16 mb-40">
          <button className="bg-sky-500 hover:bg-sky-700 w-48 h-12 rounded-md py-2 px-10 text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 rounded-md w-48 py-2 px-10 text-white"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
