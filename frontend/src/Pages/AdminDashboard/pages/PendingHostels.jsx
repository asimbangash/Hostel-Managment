import React, { useEffect, useState } from "react";
import HostelDetailCard from "../../../components/HostelDetailCard";
import { Link } from "react-router-dom";
import image from "../../../../public/image5.png";
import wifi from "../../../../public/Wi-Fi.png";
import Fridge from "../../../../public/Fridge.png";
import Officer from "../../../../public/Officer.png";
import Reading from "../../../../public/Reading.png";
import Camera from "../../../../public/Camera.png";
import electricity from "../../../../public/electricity.png";
import axios from "axios";
import AdminHostelDetailCard from "../../../components/AdminHostelDetailCard";
import Swal from 'sweetalert2'


const PendingHostels = () => {
  const [pendingHostels, setPendingHostels] = useState([]);

  const getAllHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel",
        {
          params: { status: "pending" },
        }
      );
      console.log(response.data.hostels);
      setPendingHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel",
        {
          params: { status: "pending" },
        }
      );
      console.log(response.data.hostels);
      let filteredHostels = response.data.hostels.filter(
        (hostel) => hostel.status !== "approved" || "rejected"
      );
      setPendingHostels(filteredHostels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

  async function handleupdate(id, status) {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posthostel/${id}/status`,
        {
          status,
        }
      );
      // setResponseMessage(response.data.message);
      if (response.data.success) {
        Swal.fire({
          title: "Approved",
          text: "The Hostel Has Been Added In All Hostel List",
          icon: "success"
        });
        
        // alert("hostel updated");
        getAll();
      }
    } catch (error) {
      setResponseMessage("Error updating hostel status");
    }
  }
  async function handleupdate1(id, status) {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posthostel/${id}/status`,
        {
          status,
        }
      );
      // setResponseMessage(response.data.message);
      if (response.data.success) {
        Swal.fire({
          title: "Rejected",
          text: "The Hostel Has Been Rejected",
          icon: "error"
        });
        // alert("hostel updated");
        getAll();
      }
    } catch (error) {
      setResponseMessage("Error updating hostel status");
    }
  }

  return (
    <div>
      {pendingHostels.length > 0 ? (
        <div>
          {pendingHostels.map((data) => {
            return (
              <div>
                <div className="flex flex-row gap-0 dark:bg-gray-700 dark:text-white ml-24">
                  <div>
                    <h1 className="text-[#2296EA] font-bold pl-4 text-lg mb-3">
                      Hostel Details
                    </h1>
                    <div>
                      <AdminHostelDetailCard
                        images={data.images}
                        imagewidth="1/4"
                        imageheight="72"
                        // review="5.0 (120 Reviews)"
                        hostelName={data.hostelName}
                        location={data.hostelAddress}
                        rent={`${data.rent} PKR/`}
                        category={`${data.hostelType} Hostel`}
                        showbtn={false}
                      />
                    </div>
                  </div>
                  <div className="ml-32 mr-12">
                    <div className="w-full ">
                      <table className="flex flex-col gap-y-4 text-2xl w-96">
                        <tr className="flex w-full align-middle justify-between">
                          <button
                            className="bg-[#F85A50] px-8 py-1 rounded-lg text-white"
                            onClick={() => handleupdate1(data._id, "rejected")}
                          >
                            Reject
                          </button>
                          <button
                            className="bg-[#4AA4D9] px-8 py-1 rounded-lg text-white"
                            onClick={() => handleupdate(data._id, "approved")}
                          >
                            Approve
                          </button>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Condition</td>
                          <td className="capitalize">{data.condition}</td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Floor</td>
                          <td className="capitalize">{data.floor}</td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Bills</td>
                          <td className="capitalize">{data.bills}</td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Rent Period</td>
                          <td className="capitalize">
                            {data.rentPeriod === "1"
                              ? "Per Month"
                              : data.rentPeriod}
                          </td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Bathroom</td>
                          <td className="capitalize">
                            {data.bathroom === "yes"
                              ? "Attached"
                              : data.bathroom}
                          </td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Mess</td>
                          <td className="capitalize">
                            {data.mess === "yes" ? "Included" : data.mess}
                          </td>
                        </tr>
                        <tr className="flex w-full align-middle justify-between">
                          <td>Lawn</td>
                          <td className="capitalize">{data.lawn}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className=" ml-28">
                  <h1 className="text-2xl py-6 font-bold">Amenities</h1>
                  <div className="grid grid-cols-3 gap-x-36 gap-y-10">
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={wifi} className="h-14 w-8" />
                      {data.wifi === "yes" ? "Wi-fi" : "Available"}
                    </div>
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={Fridge} className="h-6"  />
                      {data.mineralWater === "yes"
                        ? "Mineral Water"
                        :  "  Available"}
                    </div>
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={Officer} className="h-10" />
                      {data.securityGuard === "yes"
                        ? "Security Guard"
                        : "Available"}
                    </div>
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={Reading} className="h-20" />
                      {data.studyRoom === "yes" ? "Study Room" : "Available"}
                    </div>
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={Camera} className="h-16" />
                      {data.cctv === "yes" ? "CCTV Camera" : "Available"}
                    </div>
                    <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                      <img src={electricity} className="h-8" />
                      {data.laundary === "yes" ? "Laundary" : "Available"}
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-black my-5"></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>There is NO Pending Hostels</div>
      )}
    </div>
  );
};

export default PendingHostels;
