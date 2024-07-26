import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, createSearchParams } from "react-router-dom";
import { IoIosFemale, IoMdMale } from "react-icons/io";
import Carasoule from "./Carasoule";

const HostelCard = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  console.log(props.images);
  const fetchHostelDetails = (id) => {
    navigate(`/HostelDetails/${id}`);
  };

  let items = props.images.map((image) => `${baseUrl}/${image}`);

  function handleViewOnMap() {
    console.log(JSON.parse(props.address));
    const { lat, lng } = JSON.parse(props.address);
    const params = {
      lat: lat,
      lng: lng,
    };
    const options = {
      pathname: "/Map",
      search: `?${createSearchParams(params)}`,
    };
    navigate(options, { replace: true });
    // navigate("/Map");
  }

  return (
    <div className="grid grid-cols-2 border-2  border-gray-100 bg-gray-50 rounded-xl h-72 shadow-sm w-full">
      <div className="mt-9 ml-8" >  
        {/* <img src={`${items[0]}`} alt="image5" width={400} className="h-full" /> */}
        <Carasoule items={items} />
      </div>
      <div className="">
        <div className="flex ml-4">
          {/* <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" /> */}
          <h1 className="pl-3">{props.review}</h1>
        </div>
        <div className="mt-16 ml-4 ">
          <h1 className="font-bold text-2xl">{props.hostelName}</h1>
          <p className="my-2">{props.location}</p>
          <h2>
            <span className="font-bold text-lg">{props.rent}</span> Per Month
          </h2>

          <div className="flex align-middle justify-between mt-2">
            <div className="flex flex-col gap-0 leading-3">
              <button
                onClick={handleViewOnMap}
                className="text-[#39573E] text-xl"
              >
                View on map
              </button>
              <div className="flex align-middle items-center gap-2">
                {props.category == "boys" ? <IoMdMale /> : <IoIosFemale />}
                <h1 className="text-lg">{props.category}</h1>
              </div>
            </div>
            <button
              className="bg-sky-500 hover:bg-sky-700 h-10 text-center items-center text-white mr-8 mt-8 rounded-xl py-2 px-8"
              onClick={() => fetchHostelDetails(props.id)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
