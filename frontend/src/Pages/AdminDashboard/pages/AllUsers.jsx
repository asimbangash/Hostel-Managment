import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const getAllUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/bookyourroom"
      );
      console.log(response);
      setAllUsers(response.data.getAllUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const handleSettingButton = (index) => {
    setActiveRow(index);
    setEditData(allUsers[index]);
    setEditMode(false);
  };

  const handleUpdateButton = () => {
    setEditMode(true);
  };

  const handleDeleteButton = async (hostelId) => {
    Swal.fire({
      title: "Deleted",
      text: "The Record Has Been Deleted",
      icon: "error",
      background: "#e1e6ed",
    });
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/bookyourroom/${hostelId}`
      );
      if (response.status === 200) {
        setAllUsers(allUsers.filter((hostel) => hostel._id !== hostelId));
        setActiveRow(null);
      }
    } catch (error) {
      console.log("Error while deleting hostel:", error);
    }
  };

  const handleViewButton = () => {
    setActiveRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveButton = async () => {
    Swal.fire({
      title: "Updated",
      text: "The Changes Have Been Updated",
      icon: "success",
      background: "#e1e6ed",
    });
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/bookyourroom/${editData._id}`,
        editData
      );
      setAllUsers(
        allUsers.map((user) =>
          user._id === editData._id ? response.data : user
        )
      );
      setActiveRow(null);
      setEditMode(false);
      getAllUserInfo();
    } catch (error) {
      console.log("Error while updating hostel", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // handle empty date case
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${
      date.getDate().toString().padStart(2, "0")
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="w-full mr-5 border-2 rounded-lg h-auto">
      <table className="w-full p-2 h-auto">
        <thead className="h-20 font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-start">
            <td className="ml-2">ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>City</td>
            <td>State</td>
            <td>R-Type</td>
            <td>R-No</td>
            <td>J-Date</td>
            <td>V-Date</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((allUser, index) => (
            <tr
              className="text-start border h-20 text-sm font-md leading-6 text-gray-900"
              key={allUser._id}
            >
              <td>{index + 1}</td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={`${editData.firstName} ${editData.lastName}`}
                    onChange={(e) => {
                      const [firstName, lastName] = e.target.value.split(" ");
                      setEditData({ firstName, lastName });
                    }}
                  />
                ) : (
                  `${allUser.firstName} ${allUser.lastName}`
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    pattern="[a-zA-Z0-9._%+-]+@gmail.com"
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.email
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="phoneNo"
                    maxLength={11}
                    value={editData.phoneNo}
                    onKeyDown={(e) => {
                      if (e.keyCode === 8 || /^[0-9]$/.test(e.key)) {
                        return; // Allow default behavior
                      } else {
                        e.preventDefault(); // Prevent other characters from being typed
                      }
                    }}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.phoneNo
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="city"
                    value={editData.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.city
                )}
              </td>

              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="state"
                    value={editData.state}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.state
                )}
              </td>

              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="roomType"
                    value={editData.roomType}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.roomType
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="number"
                    name="roomNo"
                    value={editData.roomNo}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.roomNo
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="joiningDate"
                    value={formatDate(editData.joiningDate)}
                    onChange={handleInputChange}
                  />
                ) : (
                  formatDate(allUser.joiningDate)
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="vacateDate"
                    value={formatDate(editData.vacateDate)}
                    onChange={handleInputChange}
                  />
                ) : (
                  formatDate(allUser.vacateDate)
                )}
              </td>

              {activeRow === index ? (
                <>
                  <td colSpan="5" className=""></td>
                  <td className="flex space-x-2 mr-0 pt-5 -ml-28">
                    {editMode ? (
                      <button
                        onClick={handleSaveButton}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={handleUpdateButton}
                        className="bg-[#4AA4D9] text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteButton(allUser._id)}
                      className="bg-[#F85A50] text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleViewButton}
                      className="bg-[#4AA4D9] text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="pl-8">
                    <img
                      src={setting}
                      alt="setting"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleSettingButton(index)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
