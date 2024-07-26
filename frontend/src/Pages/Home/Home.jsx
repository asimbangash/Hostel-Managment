import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalHostelContext } from "../../store/context/hostels-context";
import AutoComplete from "react-google-autocomplete";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { setHostels } = useGlobalHostelContext();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSearchClick = async () => {
    console.log(location);
    console.log(category);
    setLoading(true);
    ScrollToTop();  // Scroll to top before making the API call
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/searchhostel",
      { searchTitle: location, category }
    );
    console.log(data);
    if (data.success && data.searchHostel.length > 0) {
      setLoading(false);
      setHostels(data.searchHostel);
      const params = new URLSearchParams();
      params.append("search", location);
      params.append("category", category);
      navigate(`/AllHostels?${params.toString()}`);
    } else {
      alert("No Hostel Found");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative max-w-screen-2xl">
        <div className="max-w-screen-2xl">
          <img className="container max-width: 1536px;" src="image.png" alt="image" />
        </div>
        <div className="absolute inset-0 md:pt-8 pt-2 font-serif z-10 w-4/5 m-auto">
          <h1 className="md:text-3xl text-sm">
            SEARCH HOSTEL IN <span className="text-white">PESHAWAR</span> <br />{" "}
            Feels Like Home
          </h1>
          <h1 className="md:text-xl text-xs md:pt-2 pt-1 md:leading-8">
            Search The Location And Select The Category <br /> To Find Hostels
            Accordingly
          </h1>
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <div className="mt-0 relative -bottom-6 flex bg-white md:w-4/5 m-auto h-20 border-sky-400 rounded-l-3xl">
        <div className="flex text-[0.6rem] md:text-base border-4 rounded-l-3xl border-yellow-300 relative">
          <input
            type="text"
            placeholder="Type Your Desired Location"
            className="border-none md:p-4 md:w-96 w-40 focus:outline-blue-600 rounded-l-3xl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {/* <AutoComplete
            apiKey=""
            onPlaceSelected={(place) => setLocation(place)}
            className="border-none p-4 w-96 rounded-3xl"
          /> */}
          <img
            src="location.png"
            className="md:h-10 md:w-7 h-8 w-5 absolute top-5 md:right-2 right-0"
          />
        </div>
        <br /><br /><br />
        <div class=""></div>
        <select
          className="p-4 ml-0.5 md:w-1/2 cursor-pointer md:text-base text-[0.6rem] w-32 px-2 border-4 border-yellow-300 focus:outline-blue-600 rounded-r-0xl"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          <option>Boys</option>
          <option>Girls</option>
        </select>
        <button
          onClick={handleSearchClick}
          className="ml-0.5 md:px-6 px-2 md:w-1/2 md:text-base text-[0.6rem] bg-[#2296EA] border-4 border-yellow-300 rounded-r-3xl"
        >
          {loading ? "Loading..." : "Find Hostel"}
        </button>
      </div>
      {/* <Slider {...settings}>
        <div className="md:my-56 my-28">
          <img src="image2.png" alt="image2" className="h-42 md:h-full w-full" />
        </div>
        <div className="md:my-56 my-28">
          <img src="image11.jpg" alt="image2" className="h-36 md:h-[28rem] w-full" />
        </div>
        <div className="md:my-56 my-28">
          <img src="image12.jpg" alt="image2" className="h-36 md:h-[28rem] w-full" />
        </div>
        <div className="md:my-56 my-28">
          <img src="image13.jpg" alt="image2" className="h-36 md:h-[28rem] w-full" />
        </div>
      </Slider> */}
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <div className="md:grid md:grid-cols-2 md:mx-36">
        <div>
          <img src="image3.png" alt="image3" className="h-64 w-90" />
          <img src="image4.png" alt="image4" className="h-64 w-90 mt-[-2rem] ml-[5rem]" />
        </div>
        <div className="pl-2 md:mt-0 mt-4 border-2 h-80 rounded-lg border-blue-100 shadow-2xl">
          <br />
          <h1 className="text-[#2296EA] text-2xl font-bold">About</h1>
          <h2 className="pt-5 text-xl">
            Welcome to our Hostel Allocation and Reservation Portal (HARP).
          </h2>
          <p className="md:pt-10 pt-4 font-serif prose-zinc font-medium leading-7">
            For students and job holders in unfamiliar cities, finding hostels
            near universities or workplaces can be challenging due to limited
            space. Our website/app simplifies this by using Google Maps
            integration. Easily locate nearby hostels based on your university,
            workplace, or any desired location, making the search hassle-free
            for students and job holders alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
