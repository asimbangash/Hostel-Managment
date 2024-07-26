import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";
import Swal from "sweetalert2";

const HostelSpecification = () => {
  const [hostels, setHostels] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const getHostelSpecification = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelSpecification();
  }, []);

  const handleSettingClick = (index) => {
    setActiveRow(index);
  };

  const handleDelete = async (hostelId) => {
    Swal.fire({
      title: "Updated",
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
      text: "The Changes Has Been Updated",
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
      <table className="w-full p-2 h-auto">
        <thead className="h-20 font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-start">
            <td>ID</td>
            <td>Rent per Month</td>
            <td>Rent Period</td>
            <td>Bill Included</td>
            <td>Condition</td>
            <td>Select Floor</td>
            <td>Bathroom</td>
            <td>Mess</td>
            <td>Lawn</td>
            <td>No of Rooms</td>
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
                    name="rent"
                    value={editData.rent}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.rent
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="rentPeriod"
                    value={editData.rentPeriod}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.rentPeriod
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="bills"
                    value={editData.bills}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.bills
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="condition"
                    value={editData.condition}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.condition
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="floor"
                    value={editData.floor}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.floor
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="bathroom"
                    value={editData.bathroom}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.bathroom
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="mess"
                    value={editData.mess}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.mess
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="lawn"
                    value={editData.lawn}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.lawn
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="numberOfRooms"
                    value={editData.numberOfRooms}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.numberOfRooms
                )}
              </td>
              <td className="pl-6">
                {activeRow === index ? (
                  <div className="flex gap-x-3 -ml-40">
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

export default HostelSpecification;
