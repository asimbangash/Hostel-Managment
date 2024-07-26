// import React, { useEffect, useState } from "react";
// import setting from "../../../../public/Settings.png";
// import axios from "axios";

// const HostelFacilities = () => {
//   const [hostels, setHostels] = useState([]);
//   const [activeRow, setActiveRow] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({});

//   useEffect(() => {
//     const getHostelFacilities = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/postHostel"
//         );
//         setHostels(response.data.hostels);
//         console.log(response.data.hostels);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getHostelFacilities();
//   }, []);

//   const handleSettingClick = (index) => {
//     setActiveRow(index);
//   };

//   const handleDelete = async (hostelId) => {
//     // try {
//     //   await axios.delete(`http://localhost:8000/api/v1/posthostel/${hostelId}`);
//     //   setHostels(hostels.filter((hostel) => hostel._id !== hostelId));
//     //   setActiveRow(null);
//     // } catch (error) {
//     //   console.log("Error while deleting hostel", error);
//     // }
//     try {
//       await axios.patch(`http://localhost:8000/api/v1/posthostel/${hostelId}`, {
//         parking: "",
//         geyser: "",
//         securityGuard: "",
//         studyRoom: "",
//         gym: "",
//         cctv: "",
//         wifi: "",
//         laundary: "",
//         mineralWater: "",
//       });
//       setHostels(
//         hostels.map((hostel) =>
//           hostel._id === hostelId
//             ? {
//                 ...hostel,
//                 ...{
//                   parking: "",
//                   geyser: "",
//                   securityGuard: "",
//                   studyRoom: "",
//                   gym: "",
//                   cctv: "",
//                   wifi: "",
//                   laundary: "",
//                   mineralWater: "",
//                 },
//               }
//             : hostel
//         )
//       );
//       setActiveRow(null);
//     } catch (error) {
//       console.log("Error while deleting hostel facilities", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleUpdate = (index) => {
//     setEditMode(true);
//     setActiveRow(index);
//     setEditData(hostels[index]);
//   };

//   const handleSave = async () => {
//     console.log("called");
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/v1/posthostel/${editData._id}`,
//         editData
//       );
//       setHostels(
//         hostels.map((hostel) =>
//           hostel._id === editData._id ? response.data : hostel
//         )
//       );
//       setActiveRow(null);
//       setEditMode(false);
//       getHostel();
//     } catch (error) {
//       console.log("Error while updating hostel", error);
//     }
//   };

//   return (
//     <div className="w-11/12 h-auto">
//       <table className=" w-full p-2 h-auto">
//         <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
//           <tr className="text-center">
//             <td>ID</td>
//             <td>Parking</td>
//             <td>Geyser</td>
//             <td>Security Guard</td>
//             <td>Study Room</td>
//             <td>GYM</td>
//             <td>CCTV Cameras</td>
//             <td>Wi-Fi</td>
//             <td>Laundry</td>
//             <td>Mineral Water</td>
//             <td>Setting</td>
//           </tr>
//         </thead>
//         <tbody>
//           {hostels.map((hostel, index) => (
//             <tr key={index} className="border text-center h-20 font-serif">
//               <td>{index + 1}</td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="parking"
//                     value={editData.parking}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.parking
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="geyser"
//                     value={editData.geyser}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.geyser
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="securityGuard"
//                     value={editData.securityGuard}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.securityGuard
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="studyRoom"
//                     value={editData.studyRoom}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.studyRoom
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="gym"
//                     value={editData.gym}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.gym
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="cctv"
//                     value={editData.cctv}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.cctv
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="wifi"
//                     value={editData.wifi}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.wifi
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="laundary"
//                     value={editData.laundary}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.laundary
//                 )}
//               </td>
//               <td>
//                 {activeRow === index && editMode ? (
//                   <input
//                     type="text"
//                     name="mineralWater"
//                     value={editData.mineralWater}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   hostel.mineralWater
//                 )}
//               </td>

//               <td className="pl-8">
//                 {activeRow === index ? (
//                   <div className="flex gap-x-3">
//                     <button
//                       onClick={() => handleDelete(hostel._id)}
//                       className="bg-[#F85A50] py-1 px-4 text-white rounded-lg "
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleUpdate(index)}
//                       className="bg-[#4AA4D9] py-1 px-4 text-white rounded-lg"
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleSave(index)}
//                       className="bg-yellow-500 text-white px-4 py-1 rounded-lg "
//                     >
//                       Save
//                     </button>
//                   </div>
//                 ) : (
//                   <img
//                     src={setting}
//                     alt="setting"
//                     className="w-6 h-6 cursor-pointer"
//                     onClick={() => handleSettingClick(index)}
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         {/* <tbody className="border text-center h-20 font-serif">
//           <tr>
//             <td>2</td>
//             <td>Yes</td>
//             <td>Yes</td>
//             <td>Yes</td>
//             <td>No</td>
//             <td>No</td>
//             <td>No</td>
//             <td>Yes</td>
//             <td>No</td>
//             <td>Yes</td>
//             <td className="pl-8">
//               <img src={setting} alt="setting" className="w-6 h-6" />
//             </td>
//           </tr>
//         </tbody> */}
//       </table>
//     </div>
//   );
// };

// export default HostelFacilities;
import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";
import Swal from "sweetalert2";


const HostelFacilities = () => {
  const [hostels, setHostels] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const getHostelFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
        console.log(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelFacilities();
  }, []);

  const handleSettingClick = (index) => {
    setActiveRow(index);
  };

  const handleDelete = async (hostelId) => {
    Swal.fire({
      title: "Deleted",
      text: "The Record Has Been Deleted",
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
        `http://localhost:8000/api/v1/postHostel/${editData._id}`,
        editData
      );
      setHostels(
        hostels.map((hostel) =>
          hostel._id === editData._id ? response.data : hostel
        )
      );
      setActiveRow(null);
      setEditMode(false);
    } catch (error) {
      console.log("Error while updating hostel", error);
    }
  };

  return (
    <div className="w-full mr-5 border-2 rounded-lg h-auto">
      <table className=" w-full mr-5 p-2 h-auto">
        <thead className="h-20 justify-normal font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-start ">
            <td>ID</td>
            <td>Parking</td>
            <td>Geyser</td>
            <td>Security Guard</td>
            <td>Study Room</td>
            <td>GYM</td>
            <td>CCTV Cameras</td>
            <td>Wi-Fi</td>
            <td>Laundry</td>
            <td>Mineral Water</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index} className="border  rounded-lg text-start h-20 text-sm font-md leading-6 text-gray-900 ">
              <td>{index + 1}</td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="parking"
                    value={editData.parking}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.parking
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="geyser"
                    value={editData.geyser}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.geyser
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="securityGuard"
                    value={editData.securityGuard}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.securityGuard
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="studyRoom"
                    value={editData.studyRoom}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.studyRoom
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="gym"
                    value={editData.gym}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.gym
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="cctv"
                    value={editData.cctv}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.cctv
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="wifi"
                    value={editData.wifi}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.wifi
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="laundary"
                    value={editData.laundary}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.laundary
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="mineralWater"
                    value={editData.mineralWater}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.mineralWater
                )}
              </td>

              <td className="pl-8 ">
                {activeRow === index ? (
                  <div className="flex gap-x-1 -ml-40">
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
                      onClick={handleSave}
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

export default HostelFacilities;
