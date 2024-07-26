import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TotalHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const getHostel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel"
      );
      setHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostel();
  }, []);

  const handleDeleteButton = async (hostelId) => {
    Swal.fire({
      title: "Deleted",
      text: "The Hostel Has Been Deleted",
      icon: "error",
      background: "#e1e6ed"
    });
    try {
      await axios.delete(`http://localhost:8000/api/v1/posthostel/${hostelId}`);
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

  const handleUpdateButton = (index) => {
    setEditMode(true);
    setActiveRow(index);
    setEditData(hostels[index]);
  };

  const handleSaveButton = async () => {
    Swal.fire({
      title: "Updated",
      text: "The Hostel Has Been Updated",
      icon: "success",
      background: "#e1e6ed"
    });
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

  const handleViewButton = (hostelId) => {
    navigate("/AdminDashboard/hostelgeneraldetails");
  };

  async function handleCheckClick(id, active) {
    let value = active === "TRUE" ? "FALSE" : "TRUE";
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posthostel/${id}/status`,
        { value }
      );
      if (response.data.success) {
        toast.info("Hostel status updated");
        getHostel(); // Refresh the list after update
      }
    } catch (error) {
      toast.error("Error updating hostel status");
    }
  }

  return (
    <div className="w-full h-auto">
      <table className="w-full p-2 h-auto">
        <thead className="h-16 font-serif border bg-[#EAF4FC]">
          <tr>
            <th>ID</th>
            <th>Hostel Name</th>
            <th>Location</th>
            <th>Active/Deactive</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={hostel._id} className="border h-16 font-serif">
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
                    name="hostelAddress"
                    value={editData.hostelAddress}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelAddress
                )}
              </td>
              <td>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={hostel.active === "TRUE"}
                    onClick={() => handleCheckClick(hostel._id, hostel.active)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </td>
              <td className="space-x-2">
                {hostel.active === "TRUE" && (
                  <>
                    <button
                      onClick={() => handleUpdateButton(index)}
                      className="bg-[#4AA4D9] py-1 px-4 text-white rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteButton(hostel._id)}
                      className="bg-[#F85A50] py-1 px-4 text-white rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewButton(hostel._id)}
                      className="bg-[#4AA4D9] py-1 px-6 text-white rounded-lg"
                    >
                      View
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalHostels;
