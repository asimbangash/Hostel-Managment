import React from "react";
import { FaStar } from "react-icons/fa";
import Carasoule from "./Carasoule";

const HostelDetailCard = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex flex-col border-2 ml-20 border-gray-100 w-96 h-fit rounded-xl shadow-inner" >
      <div className="mt-7 ml-24 "> 
        <img
          src={`${baseUrl}/${props.images[0]}`}
          // src={props.images}
          alt="image5"
          // className={`w-${props.imagewidth} h-${
          //   props.imageheight ? props.imageheight : "[10rem]"
          // } rounded-xl`} 
        />
        {/* <Carasoule items={props.images} /> */}
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
        <div className="mt-4 ml-24">
          <h1 className="font-bold text-2xl">{props.hostelName}</h1>
          <p className="my-4">{props.location}</p>
          <h2>
            <span className="font-bold text-lg ">{props.rent}</span>Per Month
          </h2>
          {/* <h3 className="text-[#39573E] mt-4 text-xl">View on map</h3> */}
          {props.showbtn && (
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center mb-4">
                <img src="image6.png" alt="image6" className="" />
                <h1 className="text-lg">{props.category}</h1>
              </div>
              <div className="mb-4 ml-32">
                <button className="bg-[#2296EA] text-white rounded-xl py-2 px-8">
                  Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelDetailCard;
