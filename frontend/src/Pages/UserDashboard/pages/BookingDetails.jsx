import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingDetails = () => {
  const [bookingInfo, setBookingInfo] = useState({});

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/bookyourroom/userroom"
      );
      setBookingInfo(data);
    }
    getUserData();
  }, []);

  return (
    <div className="w-full h-screen">
      <table className=" w-full p-2 h-auto">
        <thead className="h-11 border bg-[#4aa4d9] text-white">
          <tr className="">
            <td>ID</td>
            <td>City</td>
            <td>State</td>
            <td>R-Type</td>
            <td>R-No</td>
            <td>J-Date</td>
            <td>V-Date</td>
          </tr>
        </thead>
        <tbody className="border h-11">
          <tr>
            <td>1</td>
            <td>{bookingInfo?.city}</td>
            <td>{bookingInfo?.state}</td>
            <td>{bookingInfo?.roomType}</td>
            <td>{bookingInfo?.roomNo}</td>
            <td>{bookingInfo?.joiningDate?.split("T")[0]}</td>
            <td>{bookingInfo?.vacateDate?.split("T")[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetails;
