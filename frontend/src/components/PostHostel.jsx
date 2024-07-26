import axios from "axios";
import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { usePlacesWidget } from "react-google-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUser, faGear, faCircleLeft, faCircleRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PostHostel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: "", lng: "" });
  const [hostelAddress, setHostelAddress] = useState("");
  const [formData, setFormData] = useState({
    hostelName: "",
    hostelType: "",
    hostelContact: "",
    hostelAddress: "",
    // images: null,
    accountName: "",
    accountNumber: "",
    accountEmail: "",
    accountPass: "",
    rent: "",
    rentPeriod: "",
    bills: "",
    condition: "",
    floor: "",
    bathroom: "",
    mess: "",
    lawn: "",
    numberOfRooms: "",
    parking: false,
    geyser: false,
    securityGuard: false,
    studyRoom: false,
    gym: false,
    cctv: false,
    wifi: false,
    laundary: false,
    mineralWater: false,
  });

  const goToPreviousPage = () => {
    setCurrentPage((previes) => previes - 1);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImageFile = e.target.files[0];
    console.log("this is selected image file", selectedImageFile);
    setSelectedImage(URL.createObjectURL(selectedImageFile));
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: selectedImageFile,
    }));
    console.log("hello");
    console.log("Selected image:", selectedImage);
    e.target.value = "";
  };

  const goToNextPageOrSubmit = async (e) => {
    if (currentPage < 3) {
      setCurrentPage((previes) => previes + 1);
    } else {
      // form submited logic here
      try {
        e.preventDefault();
        const data = new FormData();
        console.log(userLocation);
        const imagefiles = fileList.map((file) => {
          return file.originFileObj;
        });
        data.append("hostelName", formData.hostelName);
        data.append("hostelType", formData.hostelType);
        data.append("hostelContact", formData.hostelContact);
        data.append("hostelAddress", hostelAddress);
        data.append("location", JSON.stringify(userLocation));
        data.append("accountName", formData.accountName);
        data.append("accountNumber", formData.accountNumber);
        data.append("accountEmail", formData.accountEmail);
        data.append("accountPass", formData.accountPass);
        data.append("rent", formData.rent);
        data.append("rentPeriod", formData.rentPeriod);
        data.append("bills", formData.bills);
        data.append("condition", formData.condition);
        data.append("floor", formData.floor);
        data.append("bathroom", formData.bathroom);
        data.append("mess", formData.mess);
        data.append("lawn", formData.lawn);
        data.append("numberOfRooms", formData.numberOfRooms);
        data.append("parking", formData.parking === true ? "Yes" : "No");
        data.append("geyser", formData.geyser === true ? "Yes" : "No");
        data.append(
          "securityGuard",
          formData.securityGuard === true ? "Yes" : "No"
        );
        data.append("studyRoom", formData.studyRoom === true ? "Yes" : "No");
        data.append("gym", formData.gym === true ? "Yes" : "No");
        data.append("cctv", formData.cctv === true ? "Yes" : "No");
        data.append("wifi", formData.wifi === true ? "Yes" : "No");
        data.append("laundary", formData.laundary === true ? "Yes" : "No");
        data.append(
          "mineralWater",
          formData.mineralWater === true ? "Yes" : "No"
        );
        for (const image of imagefiles) {
          data.append("images", image);
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/postHostel`,
          data
        );
        if (data) {
          toast.info("Hostel Post Successfully");
        }
      } catch (error) {
        console.log("form submiting error", error);
        toast.info("Error while posting hostel");
      }
    }
  };

  const handleFormHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: async (place) => {
      console.log(place.formatted_address);
      setHostelAddress(place.formatted_address);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            place.formatted_address
          )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.error_message) {
          throw new Error(`Google Maps API Error: ${data.error_message}`);
        }

        if (data.results.length === 0) {
          throw new Error("No results found");
        }

        const { lat, lng } = data.results[0].geometry.location;
        console.log(lat, lng);
        setUserLocation({ lat: lat, lng: lng });
        console.log(userLocation);
      } catch (error) {
        console.error("Error fetching or parsing data", error);
      }
    },
  });

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <form className="max-w-screen-lg border-2 mt-10 mb-20 ml-72 border-gray-50 shadow-inner ">
            <h1 className="flex justify-center mt-10 font-bold text-2xl font-sans text-blue-400">
              General Details
            </h1>
            <div className="flex justify-center gap-16 gap-y-6 mx-16 mt-20">
              <input
                type="text"
                placeholder="Hostel Name"
                onKeyDown={(event) =>
                  /^[a-zA-Z\s]*$/.test(event.key) || event.preventDefault()
                }
                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg focus:outline-blue-600"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleFormHandler}
              />
              <select
                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg   focus:outline-blue-600"
                name="hostelType"
                value={formData.hostelType}
                onChange={handleFormHandler}
              >
                <option>Select category</option>
                <option>Boys</option>
                <option>Girls</option>
              </select>
            </div>
            <div className="flex justify-center gap-16 mt-20">
              <input
                type="text"
                placeholder="03169820534"
                maxLength={11}
                onKeyDown={(e) => {
                  if (e.keyCode === 8 || /^[0-9]$/.test(e.key)) {
                    return; // Allow default behavior
                  } else {
                    e.preventDefault(); // Prevent other characters from being typed
                  }
                }}
                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="hostelContact"
                value={formData.hostelContact}
                onChange={handleFormHandler}
              />
              <input
                type="text"
                ref={ref}
                placeholder="Peshawar Hayatabad "
                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
              />
            </div>
            <div>
              <div className="flex flex-col items-center font-normal text-lg font-sans mt-20 text-blue-400">
                <h1 className="">Hostel Pictures</h1>
                <br /> <br />
                <p className="mt-[-2rem]">(Select up to 5 pictures)</p>
              </div>
                <br /><br />
              <div class="md:flex md:flex-row flex flex-col items-center ml-40">
                <div className="clearfix">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div className="ant-upload-text text-sky-400">Upload</div>
                      </div>
                    )}
                  </Upload>
                  <Modal
                    // visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>

              <div className="gap-x-16 gap-y-16 mx-16 mt-20"> 
                <h1 className="flex justify-center mt-20 font-normal text-lg font-sans text-blue-400">
                  Account Setup
                </h1>
                <div className="flex justify-center gap-16 mt-10">
                  <input
                    type="text"
                    placeholder="walid Shinware"
                    className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleFormHandler}
                  />
                  <input
                    type="text"
                    placeholder="03179820434"
                    className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleFormHandler}
                  />
                </div>
                <div className="flex justify-center gap-16 mt-10">
                  <input
                    type="text"
                    placeholder="walidshinwari@gmail.com"
                    className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                    name="accountEmail"
                    value={formData.accountEmail}
                    onChange={handleFormHandler}
                  />
                  <input
                    type="text"
                    placeholder="******"
                    className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                    name="accountPass"
                    value={formData.accountPass}
                    onChange={handleFormHandler}
                  />
                </div>
              </div>
            </div>
             <br /><br />
            <div className="flex justify-between mx-96 mt-1 font-serif mb-20 text-[#2991DC]">
              {/* <button disabled onClick={goToPreviousPage} className="bg-[#2991DC] text-white ml-9 rounded-lg py-2 px-6 h-12 w-48 ">
                Previous
              </button> */}
              <button type="button" onClick={goToNextPageOrSubmit}
              
              className="bg-sky-500 hover:bg-sky-700 text-white  rounded-lg py-1 px-2 h-12 w-96 ml-1"

              >
             <FontAwesomeIcon icon={faCircleRight} beat style={{ color: "#ffffff" }} />    Next
              </button>
            </div>
          </form>
        );
      case 2:
        return (
          <div className="max-w-screen-lg border-2 mt-10 mb-20 ml-64  border-gray-50 shadow-inner">
            <div className="flex flex-col justify-center items-center ">
              <h1 className="mt-10 font-bold text-2xl font-sans text-blue-400">
                Hostel Specifications
              </h1>
              <h2 className="mt-10 font-normal text-2xl font-sans text-blue-400">Rent and Area</h2>
            </div>
            <div className="grid grid-cols-3 gap-y-16 mx-16 ml-32 mt-10">
              <input
                type="text"
                placeholder="Rent Per Month"
                onKeyDown={(e) => {
                  if (e.keyCode === 8 || /^[0-9]$/.test(e.key)) {
                    return; // Allow default behavior
                  } else {
                    e.preventDefault(); // Prevent other characters from being typed
                  }
                }}
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="rent"
                value={formData.rent}
                onChange={handleFormHandler}
              />
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="rentPeriod"
                value={formData.rentPeriod}
                onChange={handleFormHandler}
              >
                <option>Rent Period</option>
                <option>Anually</option>
                <option>Monthly</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="bills"
                value={formData.bills}
                onChange={handleFormHandler}
              >
                <option>Bills Include</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="condition"
                value={formData.condition}
                onChange={handleFormHandler}
              >
                <option>Condition</option>
                <option>Furnished</option>
                <option>Unfurnished</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="floor"
                value={formData.floor}
                onChange={handleFormHandler}
              >
                <option>Select Floor</option>
                <option>Basement</option>
                <option>Ground floor</option>
                <option>1st floor</option>
                <option>2nd floor</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="bathroom"
                value={formData.bathroom}
                onChange={handleFormHandler}
              >
                <option>Bathroom</option>
                <option>Attached</option>
                <option>NotAttached</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="mess"
                value={formData.mess}
                onChange={handleFormHandler}
              >
                <option>Mess</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <select
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="lawn"
                value={formData.lawn}
                onChange={handleFormHandler}
              >
                <option>Lawn</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <input
                type="text"
                placeholder="No of rooms"
                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg  focus:outline-blue-600"
                name="numberOfRooms"
                onKeyDown={(e) => {
                  if (e.keyCode === 8 || /^[0-9]$/.test(e.key)) {
                    return; // Allow default behavior
                  } else {
                    e.preventDefault(); // Prevent other characters from being typed
                  }
                }}
                value={formData.numberOfRooms}
                onChange={handleFormHandler}
              />
            </div>
            <br /><br />
            <div className="flex justify-between mx-32 mt-10 font-serif mb-10 text-[#2991DC]">
              <button onClick={goToPreviousPage} className="bg-sky-500 hover:bg-sky-700 text-white  rounded-lg py-2 px-6 h-12 w-48">
              <FontAwesomeIcon icon={faCircleLeft} beat style={{ color: "#ffffff" }} /> Back</button>
              <button type="button" onClick={goToNextPageOrSubmit} className="bg-sky-500 hover:bg-sky-700 text-white  rounded-lg py-2 px-6 h-12 w-48 mr-2">
              <FontAwesomeIcon icon={faCircleRight} beat style={{ color: "#ffffff" }} />  Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="max-w-screen-lg border-2 mt-10 mb-20 ml-72 border-gray-50 shadow-inner">
            <div className="flex flex-col justify-center items-center">
              <h1 className="mt-12 font-bold text-2xl font-sans text-blue-400 ">Hostel Facilities</h1>
              <h2 className="mt-10 font-normal text-2xl font-sans text-blue-400">Facilities</h2>
            </div>
            <div className="flex justify-center mt-16 ">
              <div className="grid grid-cols-3 gap-x-40">
                <div className="flex items-center gap-x-2">
                  <input className=""
                    type="checkbox"
                    name="parking"
                    checked={formData.parking}
                    onChange={handleFormHandler}
                  />
                  <img src="Carpool.png" className="w-5 h-10" />
                  <label className="font-serif">Parking</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="geyser"
                    checked={formData.geyser}
                    onChange={handleFormHandler}
                  />
                  <img src="Springs.png" className="w-5 h-10" />
                  <label className="font-serif">Geyser</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="securityGuard"
                    checked={formData.securityGuard}
                    onChange={handleFormHandler}
                  />
                  <img src="Officer.png" className="w-5 h-10" />
                  <label className="font-serif">Security Guard</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="studyRoom"
                    checked={formData.studyRoom}
                    onChange={handleFormHandler}
                  />
                  <img src="Reading.png" className="w-5 h-10" />
                  <label className="font-serif">Study Room</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="gym"
                    checked={formData.gym}
                    onChange={handleFormHandler}
                  />
                  <img src="gym.png" className="w-5 h-10" />
                  <label className="font-serif">Gym</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="cctv"
                    checked={formData.cctv}
                    onChange={handleFormHandler}
                  />
                  <img src="Camera.png" className="w-5 h-10" />
                  <label className="font-serif">CCTV Cameras</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleFormHandler}
                  />
                  <img src="Wi-Fi.png" className="w-5 h-10" />
                  <label className="font-serif">Wi-Fi</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="laundary"
                    checked={formData.laundary}
                    onChange={handleFormHandler}
                  />
                  <img src="Machine.png" className="w-5 h-10" />
                  <label className="font-serif">Laundary</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    name="mineralWater"
                    checked={formData.mineralWater}
                    onChange={handleFormHandler}
                  />
                  {/* <img src="Carpool.png" className="w-5 h-10" /> */}
                  <label className="font-serif">Mineral Water</label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="flex justify-between mx-24 mt-10 font-serif mb-20">
              <button onClick={goToPreviousPage} 
              className="bg-sky-500 hover:bg-sky-700 text-white h-12 w-48 rounded-lg py-2 px-6">
               <FontAwesomeIcon icon={faCircleLeft} beat style={{ color: "#ffffff" }} />  Back
              </button>
              <button
                onClick={goToNextPageOrSubmit} 
                className="bg-sky-500 hover:bg-sky-700 text-white rounded-lg py-2 px-6 h-12 w-48  mr-1"
              >
               <FontAwesomeIcon icon={faPaperPlane} beat style={{ color: "#ffffff" }} />  Submit
              </button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderPageContent()}</div>;
};

export default PostHostel;
