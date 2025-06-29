//Components
import MovieCard from "./Cards/movieCard";
//Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useRef } from "react";
import { useState, useCallback } from "react";

function Carousel({ movies, genre }) {
  const [isHovered, setIsHovered] = useState(false);

  //Referencing the scrollable div
  const scrollRef = useRef(null);

  return (
    <>
      <div
        className="w-full h-auto relative mb-[-100px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`absolute left-0 top-0 flex items-center justify-center w-[10%] h-full z-20 text-white transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => {
            scrollRef.current.scrollTo({
              left: scrollRef.current.scrollLeft - 400,
              behavior: "smooth",
            });
          }}
        >
          <IoIosArrowBack className="text-[25px] hover:text-[30px] transition-all duration-400 hover:text-[#FF48AA]" />
        </button>

        <div
          className="w-full relativez"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0.2),rgba(0,0,0,1), rgba(0,0,0,1),rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,0.2))",
            maskImage:
              "linear-gradient(to right,  rgba(0,0,0,0.2),rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1), rgba(0,0,0,1),  rgba(0,0,0,1),rgba(0,0,0,0.2))",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        >
          <span className="text-white relative top-20 left-5 font-bold text-[35px] w-full px-30 h-auto mb-[-500px] z-0">
            {genre}
          </span>
          <div
            ref={scrollRef} // This ref is used to scroll the div
            // we make the overflow hidden so that the scrollbar does not appear
            className="overflow-x-auto overflow-y-hidden  w-full scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex  py-5 w-full scale-80">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} variant="default" />
              ))}
            </div>
          </div>
        </div>

        <button
          className={`absolute  flex items-center justify-center w-[10%] h-full right-0 top-0 text-white transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => {
            scrollRef.current.scrollTo({
              left: scrollRef.current.scrollLeft + 400,
              behavior: "smooth",
            });
          }}
        >
          <IoIosArrowForward className="text-[25px] hover:text-[30px] transition-all duration-300 hover:text-[#FF48AA]" />
        </button>
      </div>
    </>
  );
}
export default Carousel;
