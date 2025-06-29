import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

// Sidebar Icons
import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa";

//React Router
import { Link } from "react-router-dom";

// Context
import { useSearch } from "../../Context/search";
import { useNavigate } from "react-router-dom";

//Api
import { searchMovies } from "../../services/api";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { setSearchResults, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      navigate("/search");
      return; // Prevent empty search
    }

    setSearchQuery(query);

    const results = await searchMovies(query);
    setSearchResults(results);

    navigate("/search"); // Navigate to the search page
  };

  return (
    <>
      <div className="flex flex-row max-w-full max-h-[60px] h-[60px] p-2 px-10 bg-gradient-to-r from-[#2B0017] to-[#54002D] text-white rounded-b-[20px]">
        {/* leftSide */}
        <div className="w-full h-full  flex items-center gap-5">
          <RxHamburgerMenu
            className="text-[25px] transition-text duration-300 hover:text-[28px] hover:text-[#FF48AA]"
            onClick={handleClick}
          />
          <img src="../public/Logo.svg" alt="Logo" className="w-[97px]" />
        </div>

        {/* rightSide */}
        <div className="w-full h-full ">
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-row items-center justify-end gap-2"
          >
            <input
              type="text"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="w-[50%] h-[60%] bg-white rounded-lg text-black p-3 outline-0"
            />
            <button
              type="submit"
              className=" w-[50px] h-full flex items-center justify-center"
            >
              <CiSearch className="text-[25px]" />
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar  */}

      <div
        className={`absolute top-0 left-0 w-[300px] h-screen rounded-r-2xl
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    transition-transform duration-300
    backdrop-blur-xs bg-gradient-to-r from-[#2B0017]/80 to-[#54002D]/80
    text-white z-50`}
      >
        <div className="w-full h-full flex  flex-col items-center  gap-10 pt-10 ">
          <div
            onClick={handleClick}
            className="w-[90%] h-auto flex flex-row items-center gap-5 cursor-pointer  hover:scale-105 transition-transform duration-300"
          >
            <img
              src="../public/Logo_version2.svg"
              alt="Logo"
              className="w-[50px] "
            />
            <span className="font-bold text-[16px]">Infinity Movie</span>
          </div>

          {/* Container of Tabs  */}
          <div className="w-full h-full flex flex-col gap-5">
            <span className="h-auto w-[90%] flex flex-col justify-between ml-4 text-[12px] ">
              NAVIGATE
            </span>
            <div className="h-[10%] w-[90%] flex flex-col justify-between ml-6">
              <Link
                to="/"
                className="transition-colors duration-300 flex gap-5 items-center hover:text-[#FF48AA] cursor-pointer"
              >
                <FaHome className="inline-block mr-2" />
                <span>Home</span>
              </Link>

              <Link
                to="/my-list"
                className="transition-colors duration-300 flex gap-5 items-center hover:text-[#FF48AA] cursor-pointer"
              >
                <FaList className="inline-block mr-2" />
                <span>My List</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
