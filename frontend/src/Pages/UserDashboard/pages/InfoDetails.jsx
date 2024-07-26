import axios from "axios";
import React, { useEffect, useState } from "react";

const InfoDetails = () => {
  const [userInfo, setUserInfo] = useState({});
 
  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get("http://localhost:8000/api/v1/users");
      setUserInfo(data);
    }
    getUserData();
  }, []);

  return (
    <div className="w-full h-screen dark:text-white">
      <table className=" w-full p-2 h-auto">
        <thead className="h-11 border bg-[#4aa4d9] text-white">
          <tr className="">
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            {/* <td>Phone</td>
            <td>City</td>
            <td>State</td> */}
          </tr>
        </thead>
        <tbody className="border h-11">
          <tr>
            <td>1</td>
            <td>{userInfo?.name}</td>
            <td>{userInfo?.email}</td>
            <td>{userInfo?.phoneNo}</td>
            <td>{userInfo?.city}</td>
            <td>{userInfo?.state}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoDetails;
