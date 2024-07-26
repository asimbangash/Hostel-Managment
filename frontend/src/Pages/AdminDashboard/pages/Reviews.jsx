import React from "react";
import gamer from "../../../../public/gamer.png";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  return (
    <div className="shadow-2xl w-full rounded-2xl mx-6">
      <h1 className="text-xl font-semibold ml-10 my-6">Reviews</h1>
      <hr className="border-gray-100 my-2" />
      <div className="flex pl-10 pt-4 gap-x-4">
        <div className="w-32 h-32">
          <img src={gamer} />
        </div>
        <div>
          <h1 className="font-semibold">Jonash</h1>
          <h2 className="text-xs">4 review</h2>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <h3 className="pl-5">7 months ago</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eleifend ligula sed felis vehicula, at interdum tellus consequat.
            Integer feugiat, velit sed sagittis consequat, eros sem commodo
            nisl, id ultricies nunc mi ut justo. Vestibulum varius, leo id
            varius varius, nisi libero lacinia eros, sit amet tincidunt metus mi
            eget neque
          </p>
        </div>
      </div>
      <hr className="border-gray-100 my-2" />
      <div className="flex pl-10 pt-4 gap-x-4">
        <div className="w-32 h-32">
          <img src={gamer} />
        </div>
        <div>
          <h1 className="font-semibold">Jonash</h1>
          <h2 className="text-xs">4 review</h2>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <FaStar className="text-yellow-700 text-sm" />
            <h3 className="pl-5">7 months ago</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            eleifend ligula sed felis vehicula, at interdum tellus consequat.
            Integer feugiat, velit sed sagittis consequat, eros sem commodo
            nisl, id ultricies nunc mi ut justo. Vestibulum varius, leo id
            varius varius, nisi libero lacinia eros, sit amet tincidunt metus mi
            eget neque
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
