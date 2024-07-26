import React, { useState, useEffect, useRef } from "react";
import person from "../../../../public/Person.svg";
import axios from "axios";

const MyProfile = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
    
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    currentPass: "",
    newPass: "",
    confirmPass: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    

    const formData = new FormData();
    formData.append("images", file);

    try {
      const { data } = await axios.patch(
        "http://localhost:8000/api/v1/users/uploadimg",
        formData
      );

      setFormData({ ...formData, image: `${baseUrl}/${data.profileImage}` });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get("http://localhost:8000/api/v1/users");
      const { phoneNo, city, state, name, email, profileImage } = data;
      setFormData({
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        email: email,
        phoneno: phoneNo,
        currentPass: "",
        newPass: "",
        confirmPass: "",
        image: profileImage ? `${baseUrl}/${profileImage}` : null,
      });
    }
    getUserData();
  }, []);

  const handleDataChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch("http://localhost:8000/api/v1/users", {
      ...formData,
      image: formData.image.split("/").pop(),
    });
  };

  const handleRemoveImg = async () => {
    const { data } = await axios.patch(
      "http://localhost:8000/api/v1/users/removeimg"
    );
    if (data.success) {
      setFormData({ ...formData, image: "" });
    }
  };

  return (
    <div className="w-full flex h-screen flex-col gap-8 border rounded-lg">
      <h4 className="border-b p-4">User Profile Information</h4>
      <div className="flex items-center ml-5 align-middle ">
        <div>
          <img
            src={formData.image ? formData.image : person}
            className="w-52 h-52 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 ml-10">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="border p-1 rounded-sm"
              style={{ display: "none" }}
            />
            <button
              type="submit"
              className="border p-1 rounded-sm"
              onClick={handleButtonClick}
            >
              Upload Image
            </button>
          </div>{" "}
          <button
            className="bg-[#4aa4d9] text-white rounded-sm p-1"
            onClick={() => handleRemoveImg()}
          >
            Remove image
          </button>
        </div>
      </div>
      <div className="w-full p-4">
        <form className="w-full" onSubmit={updateUserInfo}>
          <div className="w-3/4 grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="jhon"
              />
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="doe"
              />
            </div>
          </div>
          <div className="w-3/4 grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="jhonedoe@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">phone NO</label>
              <input
                type="number"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="0336XXXXXXX"
              />
            </div>
          </div>
          <div className="w-3/4 grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPass"
                value={formData.currentPass}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg text-black dark:bg-gray-700 dark:text-gray-400"
                placeholder="*****"
              />
            </div>
            <div className="flex flex-col">
              <label>New Password</label>
              <input
                type="password"
                name="newPass"
                value={formData.newPass}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="*****"
              />
            </div>
          </div>
          <div className="w-3/4 grid grid-cols-2 gap-5 items-center">
            <div className="flex flex-col">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleDataChange}
                className="border bg-[#F2F9FB] p-2 rounded-lg dark:bg-gray-700 dark:text-gray-400"
                placeholder="*****"
              />
            </div>
            <div className="w-full items-end flex align-middle justify-end mt-5">
              <button
                type="submit"
                className="bg-[#4aa4d9] w-28 h-10 rounded-lg"
              >
                + update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
