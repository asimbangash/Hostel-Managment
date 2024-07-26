import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import HostelCard from "./HostelCard";
import axios from "axios";
import { useGlobalHostelContext } from "../store/context/hostels-context";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faArrowAltCircleUp, faUser, faGear } from "@fortawesome/free-solid-svg-icons";

const AllHostels = () => {
  const location = useLocation();
  const query = new URLSearchParams(location);
  const search = query.get("search");

  const { hostels, setHostels } = useGlobalHostelContext();

  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");

  // Handlers for each group
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleFilterClick = () => {
    const startPrice = priceRange.split("-")[0];
    const endPrice = priceRange.split("-")[1];
    const filterHostels = hostels.filter(
      (hostel) =>
        hostel.rent >= startPrice &&
        hostel.rent <= endPrice &&
        hostel.hostelType === category
    );
    setHostels(filterHostels);
  };

  const getAllHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel",
        {
          params: { status: "approved" },
        }
      );
      setHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };
  const onCloseFilter = () => {
    getAllHostels();
    setPriceRange("");
    setCategory("");
    setRatings("");
  };

  useEffect(() => {
    if (!search) {
      getAllHostels();
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:grid md:grid-cols-12 flex flex-col w-11/12 m-auto">
      <div className=" border h-fit  bg-gray-50 ml-5 mt-20 mx-10  sticky rounded-xl pt-8 pl-6 col-span-4 ]">
        <h1 className="text-[#2296EA] text-2xl ml-6">Filter by</h1>
        {/* Price Range */}
        <div className="mt-8 ml-6">
          <h2 className="pb-2 font-medium">Price Range</h2>
          {["9000-12000", "8000-11000", "7000-10000", "6000-8000"].map(
            (range) => (
              <div key={range}>
                <input
                  type="checkbox"
                  checked={priceRange === range}
                  onChange={() => handlePriceChange(range)}
                />
                <label className="pl-3">{range}</label>
                <br />
              </div>
            )
          )}
        </div>

        {/* Select Category */}
        <div className="mt-6 ml-6">
          <h1 className="pb-2 font-medium">Select Category</h1>
          {["Boys", "Girls"].map((cat) => (
            <div key={cat}>
              <input
                type="checkbox"
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              <label className="pl-3">{cat}</label>
              <br />
            </div>
          ))}
        </div>

        <div className="flex gap-8 mt-14 mb-24">
          <button
            className=" ml-6 w-28 bg-sky-500 hover:bg-sky-700 rounded-lg text-white py-1 px-4"
            onClick={onCloseFilter}
          >
            Close
          </button>
          <button
            onClick={handleFilterClick}
            className="  bg-sky-500 hover:bg-sky-700 rounded-lg text-white py-1 px-4"
          >
            Apply Filter
          </button>
        </div>
      </div>
      <div className="mt-20 space-y-10 col-span-8 overflow-y-scroll custom-scrollbar h-screen">
        {hostels.map((hostel) => (
          <HostelCard
            key={hostel._id}
            id={hostel._id}
            images={hostel.images}
            hostelName={hostel.hostelName}
            location={hostel.hostelAddress}
            rent={hostel.rent}
            category={hostel.hostelType}
            address={hostel.location}
          />
        ))}
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4"
      >
         <FontAwesomeIcon icon={faArrowAltCircleUp}beat style={{ color: "#04276e" }} />
        
      </button>
    </div>
  );
};

export default AllHostels;
















// import React, { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import HostelCard from "./HostelCard";
// import axios from "axios";
// import { useGlobalHostelContext } from "../store/context/hostels-context";
// import { useLocation } from "react-router-dom";

// const AllHostels = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location);
//   const search = query.get("search");

//   const { hostels, setHostels } = useGlobalHostelContext();

//   const [priceRange, setPriceRange] = useState("");
//   const [category, setCategory] = useState("");
//   const [ratings, setRatings] = useState("");

//   // Handlers for each group
//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//   };

//   const handleCategoryChange = (value) => {
//     setCategory(value);
//   };

//   // const handleRatingsChange = (value) => {
//   //   setRatings(value);
//   // };

//   const handleFilterClick = () => {
//     const startPrice = priceRange.split("-")[0];
//     const endPrice = priceRange.split("-")[1];
//     const filterHostels = hostels.filter(
//       (hostel) =>
//         hostel.rent >= startPrice &&
//         hostel.rent <= endPrice &&
//         hostel.hostelType === category
//     );
//     setHostels(filterHostels);
//   };

//   const getAllHostels = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/v1/postHostel",
//         {
//           params: { status: "approved" },
//         }
//       );
//       setHostels(response.data.hostels);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const onCloseFilter = () => {
//     getAllHostels();
//     setPriceRange("");
//     setCategory("");
//     setRatings("");
//   };

//   useEffect(() => {
//     if (!search) {
//       getAllHostels();
//     }
//   }, []);

//   return (
//     <div className="md:grid md:grid-cols-12 flex flex-col w-11/12 m-auto">
//       <div className=" border h-fit  bg-gray-50 ml-5 mt-20 mx-10  sticky rounded-xl pt-8 pl-6 col-span-4 ]">
//         <h1 className="text-[#2296EA] text-2xl ml-6">Filter by</h1>
//         {/* Price Range */}
//         <div className="mt-8 ml-6">
//           <h2 className="pb-2 font-medium">Price Range</h2>
//           {["9000-12000", "8000-11000", "7000-10000", "6000-8000"].map(
//             (range) => (
//               <div key={range}>
//                 <input
//                   type="checkbox"
//                   checked={priceRange === range}
//                   onChange={() => handlePriceChange(range)}
//                 />
//                 <label className="pl-3">{range}</label>
//                 <br />
//               </div>
//             )
//           )}
//         </div>

//         {/* Select Category */}
//         <div className="mt-6 ml-6">
//           <h1 className="pb-2 font-medium">Select Category</h1>
//           {["Boys", "Girls"].map((cat) => (
//             <div key={cat}>
//               <input
//                 type="checkbox"
//                 checked={category === cat}
//                 onChange={() => handleCategoryChange(cat)}
//               />
//               <label className="pl-3">{cat}</label>
//               <br />
//             </div>
//           ))}
//         </div>

//         {/* Ratings */}
//         {/* <div className="mt-6 ml-6">
//           <h1 className="pb-2 font-medium">Ratings</h1>
//           {[
//             { label: "Excellent", value: "5" },
//             { label: "Wonderful", value: "4" },
//             { label: "Very Good", value: "3" },
//             { label: "Good", value: "2" },
//             { label: "Average", value: "1" },
//           ].map((rating) => (
//             <div className="grid grid-cols-2" key={rating.value}>
//               <div>
//                 <input
//                   type="checkbox"
//                   checked={ratings === rating.value}
//                   onChange={() => handleRatingsChange(rating.value)}
//                 />
//                 <label className="pl-3">{rating.label}</label>
//               </div>
//               <div className="flex">
//                 <FaStar className="text-yellow-300 pt-1" />
//                 <h6 className="pl-1">{rating.value}</h6>
//               </div>
//             </div>
//           ))}
//         </div> */}

//         <div className="flex gap-8 mt-14 mb-24">
//           <button
//             className="border border-[#3AACFF] rounded-lg py-1 px-8"
//             onClick={onCloseFilter}
//           >
//             Close
//           </button>
//           <button
//             onClick={handleFilterClick}
//             className="bg-[#1993D8] rounded-lg text-white py-1 px-4"
//           >
//             Apply Filter
//           </button>
//         </div>
//       </div>
//       <div className="mt-20 space-y-10 col-span-8 overflow-y-scroll custom-scrollbar h-screen">
//         {hostels.map((hostel) => (
//           <HostelCard
//             id={hostel._id}
//             images={hostel.images}
//             // review="5.0 (120 Reviews)"
//             hostelName={hostel.hostelName}
//             location={hostel.hostelAddress}
//             rent={hostel.rent}
//             category={hostel.hostelType}
//             address={hostel.location}
//           />
//         ))}
//         {/* 
//         <HostelCard
//           image="image7.png"
//           review="4.5 (80 Reviews)"
//           hostelName="Premium Girls Hostel"
//           location={
//             <>
//               street #8 Shaheen town, University Rd,
//               <br /> city, Peshawar
//             </>
//           }
//           rent="8000 PKR/"
//           category="Girls Hostel"
//         />
//         <HostelCard
//           image="image5.png"
//           review="5.0 (120 Reviews)"
//           hostelName="Youth Hostel Peshawar"
//           location={
//             <>
//               Arbab Road, H No.82, Alfalah St,
//               <br /> University Rd, Tehkal, Peshawar, Khyber
//               <br /> Pakhtunkhwa
//             </>
//           }
//           rent="9000 PKR/"
//           category="Boys Hostel"
//         />
//         <HostelCard
//           image="image7.png"
//           review="5.0 (120 Reviews)"
//           hostelName="Dua Girls Hostel"
//           location={
//             <>
//               street #8 Shaheen town, University Rd,
//               <br /> city, Peshawar
//             </>
//           }
//           rent="8000 PKR/"
//           category="Girls Hostel"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default AllHostels;
