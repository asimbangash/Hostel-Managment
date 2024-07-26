import React, { useState, useEffect } from "react";
import setting from "../../../../public/Settings.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const ActiveHostels = () => {
  const [ActiveHostels, setPendingHostels] = useState([]);

  const getAllHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel/active",
        {
          params: { active: "TRUE" },
        }
      );
      console.log(response.data.hostels);
      setPendingHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

  async function handleCheckClick(id, active) {
    let value = active === "TRUE" ? "FALSE" : "TRUE";
    console.log(id);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posthostel/${id}/status`,
        {
          value,
        }
      );
      // setResponseMessage(response.data.message);
      if (response.data.success) {
        toast.info("hostel updated");
        getAllHostels();
      }
    } catch (error) {
      setResponseMessage("Error updating hostel status");
    }
  }

  return (
    <div className="w-full h-auto">
      <div className="flex items-end justify-end pr-10 p-2">
        <Link
          to="/AdminDashboard/addnew"
          className="w-32 rounded-md p-1 text-center bg-blue-400 text-black"
        >
          Add New
        </Link>
      </div>
      <table className=" w-full p-2 h-auto">
        <thead className="h-16  font-serif border bg-[#EAF4FC]">
          <tr className="">
            <td>ID</td>
            <td>Hostel Name</td>
            <td>Location</td>
            <td>Active/Deative</td>
            <td>Verified/Not Verified</td>
            <td>Rent</td>
            {/* <td>Action</td> */}
          </tr>
        </thead>
        <tbody className="border h-16 font-serif">
          {ActiveHostels.map((h) => {
            return (
              <tr>
                <td>1</td>
                <td>{h.hostelName}</td>
                <td>{h.hostelAddress}</td>
                <td>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      defaultChecked={h.active === "TRUE" ? true : false}
                      onClick={() => handleCheckClick(h._id, h.active)}
                    />
                    <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </td>
                <td>{h.status}</td>
                <td>{h.rent}</td>
                {/* <td className="">
                  <img src={setting} alt="setting" className="w-6 h-6" />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveHostels;
