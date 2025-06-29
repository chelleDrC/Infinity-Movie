import { CiSearch } from "react-icons/ci";

//React
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Context
import { useSearch } from "../../Context/search";

//Api
import { searchMovies } from "../../services/api";
function DesktopNav() {
  const [query, setQuery] = useState("");
  const { setSearchResults, setSearchQuery } = useSearch();
  const navigate = useNavigate();

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
    <div className="flex flex-row max-w-full max-h-[60px] h-[60px] p-2 px-10 bg-gradient-to-r from-[#2B0017] to-[#54002D] text-white rounded-b-[20px]">
      {/* leftSide */}
      <div className="w-full h-full  flex items-center gap-5">
        <img src="/Logo.svg" alt="Logo" className="w-[97px]" />
        {/* Container of Tabs  */}
        <div>
          <div className="flex flex-row gap-4 ml-4">
            <Link
              to="/"
              className="transition-colors duration-300 hover:text-[#FF48AA] cursor-pointer"
            >
              Home
            </Link>

            <Link
              to="/my-list"
              className="transition-colors duration-300 hover:text-[#FF48AA] cursor-pointer"
            >
              My List
            </Link>
          </div>
        </div>
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
            className=" w-[50px] h-full flex items-center justify-center text-[25px] hover:bg-[#71334f] rounded-2xl hover:text-[#FF48AA] transition-colors duration-300"
          >
            <CiSearch className="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DesktopNav;
