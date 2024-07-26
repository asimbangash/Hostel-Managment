import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";
import Swal from "sweetalert2";

const HostelGeneralDetails = () => {
  const [hostels, setHostels] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const getHostelDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelDetails();
  }, []);

  const handleSettingClick = (index) => {
    setActiveRow(index);
  };

  const handleDelete = async (hostelId) => {
    Swal.fire({
      title: "Deleted",
      text: "The Changes Has Been Deleted",
      icon: "error",
      background: "#e1e6ed"
    });
    try {
      await axios.delete(`http://localhost:8000/api/v1/postHostel/${hostelId}`);
      setHostels(hostels.filter((hostel) => hostel._id !== hostelId));
      setActiveRow(null);
    } catch (error) {
      console.log("Error while deleting hostel", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdate = (index) => {
    setEditMode(true);
    setActiveRow(index);
    setEditData(hostels[index]);
  };

  const handleSave = async () => {
    Swal.fire({
      title: "Updated",
      text: "The Record Has Been Updated",
      icon: "success",
      background: "#e1e6ed"
    });
    console.log("called");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/posthostel/${editData._id}`,
        editData
      );
      setHostels(
        hostels.map((hostel) =>
          hostel._id === editData._id ? response.data : hostel
        )
      );
      setActiveRow(null);
      setEditMode(false);
      getHostel();
    } catch (error) {
      console.log("Error while updating hostel", error);
    }
  };

  return (
    <div className="w-full mr-5 border-2 rounded-lg h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-start">
            <td>ID</td>
            <td>Hostel Name</td>
            <td>Category</td>
            <td>Hostel P-No</td>
            <td>Address</td>
            <td>Manager Name</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index} className="text-start border h-20 text-sm font-md leading-6 text-gray-900">
              <td>{index + 1}</td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelName"
                    value={editData.hostelName}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelName
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelType"
                    value={editData.hostelType}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelType
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelContact"
                    value={editData.hostelContact}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelContact
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelAddress"
                    value={editData.hostelAddress}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelAddress
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="accountName"
                    value={editData.accountName}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.accountName
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="accountNumber"
                    value={editData.accountNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.accountNumber
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="accountEmail"
                    value={editData.accountEmail}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.accountEmail
                )}
              </td>
              <td className="pl-6">
                {activeRow === index ? (
                  <div className="flex gap-x-3">
                    <button
                      onClick={() => handleDelete(hostel._id)}
                      className="bg-[#F85A50] py-1 px-4 text-white rounded-lg "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(index)}
                      className="bg-[#4AA4D9] py-1 px-4 text-white rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-lg "
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <img
                    src={setting}
                    alt="setting"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleSettingClick(index)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelGeneralDetails;
