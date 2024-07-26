import React, { useEffect, useLayoutEffect, useState } from "react";
import HostelCard from "../../components/HostelCard";
import HostelDetailCard from "../../components/HostelDetailCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalAuthContext } from "../../store/context/auth-context";
import DisabledContext from "antd/es/config-provider/DisabledContext";

const HostelDetails = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [relatedHostels, setRelatedHostels] = useState([]);
  const { isAuthenticated } = useGlobalAuthContext();

  const { id } = useParams();
  async function getdetails() {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/posthostel/${id}`
    );
    console.log(data);
    setData(data.hostel);
    setRelatedHostels(data.relatedHostels);
  }
  useLayoutEffect(() => {
    getdetails();
  }, []);

  const handleBookNow = async (id) => {
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/bookhostel",
      { hostelId: id },
      {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDViNTgyNTEyMjM0NTdjMWJiYzdhNiIsInVzZXJlbWFpbCI6InRlc3R1c2VyQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzE1ODQ0NDgzLCJleHAiOjE3MTU4NDUzODN9.9dFz-w3UJLfe3NQ32I0BVjme0wjENo_HJW1cLHdpaaY",
        },
      }
    );

    const params = new URLSearchParams();
    params.append("hid", id);
    navigate(`/BookYourRoom?${params.toString()}`);
  };

  return (
    Object.keys(data).length > 0 && (
      <div className="p-16">
        <div className="grid grid-cols-2 gap-32">
          <div>
            <p className="text-2xl pb-3 font-semibold text-[#2296EA] ml-48">
              Hostel Details
            </p>
            <div>
              <HostelDetailCard
                images={data.images}
                imagewidth="3/4"
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
          <div className="w-full">
           
            <div className="w-full">

            <h1 className="mt-1 pb-3 text-lg font-bold leading-6 text-gray-900 ">Signup first to book a room or post your hostel</h1>

            <br />
             
              <div className="w-full flex items-center justify-center">
                
                <a href="/Register" className="text-center py-2 px-10 flex items-center justify-center text-sm font-bold leading-6 w-full pb-3 bg-sky-500 hover:bg-sky-700 rounded-lg  h-16  border text-white ">
                  Sign In
                </a>
            
              </div>
              <br />
              <h3 className="text-2xl pb-3 font-semibold text-[#2296EA]">Features</h3>
              <table className="flex flex-col gap-y-4 text-2xl w-full border-2 shadow-inner rounded-xl h-full">
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4 mt-5 text-sm font-bold leading-6 text-gray-900  ">Condition</td>
                  <td className= "  mr-5 mt-5 text-sm font-bold leading-6 text-gray-900  capitalize">{data.condition}</td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4  text-sm font-bold leading-6 text-gray-900  ">Floor</td>
                  <td className="  mr-5 text-sm font-bold leading-6 text-gray-900  capitalize">{data.floor}</td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4 text-sm font-bold leading-6 text-gray-900  ">Bills</td>
                  <td className="  mr-5  text-sm font-bold leading-6 text-gray-900  capitalize">{data.bills}</td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4  text-sm font-bold leading-6 text-gray-900 ">Rent Period</td>
                  <td className="  mr-5  text-sm font-bold leading-6 text-gray-900  capitalize">
                    {data.rentPeriod === "1" ? "Per Month" : data.rentPeriod}
                  </td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4  text-sm font-bold leading-6 text-gray-900 ">Bathroom</td>
                  <td className="  mr-5  text-sm font-bold leading-6 text-gray-900  capitalize">
                    {data.bathroom === "yes" ? "Attached" : data.bathroom}
                  </td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4 text-sm font-bold leading-6 text-gray-900  "> Mess</td>
                  <td className="  mr-5  text-sm font-bold leading-6 text-gray-900  capitalize">
                    {data.mess === "yes" ? "Included" : data.mess}
                  </td>
                </tr>
                <tr className="flex w-full align-middle justify-between">
                  <td className=" ml-4 mb-5 text-sm font-bold leading-6 text-gray-900 ">Lawn</td>
                  <td className="  mr-5 mb-5  text-sm font-bold leading-6 text-gray-900 capitalize">{data.lawn}</td>
                </tr>
              </table>
              <br /><br />

              {isAuthenticated && (
              <button
                className=" text-center text-sm py-2 px-10 font-bold flex items-center justify-center leading-6 w-full pb-3  bg-blue-400 rounded-lg  h-16  border text-white "
                onClick={() => handleBookNow(data._id) }
              >
                Book Now
              </button>
            )}

              {/* <button
                className="text-2xl text-center w-full pb-3 font-semibold text-[#2296EA]"
                onClick={() => handleBookNow(data._id) }
              >
                Book Now
              </button> */}
            </div>
          </div>
        </div>
        <div className="p-16">
          <h1 className="text-2xl pb-3  font-semibold text-[#2296EA]">Amenities</h1>
          <br />
          <div className="grid grid-cols-3 gap-x-20 gap-y-10">
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center rounded-xl items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/Wi-Fi.png" />
              {data.wifi === "yes" ? "Wi-fi" : " Available"}
            </p>
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center   rounded-xl  items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/Fridge.png" />
              {data.mineralWater === "yes" ? "Mineral Water" : " Available"}
            </p>
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center  rounded-xl  items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/Officer.png" />
              {data.securityGuard === "yes" ? "Security Guard" : " Available"}
            </p>
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center  rounded-xl  items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/Reading.png" />
              {data.studyRoom === "yes" ? "Study Room" : " Available"}
            </p>
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center  rounded-xl  items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/Camera.png" />
              {data.cctv === "yes" ? "CCTV Camera" : " Available"}
            </p>
            <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center   rounded-xl items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
              <img src="/electricity.png" />
              {data.laundary === "yes" ? "Laundary" : " Available"}
            </p>
          </div>
        </div>
        <div className="p-16">
          {relatedHostels.length > 0 && (
            <h1 className="py-6 text-2xl font-bold">Related Hostels</h1>
          )}
          <div>
            {relatedHostels.length > 0 && (
              <div className="grid grid-cols-3 gap-4 -ml-10">
                {relatedHostels.map((hostel) => {
                  return (
                    <HostelDetailCard
                      images={hostel.images}
                      imagewidth="3/4"
                      // review="5.0 (120 Reviews)"
                      hostelName={hostel.hostelName}
                      location={hostel.hostelAddress}
                      rent={`${hostel.rent} PKR/`}
                      // category={`${hostel.hostelType} Hostel`}
                  
                      
                    />
                    
                    
                  );
                })}
                <a href="/AllHostels" className="text-center mt-96 flex items-center justify-center text-sm font-bold leading-6 w-60 ml-60 pb-3  bg-blue-400 rounded-lg  h-16  border text-white ">
                  Show All
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default HostelDetails;
